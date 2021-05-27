from django.urls import path
from . import views

urlpatterns = [
    path('users/login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('products/', views.getProduts, name='products'),
    path('products/<str:pk>/', views.getProduct, name='product')
]
