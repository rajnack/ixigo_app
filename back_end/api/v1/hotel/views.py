from rest_framework.views import APIView
from rest_framework.response import Response
from hotel.models import Item, Service, Destination
from .serializers import  ItemSerializer, ServiceSerializer, DestinationSerializer



class ItemList(APIView):
    """
    Class-based view for listing Item objects.
    """
    def get(self, request):
        instance = Item.objects.filter(is_deleted=False)
        context = {"request": request}
        serializer = ItemSerializer(instance, context=context, many=True)
        response_data = {
            "status_code": 6000,
            "data": serializer.data
        }
        return Response(response_data)

class ServiceList(APIView):
    """
    Class-based view for listing Service objects.
    """
    def get(self, request):
        instance = Service.objects.filter(is_deleted=False)
        context = {"request": request}
        serializer = ServiceSerializer(instance, context=context, many=True)
        response_data = {
            "status_code": 6000,
            "data": serializer.data
        }
        return Response(response_data)


class DestinationList(APIView):
    """
    Class-based view for listing Destination objects.
    """
    def get(self, request):
        instance = Destination.objects.filter(is_deleted=False)  
        context = {"request": request}
        serializer = DestinationSerializer(instance, context=context, many=True)
        response_data = {
            "status_code": 6000,
            "data": serializer.data
        }
        return Response(response_data)

