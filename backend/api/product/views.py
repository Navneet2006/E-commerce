from rest_framework import viewsets
from .serializers import ProductSerializers
from .models import Product
# Create your views here.

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('name')
    serializer_class = ProductSerializers