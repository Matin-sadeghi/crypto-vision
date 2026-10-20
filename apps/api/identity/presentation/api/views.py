from rest_framework import status
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.views import APIView
from django.db import IntegrityError, transaction
from drf_spectacular.utils import extend_schema
from django.conf import settings
from identity.application.errors import InvalidRefreshTokenError
from identity.application.use_cases.refresh_token import RefreshTokenUseCase
from identity.application.use_cases.logout import LogoutUseCase


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
from config.api_responses import error_response, success_response
from .serializers import (
    LoginApiResponseSerializer,
    LoginSerializer,
    ApiErrorResponseSerializer,
    ApiResponseSerializer,
    RegisterApiResponseSerializer,
    RegisterSerializer,
    UserSerializer,
)


REFRESH_COOKIE_NAME = "refreshToken"
REFRESH_COOKIE_PATH = "/api/v1/auth/"
REFRESH_COOKIE_MAX_AGE = 7 * 24 * 60 * 60

def set_refresh_cookie(response, token: str):
    response.set_cookie(
        key=REFRESH_COOKIE_NAME,
        value=token,
        httponly=True,
        secure=not settings.DEBUG,  # Production باید HTTPS داشته باشد.
        samesite="Lax",
        max_age=REFRESH_COOKIE_MAX_AGE,
        path=REFRESH_COOKIE_PATH,
    )
    
    
def delete_refresh_cookie(response):
    response.delete_cookie(
        key=REFRESH_COOKIE_NAME,
        path=REFRESH_COOKIE_PATH,
        samesite="Lax",
    )




class RegisterView(APIView):
    permission_classes = [AllowAny]
    @extend_schema(
        request=RegisterSerializer,
        responses={
            201: RegisterApiResponseSerializer,
            400: ApiErrorResponseSerializer,
        },
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
            return error_response(
                "This email is already registered.",
                status_code=status.HTTP_400_BAD_REQUEST,
            )
    
        return success_response({
                "id": user.id,
                "email": user.email,
                "first_name":user.first_name,
                "last_name":user.last_name
            },
            message="Registration successful.",
            status_code=status.HTTP_201_CREATED,
        )
        
        
        
        

class LoginView(APIView):
    permission_classes = [AllowAny]
    @extend_schema(
        request=LoginSerializer,
        responses={
            200: LoginApiResponseSerializer,
            400: ApiErrorResponseSerializer,
            404: ApiErrorResponseSerializer,
        },
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
            return error_response(
                "Invalid email or password.",
                status_code=status.HTTP_404_NOT_FOUND,
            )
    
        response = success_response({
            "user":{
                 "id": result.user.id,
                               "email": result.user.email,
                               "first_name":result.user.first_name,
                               "last_name":result.user.last_name, 
            },
              
                "access":result.access,
            },
            message="Login successful.",
        )
        set_refresh_cookie(response, result.refresh)
        return response
    

class RefrshCookieView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    @extend_schema(
        request=None,
        responses={
            200: ApiResponseSerializer,
            401: ApiErrorResponseSerializer,
        },
        summary="Refresh the access token",
    )
    def post(self,request):
        raw_refresh = request.COOKIES.get(REFRESH_COOKIE_NAME)
        
        if not raw_refresh:
            response = error_response(
                "Refresh token is missing.",
                status_code=status.HTTP_401_UNAUTHORIZED,
            )
            delete_refresh_cookie(response)
            return response
    
        token_service = SimpleJWTTokenIssuer()
        use_case = RefreshTokenUseCase(token_service)    
    
        try:
            tokens = use_case.execute(raw_refresh)
        except InvalidRefreshTokenError:
            response = error_response(
                "Refresh token is invalid or expired.",
                status_code=status.HTTP_401_UNAUTHORIZED,
            )
            delete_refresh_cookie(response)
            return response
        
        response = success_response(
            {"access": tokens["access"]},
            message="Token refreshed.",
        )
        set_refresh_cookie(response,tokens["refresh"])
        return response
 
class LogoutView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    @extend_schema(
        request=None,
        responses={200: ApiResponseSerializer},
        summary="Log out",
    )
    def post(self,request):
        raw_refresh = request.COOKIES.get(REFRESH_COOKIE_NAME)
        token_service= SimpleJWTTokenIssuer()
        use_case = LogoutUseCase(token_service)
        
        try:
            use_case.execute(raw_refresh)
        except InvalidRefreshTokenError:
            pass
        
        response = success_response(message="Logout successful.")
        delete_refresh_cookie(response)
        return response    
    
        
 
class MeView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        responses={
            200: ApiResponseSerializer,
            401: ApiErrorResponseSerializer,
        },
        summary="Get current user",
    )
    
    def get(self,request):
        serializer = UserSerializer(request.user)
        return success_response(serializer.data, message="User retrieved.")
    
    