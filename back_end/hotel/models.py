from django.db import models

class Item(models.Model):
    id = models.IntegerField(primary_key=True)
    image = models.ImageField(upload_to='items/images')
    alt = models.CharField(max_length=255)
    href = models.URLField()
    is_deleted = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = 'items'
        db_table = 'items'

    def __str__(self):
       
        return f"item {self.id}: {self.alt}"


class Service(models.Model):
    id = models.IntegerField(primary_key=True)
    image = models.ImageField(upload_to='services/images')
    alt = models.CharField(max_length=255)
    is_deleted = models.BooleanField(default=False)


    class Meta:
        verbose_name_plural = 'services'
        db_table = 'services'

    def __str__(self):
        return f"service {self.id}: {self.alt}"


class Destination(models.Model):
    image = models.ImageField(upload_to='destinations/images')
    title=models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255)
    properties = models.PositiveIntegerField()
    is_deleted = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = 'destinations'
        db_table = 'destinations'

    def __str__(self):
        return f"destination {self.title}: {self.subtitle}"    