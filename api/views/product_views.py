from django.shortcuts import render
# from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.models import Product
from api.serializers import ProductSerializer

from rest_framework import status


@api_view(['GET'])
def getProduts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)
