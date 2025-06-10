from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from hotel.models import Item, Service, Destination
from .serializers import ItemSerializer, ServiceSerializer, DestinationSerializer



class ItemList(APIView):
   
    def get(self, request):
        instance = Item.objects.filter(is_deleted=False)
        context = {"request": request}
        serializer = ItemSerializer(instance, context=context, many=True)
        response_data = {
            "status_code": 6000,
            "data": serializer.data
        }
        return Response(response_data)

    def post(self, request):
        serializer = ItemSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response({
                "status_code": 6000,
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "status_code": 6001,
            "data": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            instance = Item.objects.get(pk=pk, is_deleted=False)
        except Item.DoesNotExist:
            return Response({
                "status_code": 6001,
                "data": "Item not found"
            }, status=status.HTTP_404_NOT_FOUND)

        serializer = ItemSerializer(instance, data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response({
                "status_code": 6000,
                "data": serializer.data
            })
        return Response({
            "status_code": 6001,
            "data": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            instance = Item.objects.get(pk=pk, is_deleted=False)
            instance.is_deleted = True
            instance.save()
            return Response({
                "status_code": 6000,
                "data": "Item deleted successfully"
            })
        except Item.DoesNotExist:
            return Response({
                "status_code": 6001,
                "data": "Item not found"
            }, status=status.HTTP_404_NOT_FOUND)

class ServiceList(APIView):
  
    def get(self, request):
        instance = Service.objects.filter(is_deleted=False)
        context = {"request": request}
        serializer = ServiceSerializer(instance, context=context, many=True)
        response_data = {
            "status_code": 6000,
            "data": serializer.data
        }
        return Response(response_data)

    def post(self, request):
        serializer = ServiceSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response({
                "status_code": 6000,
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "status_code": 6001,
            "data": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            instance = Service.objects.get(pk=pk, is_deleted=False)
        except Service.DoesNotExist:
            return Response({
                "status_code": 6001,
                "data": "Service not found"
            }, status=status.HTTP_404_NOT_FOUND)

        serializer = ServiceSerializer(instance, data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response({
                "status_code": 6000,
                "data": serializer.data
            })
        return Response({
            "status_code": 6001,
            "data": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            instance = Service.objects.get(pk=pk, is_deleted=False)
            instance.is_deleted = True
            instance.save()
            return Response({
                "status_code": 6000,
                "data": "Service deleted successfully"
            })
        except Service.DoesNotExist:
            return Response({
                "status_code": 6001,
                "data": "Service not found"
            }, status=status.HTTP_404_NOT_FOUND)


class DestinationList(APIView):
  
    def get(self, request):
        instance = Destination.objects.filter(is_deleted=False)  
        context = {"request": request}
        serializer = DestinationSerializer(instance, context=context, many=True)
        response_data = {
            "status_code": 6000,
            "data": serializer.data
        }
        return Response(response_data)

    def post(self, request):
        serializer = DestinationSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response({
                "status_code": 6000,
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "status_code": 6001,
            "data": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            instance = Destination.objects.get(pk=pk, is_deleted=False)
        except Destination.DoesNotExist:
            return Response({
                "status_code": 6001,
                "data": "Destination not found"
            }, status=status.HTTP_404_NOT_FOUND)

        serializer = DestinationSerializer(instance, data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response({
                "status_code": 6000,
                "data": serializer.data
            })
        return Response({
            "status_code": 6001,
            "data": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            instance = Destination.objects.get(pk=pk, is_deleted=False)
            instance.is_deleted = True
            instance.save()
            return Response({
                "status_code": 6000,
                "data": "Destination deleted successfully"
            })
        except Destination.DoesNotExist:
            return Response({
                "status_code": 6001,
                "data": "Destination not found"
            }, status=status.HTTP_404_NOT_FOUND)

