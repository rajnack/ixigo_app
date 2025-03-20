from django.db import models
from django.contrib.postgres.fields import ArrayField

class Feature(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='features/images')
    alt = models.CharField(max_length=255)
    link = models.URLField()
    width = models.IntegerField()
    height = models.IntegerField()
    is_deleted = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = 'Features'
        db_table = 'features'

    def __str__(self):
        return self.name

class Card(models.Model):
    id = models.IntegerField(primary_key=True)
    image = models.ImageField(upload_to='cards/images')
    alt = models.CharField(max_length=255)
    href = models.URLField()
    is_deleted = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = 'Cards'
        db_table = 'cards'

    def __str__(self):
       
        return f"Card {self.id}: {self.alt}"


class ImageCard(models.Model):
    image = models.ImageField(upload_to='imagescard/images')
    alt = models.CharField(max_length=255, blank=True, null=True)  
    is_deleted = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = 'Image Cards'
        db_table = 'image_cards'

    def __str__(self):

         return f"Image Card {self.id}: {self.alt}"


class City(models.Model):
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    image = models.ImageField(upload_to='cities/') 
    price = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.city}, {self.state}"

class CityDate(models.Model):
    city = models.ForeignKey(City, related_name='dates', on_delete=models.CASCADE)
    date = models.DateField() 

    def __str__(self):
        return f"{self.city.city} - {self.date}"


class Flight(models.Model):
    image = models.ImageField(upload_to='flight_images/')
    title = models.CharField(max_length=255)
    destinations = models.JSONField()

    def __str__(self):
        return self.title     


class Airline(models.Model):
    name = models.CharField(max_length=255)  
    logo = models.ImageField(upload_to='airline_logos/')  

    def __str__(self):
        return self.name     
        
         

class OfferAvailable(models.Model):
    offer = ArrayField(models.CharField(max_length=255), blank=True, default=list)
    phone_img = models.ImageField(upload_to="offer_images/", null=True, blank=True)

    def __str__(self):
        return f"Offer with Image: {self.phone_img}"


class FlightOffer(models.Model):
    id = models.IntegerField(primary_key=True)
    code = models.CharField(max_length=50, null=True, blank=True)
    expiresOn = models.DateField(null=True, blank=True)
    title = models.CharField(max_length=255)
    btn_title = models.CharField(max_length=150, null=True, blank=True)
    category = models.CharField(max_length=255, blank=True, null=True)
    about = ArrayField(models.TextField(), blank=True, default=list)
    terms = ArrayField(models.TextField(), blank=True, default=list)
    image = models.ImageField(upload_to='offers/', blank=True, null=True)
    status = models.CharField(max_length=255, null=True, blank=True)
    discount = models.CharField(max_length=255, null=True, blank=True)
    discount_international = models.CharField(max_length=255, null=True, blank=True)
    minBooking = models.CharField(max_length=50, null=True, blank=True)
    minBooking1 = models.CharField(max_length=50, null=True, blank=True)
    bank_icon = models.ImageField(upload_to="bank_icons/", null=True, blank=True)
    card_icon = models.FileField(upload_to="card_icons/", null=True, blank=True)
    card_title = models.CharField(max_length=150, null=True, blank=True)
    offer_available = models.OneToOneField(
        OfferAvailable, on_delete=models.CASCADE, related_name="bank_offer", null=True, blank=True
    )

    def __str__(self):
        return f"{self.title} ({self.code})"    

 