from rest_framework import serializers
from flight.models import Feature, Card, ImageCard, City, CityDate, Airline,  Flight, FlightOffer, OfferAvailable, FlightInfo, Booking



class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = '__all__'

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = '__all__'

class ImageCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageCard  
        fields = '__all__'

        
class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ['id', 'city', 'state', 'image', 'price']

class CityDateSerializer(serializers.ModelSerializer):
    cityId = serializers.ReadOnlyField(source='city.id')

    class Meta:
        model = CityDate
        fields = ['id', 'cityId', 'date'] 

class FlightSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)  

    class Meta:
        model = Flight
        fields = ['id', 'image', 'title', 'destinations'] 

class AirlineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Airline
        fields = ['id', 'name', 'logo']  


class OfferAvailableSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfferAvailable
        fields = ['offer', 'phone_img']


class FlightOfferSerializer(serializers.ModelSerializer):
    offer_available = OfferAvailableSerializer()

    class Meta:
        model = FlightOffer
        fields = '__all__'        

class FlightInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlightInfo
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'
