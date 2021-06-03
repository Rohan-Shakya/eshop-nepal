from django.urls import path
from api.views import product_views as views

urlpatterns = [
    path('', views.getProduts, name='products'),
    path('create/', views.createProduct, name='create-product'),
    path('upload/', views.uploadImage, name='image-upload'),
    path('<str:pk>/reviews/', views.createProductReview, name="create-review"),
    path('top/', views.getTopProducts, name='top-products'),
    path('<str:pk>/', views.getProduct, name='product'),
    path('update/<str:pk>/', views.updateProduct, name='update-product'),
    path('delete/<str:pk>/', views.deleteProduct, name='delete-product')
]
