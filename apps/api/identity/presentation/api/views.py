from rest_framework import status
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db import IntegrityError, transaction
from drf_spectacular.utils import extend_schema

from identity.application.use_cases.register import (
    RegisterUserInput,
    RegisterUserUseCase,
    EmailAlreadyRegisteredError
)
from identity.application.use_cases.login import (
    LoginUserInput,
    LoginUserUseCase,
    InvalidCredentialsError
)
from identity.infrastructure.jwt_service import SimpleJWTTokenIssuer
from identity.infrastructure.repositories import DjangoUserRepository
from .serializers import RegisterSerializer,LoginSerializer,LoginResponseSerializer,UserSerializer

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
                user = use_case.execute(RegisterUserInput(  email=serializer.validated_data["email"],
                                                            password=serializer.validated_data["password"],
                                                            first_name=serializer.validated_data["first_name"],
                                                            last_name=serializer.validated_data["last_name"],
                                                        ))
        except EmailAlreadyRegisteredError:
            return Response({"email":["This email is already registerd."]},status=status.HTTP_400_BAD_REQUEST)
    
        return Response({
                "id": user.id,
                "email": user.email,
                "first_name":user.first_name,
                "last_name":user.last_name
            },
            status=status.HTTP_201_CREATED,
        )
        
        
        
        

class LoginView(APIView):
    permission_classes = [AllowAny]
    @extend_schema(
        request=LoginSerializer,
        responses={200: LoginResponseSerializer,401:{"description":"Invalid email or password"}},
        summary="Login with email and password a new user",
    )
    def post(self,request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        use_case = LoginUserUseCase(user_repo=DjangoUserRepository(),token_issuer=SimpleJWTTokenIssuer())

        try:
            result = use_case.execute(LoginUserInput(
                    email=serializer.validated_data["email"],
                    password=serializer.validated_data["password"],
            ))
        except InvalidCredentialsError:
            return Response({"detail":"Invalid email or password"},status=status.HTTP_401_UNAUTHORIZED)
    
        return Response({
            "user":{
                 "id": result.user.id,
                               "email": result.user.email,
                               "first_name":result.user.first_name,
                               "last_name":result.user.last_name, 
            },
              
                "access":result.access,
                "refresh":result.refresh
            },
            status=status.HTTP_200_OK,
        ) 
        
 
class MeView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        responses=UserSerializer,
        summary="Get current user",
    )
    
    def get(self,request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    