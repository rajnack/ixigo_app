from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from flight.models import Feature, Card, ImageCard, City, CityDate, Flight, Airline, FlightOffer, FlightInfo, Booking
from .serializers import FeatureSerializer, CardSerializer, ImageCardSerializer, CitySerializer, CityDateSerializer, FlightSerializer, AirlineSerializer, OfferAvailableSerializer, FlightOfferSerializer, FlightInfoSerializer, BookingSerializer
   

class FeatureList(APIView):

    def get(self, request):
        instance = Feature.objects.filter(is_deleted=False)
        context = {"request": request}
        serializer = FeatureSerializer(instance, context=context, many=True)
        response_data = {
            "status_code": 6000,
            "data": serializer.data
        }
        return Response(response_data)

    def post(self, request):
        try:
           
            required_fields = ['title', 'description', 'icon']
            
            for field in required_fields:
                if field not in request.data:
                    return Response({
                        "status_code": 6001,
                        "message": f"Missing required field: {field}"
                    }, status=status.HTTP_400_BAD_REQUEST)

            if Feature.objects.filter(title=request.data['title'], is_deleted=False).exists():
                return Response({
                    "status_code": 6001,
                    "message": "Feature with this title already exists"
                }, status=status.HTTP_400_BAD_REQUEST)

           
            feature_data = {
                'title': request.data['title'],
                'description': request.data['description'],
                'icon': request.data['icon'],
                'is_deleted': False
            }

            serializer = FeatureSerializer(data=feature_data, context={"request": request})
            if serializer.is_valid():
                feature = serializer.save()
                response_data = {
                    "status_code": 6000,
                    "data": serializer.data,
                    "message": "Feature created successfully"
                }
                return Response(response_data, status=status.HTTP_201_CREATED)
            else:
                return Response({
                    "status_code": 6001,
                    "message": "Invalid feature data",
                    "errors": serializer.errors
                }, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({
                "status_code": 6001,
                "message": f"Error creating feature: {str(e)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request, pk):
        try:
            
            try:
                feature = Feature.objects.get(pk=pk, is_deleted=False)
            except Feature.DoesNotExist:
                return Response({
                    "status_code": 6001,
                    "message": "Feature not found"
                }, status=status.HTTP_404_NOT_FOUND)

           
            if 'title' in request.data and request.data['title'] != feature.title:
                if Feature.objects.filter(title=request.data['title'], is_deleted=False).exists():
                    return Response({
                        "status_code": 6001,
                        "message": "Feature with this title already exists"
                    }, status=status.HTTP_400_BAD_REQUEST)

           
            serializer = FeatureSerializer(feature, data=request.data, context={"request": request}, partial=True)
            if serializer.is_valid():
                serializer.save()
                response_data = {
                    "status_code": 6000,
                    "data": serializer.data,
                    "message": "Feature updated successfully"
                }
                return Response(response_data)
            else:
                return Response({
                    "status_code": 6001,
                    "message": "Invalid feature data",
                    "errors": serializer.errors
                }, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({
                "status_code": 6001,
                "message": f"Error updating feature: {str(e)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, pk=None):
        try:
            if pk:
                
                try:
                    feature = Feature.objects.get(pk=pk, is_deleted=False)
                    feature.is_deleted = True
                    feature.save()
                    return Response({
                        "status_code": 6000,
                        "message": "Feature deleted successfully"
                    })
                except Feature.DoesNotExist:
                    return Response({
                        "status_code": 6001,
                        "message": "Feature not found"
                    }, status=status.HTTP_404_NOT_FOUND)
            else:
               
                Feature.objects.filter(is_deleted=False).update(is_deleted=True)
                return Response({
                    "status_code": 6000,
                    "message": "All features deleted successfully"
                })

        except Exception as e:
            return Response({
                "status_code": 6001,
                "message": f"Error deleting feature(s): {str(e)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CardList(APIView):

    def get(self, request):
        instance = Card.objects.filter(is_deleted=False)
        context = {"request": request}
        serializer = CardSerializer(instance, context=context, many=True)
        response_data = {
            "status_code": 6000,
            "data": serializer.data
        }
        return Response(response_data)

    def post(self, request):
        try:
           
            required_fields = ['title', 'description', 'image', 'price', 'discount']
            
            for field in required_fields:
                if field not in request.data:
                    return Response({
                        "status_code": 6001,
                        "message": f"Missing required field: {field}"
                    }, status=status.HTTP_400_BAD_REQUEST)

            
            try:
                price = float(request.data['price'])
                discount = float(request.data['discount'])
                if price < 0 or discount < 0:
                    return Response({
                        "status_code": 6001,
                        "message": "Price and discount must be positive numbers"
                    }, status=status.HTTP_400_BAD_REQUEST)
            except ValueError:
                return Response({
                    "status_code": 6001,
                    "message": "Price and discount must be valid numbers"
                }, status=status.HTTP_400_BAD_REQUEST)

            
            card_data = {
                'title': request.data['title'],
                'description': request.data['description'],
                'image': request.data['image'],
                'price': price,
                'discount': discount,
                'is_deleted': False
            }

            serializer = CardSerializer(data=card_data, context={"request": request})
            if serializer.is_valid():
                card = serializer.save()
                response_data = {
                    "status_code": 6000,
                    "data": serializer.data,
                    "message": "Card created successfully"
                }
                return Response(response_data, status=status.HTTP_201_CREATED)
            else:
                return Response({
                    "status_code": 6001,
                    "message": "Invalid card data",
                    "errors": serializer.errors
                }, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({
                "status_code": 6001,
                "message": f"Error creating card: {str(e)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request, pk):
        try:
            
            try:
                card = Card.objects.get(pk=pk, is_deleted=False)
            except Card.DoesNotExist:
                return Response({
                    "status_code": 6001,
                    "message": "Card not found"
                }, status=status.HTTP_404_NOT_FOUND)

            
            if 'price' in request.data:
                try:
                    price = float(request.data['price'])
                    if price < 0:
                        return Response({
                            "status_code": 6001,
                            "message": "Price must be a positive number"
                        }, status=status.HTTP_400_BAD_REQUEST)
                except ValueError:
                    return Response({
                        "status_code": 6001,
                        "message": "Price must be a valid number"
                    }, status=status.HTTP_400_BAD_REQUEST)

            if 'discount' in request.data:
                try:
                    discount = float(request.data['discount'])
                    if discount < 0:
                        return Response({
                            "status_code": 6001,
                            "message": "Discount must be a positive number"
                        }, status=status.HTTP_400_BAD_REQUEST)
                except ValueError:
                    return Response({
                        "status_code": 6001,
                        "message": "Discount must be a valid number"
                    }, status=status.HTTP_400_BAD_REQUEST)

            
            serializer = CardSerializer(card, data=request.data, context={"request": request}, partial=True)
            if serializer.is_valid():
                serializer.save()
                response_data = {
                    "status_code": 6000,
                    "data": serializer.data,
                    "message": "Card updated successfully"
                }
                return Response(response_data)
            else:
                return Response({
                    "status_code": 6001,
                    "message": "Invalid card data",
                    "errors": serializer.errors
                }, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({
                "status_code": 6001,
                "message": f"Error updating card: {str(e)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, pk=None):
        try:
            if pk:
                
                try:
                    card = Card.objects.get(pk=pk, is_deleted=False)
                    card.is_deleted = True
                    card.save()
                    return Response({
                        "status_code": 6000,
                        "message": "Card deleted successfully"
                    })
                except Card.DoesNotExist:
                    return Response({
                        "status_code": 6001,
                        "message": "Card not found"
                    }, status=status.HTTP_404_NOT_FOUND)
            else:
                
                Card.objects.filter(is_deleted=False).update(is_deleted=True)
                return Response({
                    "status_code": 6000,
                    "message": "All cards deleted successfully"
                })

        except Exception as e:
            return Response({
                "status_code": 6001,
                "message": f"Error deleting card(s): {str(e)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ImagecardList(APIView):

    def get(self, request):
        instance = ImageCard.objects.filter(is_deleted=False)
        serializer = ImageCardSerializer(instance, context={"request": request}, many=True)
        return Response({"status_code": 6000, "data": serializer.data})

    def post(self, request):
        serializer = ImageCardSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save(is_deleted=False)
            return Response({"status_code": 6000, "data": serializer.data, "message": "ImageCard created successfully"}, status=status.HTTP_201_CREATED)
        return Response({"status_code": 6001, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            image_card = ImageCard.objects.get(pk=pk, is_deleted=False)
            serializer = ImageCardSerializer(image_card, data=request.data, context={"request": request}, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"status_code": 6000, "data": serializer.data, "message": "ImageCard updated successfully"})
            return Response({"status_code": 6001, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except ImageCard.DoesNotExist:
            return Response({"status_code": 6001, "message": "ImageCard not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            image_card = ImageCard.objects.get(pk=pk, is_deleted=False)
            image_card.is_deleted = True
            image_card.save()
            return Response({"status_code": 6000, "message": "ImageCard deleted successfully"})
        except ImageCard.DoesNotExist:
            return Response({"status_code": 6001, "message": "ImageCard not found"}, status=status.HTTP_404_NOT_FOUND)



class CityList(APIView):

    def get(self, request):
        cities = City.objects.all()
        serializer = CitySerializer(cities, context={"request": request}, many=True)
        return Response({"status_code": 6000, "data": serializer.data})

    def post(self, request):
        serializer = CitySerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response({"status_code": 6000, "data": serializer.data, "message": "City created successfully"}, status=status.HTTP_201_CREATED)
        return Response({"status_code": 6001, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            city = City.objects.get(pk=pk)
            serializer = CitySerializer(city, data=request.data, context={"request": request}, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"status_code": 6000, "data": serializer.data, "message": "City updated successfully"})
            return Response({"status_code": 6001, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except City.DoesNotExist:
            return Response({"status_code": 6001, "message": "City not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            city = City.objects.get(pk=pk)
            city.delete()
            return Response({"status_code": 6000, "message": "City deleted successfully"})
        except City.DoesNotExist:
            return Response({"status_code": 6001, "message": "City not found"}, status=status.HTTP_404_NOT_FOUND)
        

class CityDateList(APIView):

    def get(self, request):
        city_dates = CityDate.objects.all()
        serializer = CityDateSerializer(city_dates, context={"request": request}, many=True)
        return Response({"status_code": 6000, "data": serializer.data})

    def post(self, request):
        serializer = CityDateSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response({"status_code": 6000, "data": serializer.data, "message": "CityDate created successfully"}, status=status.HTTP_201_CREATED)
        return Response({"status_code": 6001, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            city_date = CityDate.objects.get(pk=pk)
            serializer = CityDateSerializer(city_date, data=request.data, context={"request": request}, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"status_code": 6000, "data": serializer.data, "message": "CityDate updated successfully"})
            return Response({"status_code": 6001, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except CityDate.DoesNotExist:
            return Response({"status_code": 6001, "message": "CityDate not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            city_date = CityDate.objects.get(pk=pk)
            city_date.delete()
            return Response({"status_code": 6000, "message": "CityDate deleted successfully"})
        except CityDate.DoesNotExist:
            return Response({"status_code": 6001, "message": "CityDate not found"}, status=status.HTTP_404_NOT_FOUND)


class FlightListView(APIView):

    def get(self, request):
        flights = Flight.objects.all()
        serializer = FlightSerializer(flights, many=True, context={"request": request})
        return Response({"status_code": 6000, "data": serializer.data})

    def post(self, request):
        serializer = FlightSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response({"status_code": 6000, "data": serializer.data, "message": "Flight created successfully"}, status=status.HTTP_201_CREATED)
        return Response({"status_code": 6001, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            flight = Flight.objects.get(pk=pk)
            serializer = FlightSerializer(flight, data=request.data, context={"request": request}, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"status_code": 6000, "data": serializer.data, "message": "Flight updated successfully"})
            return Response({"status_code": 6001, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Flight.DoesNotExist:
            return Response({"status_code": 6001, "message": "Flight not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            flight = Flight.objects.get(pk=pk)
            flight.delete()
            return Response({"status_code": 6000, "message": "Flight deleted successfully"})
        except Flight.DoesNotExist:
            return Response({"status_code": 6001, "message": "Flight not found"}, status=status.HTTP_404_NOT_FOUND)
  

class AirlineListView(APIView):

    def get(self, request):
        airlines = Airline.objects.all()
        serializer = AirlineSerializer(airlines, many=True, context={"request": request})
        return Response({"status_code": 6000, "data": serializer.data})

    def post(self, request):
        serializer = AirlineSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response({"status_code": 6000, "data": serializer.data, "message": "Airline created successfully"}, status=status.HTTP_201_CREATED)
        return Response({"status_code": 6001, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            airline = Airline.objects.get(pk=pk)
            serializer = AirlineSerializer(airline, data=request.data, context={"request": request}, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"status_code": 6000, "data": serializer.data, "message": "Airline updated successfully"})
            return Response({"status_code": 6001, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Airline.DoesNotExist:
            return Response({"status_code": 6001, "message": "Airline not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            airline = Airline.objects.get(pk=pk)
            airline.delete()
            return Response({"status_code": 6000, "message": "Airline deleted successfully"})
        except Airline.DoesNotExist:
            return Response({"status_code": 6001, "message": "Airline not found"}, status=status.HTTP_404_NOT_FOUND)
  


class FlightOfferDetail(APIView):

    def get(self, request, pk):
        try:
            instance = FlightOffer.objects.get(pk=pk)
            serializer = FlightOfferSerializer(instance, context={"request": request})
            return Response({"status_code": 6000, "data": serializer.data})
        except FlightOffer.DoesNotExist:
            return Response({"status_code": 6001, "message": "Flight offer not found"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        serializer = FlightOfferSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response({"status_code": 6000, "data": serializer.data, "message": "Flight offer created successfully"}, status=status.HTTP_201_CREATED)
        return Response({"status_code": 6001, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            offer = FlightOffer.objects.get(pk=pk)
            serializer = FlightOfferSerializer(offer, data=request.data, context={"request": request}, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"status_code": 6000, "data": serializer.data, "message": "Flight offer updated successfully"})
            return Response({"status_code": 6001, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except FlightOffer.DoesNotExist:
            return Response({"status_code": 6001, "message": "Flight offer not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            offer = FlightOffer.objects.get(pk=pk)
            offer.delete()
            return Response({"status_code": 6000, "message": "Flight offer deleted successfully"})
        except FlightOffer.DoesNotExist:
            return Response({"status_code": 6001, "message": "Flight offer not found"}, status=status.HTTP_404_NOT_FOUND)




class FlightInfoList(APIView):

    def get(self, request):
        from_query = request.query_params.get("from")
        to_query = request.query_params.get("to")

        flights = FlightInfo.objects.all()

        if from_query and to_query:
            flights = flights.filter(departure__icontains=from_query, arrival__icontains=to_query)

        serializer = FlightInfoSerializer(flights, many=True)
        return Response({"status_code": 6000, "data": serializer.data})

    def post(self, request):
        serializer = FlightInfoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "status_code": 6000,
                "data": serializer.data,
                "message": "Flight created successfully"
            }, status=status.HTTP_201_CREATED)
        return Response({
            "status_code": 6001,
            "message": "Invalid flight data",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            flight = FlightInfo.objects.get(pk=pk)
        except FlightInfo.DoesNotExist:
            return Response({
                "status_code": 6001,
                "message": "Flight not found"
            }, status=status.HTTP_404_NOT_FOUND)

        serializer = FlightInfoSerializer(flight, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "status_code": 6000,
                "data": serializer.data,
                "message": "Flight updated successfully"
            })
        return Response({
            "status_code": 6001,
            "message": "Invalid flight data",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        try:
            if pk:
                flight = FlightInfo.objects.get(pk=pk)
                flight.delete()
                return Response({
                    "status_code": 6000,
                    "message": "Flight deleted successfully"
                })
            else:
                FlightInfo.objects.all().delete()
                return Response({
                    "status_code": 6000,
                    "message": "All flights deleted"
                })
        except Exception as e:
            return Response({
                "status_code": 6001,
                "message": f"Error deleting flight(s): {str(e)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class BookingList(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        data = request.data

        
        try:
            flight = FlightInfo.objects.get(id=data.get('flight'))
        except FlightInfo.DoesNotExist:
            return Response({'message': 'Flight not found.'}, status=status.HTTP_404_NOT_FOUND)

        booking = Booking.objects.create(
            flight=flight,
            passenger_name=user.username  
        )

        return Response({'message': 'Booking successful!'}, status=status.HTTP_201_CREATED)