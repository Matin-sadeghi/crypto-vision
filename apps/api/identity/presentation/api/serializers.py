from rest_framework import serializers



class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    email = serializers.EmailField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    is_staff = serializers.BooleanField()
class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        write_only=True,
        min_length=8,
        trim_whitespace=False,
    )
    first_name = serializers.CharField(max_length=150)
    last_name = serializers.CharField(max_length=150)
    
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        write_only=True,
        min_length=8,
        trim_whitespace=False,
    )

class LoginResponseSerializer(serializers.Serializer):
    user = UserSerializer()
    access = serializers.CharField()

class ApiResponseSerializer(serializers.Serializer):
    status = serializers.IntegerField()
    message = serializers.CharField()
    data = serializers.JSONField(required=False)

class RegisterApiResponseSerializer(ApiResponseSerializer):
    data = UserSerializer()

class LoginApiResponseSerializer(ApiResponseSerializer):
    data = LoginResponseSerializer()

class ApiErrorResponseSerializer(serializers.Serializer):
    status = serializers.IntegerField()
    message = serializers.CharField()