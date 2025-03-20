from django.urls import path
from . import views

urlpatterns = [
    path('features/', views.FeatureList.as_view(), name='features'),
    path('cards/', views.CardList.as_view(), name='cards'),
    path('imagecard/', views.ImagecardList.as_view(), name='imagecard'),  
    path('cities/', views.CityList.as_view(), name='city-list'),
    path('city-dates/', views.CityDateList.as_view(), name='citydate-list'),
    path('flights/', views.FlightListView.as_view(), name='flight-list'),
    path('airlines/', views.AirlineListView.as_view(), name='airline-list'),
    path('offers/<int:pk>/', views.FlightOfferDetail.as_view(), name='flight_offer_detail'),
]
