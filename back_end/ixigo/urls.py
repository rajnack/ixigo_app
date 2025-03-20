from django.conf import settings 
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/flight/', include("api.v1.flight.urls")),
    path('api/v1/hotel/', include("api.v1.hotel.urls")),
    path("api/v1/users/", include("users.urls")), 
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
