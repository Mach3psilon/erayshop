import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'

import { listProductDetails } from '../actions/productActions'

function ProductEditScreen() {
        
        const productId = useParams().id

        const [name, setName] = useState('')
        const [price, setPrice] = useState(0)
        const [image, setImage] = useState('')
        const [brand, setBrand] = useState('')
        const [category, setCategory] = useState('')
        const [countInStock, setCountInStock] = useState(0)
        const [description, setDescription] = useState('')
    

        const dispatch = useDispatch()
    
        const productDetails = useSelector(state => state.productDetails)
        const { loading, error, product } = productDetails
    
        
    
        const history = useNavigate()

        useEffect(() => {
            
           
                if(!product.name || product._id !== Number(productId)) {
                    dispatch(listProductDetails(productId))
                    
                } else {

                    setName(product.name)
                    setPrice(product.price)
                    setImage(product.image)
                    setBrand(product.brand)
                    setCategory(product.category)
                    setCountInStock(product.countInStock)
                    setDescription(product.description)

                }
           

            
           
        }, [history])

        const submitHandler = (e) => {
            e.preventDefault()
           

           
        }

  return (
    <div>

        <Link to='/admin/productlist/' className='btn btn-light my-3'>
            Go Back
        </Link>
        <FormContainer>
        
            <h1>Edit Product</h1>
            

            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control  type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <br/>
                <Form.Group controlId='name'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control  type='number' placeholder='Enter price' value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
                </Form.Group>
                <br/>
                <Form.Group controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control  type='text' placeholder='Enter image' value={image} onChange={(e) => setImage(e.target.value)}></Form.Control>
                </Form.Group>
                <br/>
                <Form.Group controlId='brand'>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control  type='text' placeholder='Enter brand' value={brand} onChange={(e) => setBrand(e.target.value)}></Form.Control>
                </Form.Group>
                <br/>
               
                <Form.Group controlId='stock'>
                    <Form.Label>Stock</Form.Label>
                    <Form.Control  type='text' placeholder='Enter stock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
                </Form.Group>
                <br/>
                <Form.Group controlId='category'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control  type='text' placeholder='Enter category' value={category} onChange={(e) => setCategory(e.target.value)}></Form.Control>
                </Form.Group>
                <br/>
                <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control  type='text' placeholder='Enter description' value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
                </Form.Group>

                <br/>
                <Button type='submit' variant='primary'>Update</Button>

                </Form>
            )}
        </FormContainer>
    
    </div>
  ) 
}

export default ProductEditScreen