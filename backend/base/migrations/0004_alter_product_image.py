# Generated by Django 4.1.3 on 2022-11-20 15:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_product_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, default='/placeholder.jpg', null=True, upload_to=''),
        ),
    ]
