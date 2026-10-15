from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

class SimpleJWTTokenIssuer:
    def issue_tokens(self,user_id:int) -> dict[str,str]:
        User = get_user_model()
        user = User.objects.get(pk=user_id)
        refresh = RefreshToken.for_user(user)
        
        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }