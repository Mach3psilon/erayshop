from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated

from django.contrib.auth.models import User
from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializers import ProductSerializer, OrderSerializer

from rest_framework import status

from datetime import datetime
import iyzipay
import json
import secrets

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        flag = 0
        product_list = []
        cannot_bought = []
        for i in orderItems:
            product = Product.objects.get(_id=i['product'])
            product_list.append(product)
            quantity = i['qty']
            if product.countInStock < quantity:
                flag = 1
                cannot_bought.append(product.name)
        if flag == 1:
            return Response({'detail': 'Out of Stock', 'product': cannot_bought}, status=status.HTTP_400_BAD_REQUEST)
                
        # 1) Create order
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice'],
        )
        # 2) Create shipping address
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
        )
        # 3) Create order items and set order to orderItem relationship
        for i in orderItems:
            product = product_list.pop(0)

            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url,
            )
            # 4) Update stock
            product.countInStock -= item.qty
            product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderByID(request, pk):
    user = request.user
    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response({'detail': 'Not authorized to view this order'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        str_to_send = 'Order does not exist for ' + str(pk)
        return Response({'detail': str_to_send}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['POST'])  
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(_id=pk)
    
    price = request.data['itemsPrice']
    cardNumber = request.data['cardNumber']
    expiry = request.data['expiry']
    expireMonth = expiry[0:2]
    expireYear = '20' + expiry[3:5]
    cvc = request.data['cvc']
    cardHolderName = request.data['cardName']

    options = {
    'api_key': secrets.IYZICO_API_KEY,
    'secret_key': secrets.IYZICO_SECRET_KEY,
    'base_url': secrets.IYZICO_URL
    }

    payment_card = {
        'cardHolderName': cardHolderName,
        'cardNumber': cardNumber,
        'expireMonth': expireMonth,
        'expireYear':  expireYear,
        'cvc': cvc,
        'registerCard': '0'
    }

    buyer = {
        'id': 'BY789',
        'name': 'John',
        'surname': 'Doe',
        'gsmNumber': '+905350000000',
        'email': 'email@email.com',
        'identityNumber': '74300864791',
        'lastLoginDate': '2015-10-05 12:43:35',
        'registrationDate': '2013-04-21 15:12:09',
        'registrationAddress': 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
        'ip': '85.34.78.112',
        'city': 'Istanbul',
        'country': 'Turkey',
        'zipCode': '34732'
    }

    address = {
        'contactName': 'Jane Doe',
        'city': 'Istanbul',
        'country': 'Turkey',
        'address': 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
        'zipCode': '34732'
    }

    basket_items = [
        {
            'id': 'BI101',
            'name': 'Binocular',
            'category1': 'Collectibles',
            'category2': 'Accessories',
            'itemType': 'PHYSICAL',
            'price': price
        }
    ]

    request = {
        'locale': 'tr',
        'conversationId': '123456789',
        'price': price,
        'paidPrice': price,
        'currency': 'TRY',
        'installment': '1',
        'basketId': 'B67832',
        'paymentChannel': 'WEB',
        'paymentGroup': 'PRODUCT',
        'paymentCard': payment_card,
        'buyer': buyer,
        'shippingAddress': address,
        'billingAddress': address,
        'basketItems': basket_items
    }

    payment = iyzipay.Payment().create(request, options)
    if json.loads(payment.read().decode('utf-8'))['status'] == 'success':
        order.isPaid = True
        order.paidAt = datetime.now()
        order.save()
        return Response('Payment is successful')
    else:
        return Response('Payment is not successful', status=status.HTTP_400_BAD_REQUEST)
    
    


