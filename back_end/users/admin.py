from django.contrib import admin
from .models import Profile

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "mobile_number")  
    search_fields = ("user__username", "mobile_number")  
    list_filter = ("user",) 

