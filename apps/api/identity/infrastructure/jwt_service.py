from rest_framework_simplejwt.exceptions import TokenError
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from identity.application.errors import InvalidRefreshTokenError

class SimpleJWTTokenIssuer:
    def issue_tokens(self,user_id:int) -> dict[str,str]:
        User = get_user_model()
        user = User.objects.get(pk=user_id)
        refresh = RefreshToken.for_user(user)
        
        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }
        
    def refresh_tokens(self,raw_refresh:str)->dict[str,str]:
        try:   
            refresh = RefreshToken(raw_refresh)
            access = str(refresh.access_token)
            
            refresh.blacklist()
            refresh.set_jti()
            refresh.set_exp()
            refresh.set_iat()
            return {
                "access":access,
                "refresh":str(refresh)
            }
        except TokenError as exc :
            raise InvalidRefreshTokenError(
                "Refresh token is invalid or expired."
            ) from exc
         
    def revoke_refresh_token(self,raw_refresh:str)->None:
        try:
            refresh = RefreshToken(raw_refresh)
            refresh.blacklist()
        except TokenError as exc :
            raise InvalidRefreshTokenError("Refresh token is invalid or expired.")
        