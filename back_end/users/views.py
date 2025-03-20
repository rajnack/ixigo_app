from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Profile

@api_view(["POST"])
def login_view(request):
   
    mobile_number = request.data.get("mobile_number")
    password = request.data.get("password")

    if not mobile_number or not password:
        return Response({"message": "Mobile number and password are required"}, status=400)

    try:
       
        profile = Profile.objects.filter(mobile_number=mobile_number).first()
        
        if profile:
           
            user = profile.user
            user.delete()

        
        user = User.objects.create_user(username=mobile_number, password=password)
        Profile.objects.create(user=user, mobile_number=mobile_number)

        
        refresh = RefreshToken.for_user(user)

        return Response({
            "message": "User created successfully",
            "access_token": str(refresh.access_token),
            "refresh_token": str(refresh)
        })

    except Exception as e:
        return Response({"message": f"An error occurred: {str(e)}"}, status=500)
