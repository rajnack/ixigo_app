from django.urls import path
from . import views

urlpatterns = [
    path('items/', views.ItemList.as_view(), name='items'),
    path('services/', views.ServiceList.as_view(), name='services'), 
    path('destinations/', views.DestinationList.as_view(), name='destinations') 
    
]
