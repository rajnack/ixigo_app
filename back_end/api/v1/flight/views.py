from rest_framework.views import APIView
from rest_framework.response import Response
from flight.models import Feature, Card, ImageCard, City, CityDate, Flight, Airline, FlightOffer
from .serializers import FeatureSerializer, CardSerializer, ImageCardSerializer, CitySerializer, CityDateSerializer, FlightSerializer, AirlineSerializer, OfferAvailableSerializer, FlightOfferSerializer

class FeatureList(APIView):
    """
    Class-based view for listing Feature objects.
    """
    def get(self, request):
        instance = Feature.objects.filter(is_deleted=False)
        context = {"request": request}
        serializer = FeatureSerializer(instance, context=context, many=True)
        response_data = {
            "status_code": 6000,
            "data": serializer.data
        }
        return Response(response_data)

class CardList(APIView):
    """
    Class-based view for listing Card objects.
    """
    def get(self, request):
        instance = Card.objects.filter(is_deleted=False)
        context = {"request": request}
        serializer = CardSerializer(instance, context=context, many=True)
        response_data = {
            "status_code": 6000,
            "data": serializer.data
        }
        return Response(response_data)

class ImagecardList(APIView):
    """
    Class-based view for listing ImageCard objects.
    """
    def get(self, request):
        instance = ImageCard.objects.filter(is_deleted=False)
        context = {"request": request}
        serializer = ImageCardSerializer(instance, context=context, many=True)
        response_data = {
            "status_code": 6000,
            "data": serializer.data
        }
        return Response(response_data)


class CityList(APIView):
 
    def get(self, request):
        
        cities = City.objects.all()
        context = {"request": request}
        serializer = CitySerializer(cities, context=context, many=True)
        response_data = {
            "status_code": 6000,
            "data": serializer.data
        }
        return Response(response_data)        

class CityDateList(APIView):
  
    def get(self, request):
    
        city_dates = CityDate.objects.all()
        context = {"request": request}
        serializer = CityDateSerializer(city_dates, context=context, many=True)
        response_data = {
            "status_code": 6000,
            "data": serializer.data
        }
        return Response(response_data)

class FlightListView(APIView):

    def get(self, request):
        flights = Flight.objects.all()
        serializer = FlightSerializer(flights, many=True, context={"request": request})
        response_data = {
            "status_code": 6000,
            "data": serializer.data
        }
        return Response(response_data)  

class AirlineListView(APIView):
    
    def get(self, request):
        airlines = Airline.objects.all()  
        serializer = AirlineSerializer(airlines, many=True, context={"request": request})  
        response_data = {
            "status_code": 6000,
            "data": serializer.data  
        }
        return Response(response_data)  


class FlightOfferDetail(APIView):
    """
    API view to retrieve a specific flight offer by primary key.
    """
    def get(self, request, pk):
        if FlightOffer.objects.filter(pk=pk).exists():
            instance = FlightOffer.objects.get(pk=pk)
            serializer = FlightOfferSerializer(instance, context={"request": request})

            response_data = {
                "status_code": 6000,
                "data": serializer.data
            }
            return Response(response_data)  
        else:
            response_data = {
                "status_code": 6001,
                "message": "Flight offer not found."
            }
            return Response(response_data)

