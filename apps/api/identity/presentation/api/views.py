from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db import IntegrityError, transaction
from drf_spectacular.utils import extend_schema

from identity.application.use_cases.register import (
    RegisterUserInput,
    RegisterUserUseCase,
    EmailAlreadyRegisteredError
)
from identity.infrastructure.repositories import DjangoUserRepository
from .serializers import RegisterSerializer

class RegisterView(APIView):
    permission_classes = [AllowAny]
    @extend_schema(
        request=RegisterSerializer,
        responses={201: RegisterSerializer},
        summary="Register a new user",
        description="Create a user with email and password.",
    )
    def post(self,request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        use_case = RegisterUserUseCase(DjangoUserRepository())

        try:
            with transaction.atomic():
                user = use_case.execute(RegisterUserInput(email=serializer.validated_data["email"],password=serializer.validated_data["password"]))
        except EmailAlreadyRegisteredError:
            return Response({"email":["This email is already registerd."]},status=status.HTTP_400_BAD_REQUEST)
    
        return Response({
                "id": user.id,
                "email": user.email,
            },
            status=status.HTTP_201_CREATED,
        )