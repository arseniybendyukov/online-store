from django.db import models


class Tag(models.Model):
  name = models.CharField(max_length=100)
  color = models.CharField(max_length=7)

class Brand(models.Model):
  name = models.CharField(max_length=100)
  image = models.ImageField(upload_to='brands/')

class Category(models.Model):
  name = models.CharField(max_length=100)

class Subcategory(models.Model):
  name = models.CharField(max_length=100)
  category = models.ForeignKey(Category, on_delete=models.CASCADE)

class Product(models.Model):
  name = models.CharField(max_length=100)
  image = models.ImageField(upload_to='products/')
  subcategory = models.ForeignKey(Subcategory, on_delete=models.CASCADE)
  publications = models.ManyToManyField(Publication)
