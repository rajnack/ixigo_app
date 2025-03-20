from django.contrib import admin
from .models import Feature, Card, ImageCard, City, CityDate, Flight, Airline, FlightOffer, OfferAvailable

admin.site.register(Feature)
admin.site.register(Card)
admin.site.register(ImageCard)
admin.site.register(City)
admin.site.register(CityDate)
admin.site.register(Flight)
admin.site.register(Airline)

class FlightOfferAdmin(admin.ModelAdmin):
    list_display = ("title", "code")

class OfferAvailableAdmin(admin.ModelAdmin):
    list_display = ('id',)


admin.site.register(FlightOffer, FlightOfferAdmin)
admin.site.register(OfferAvailable, OfferAvailableAdmin)
