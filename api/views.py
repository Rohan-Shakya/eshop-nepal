from django.shortcuts import render
# from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .products import products


@api_view(['GET'])
def getProduts(request):
    return Response(products)


@api_view(['GET'])
def getProduct(request, pk):
    product = None
    for item in products:
        if item['_id'] == pk:
            product = item
    return Response(product)