
from django.contrib.auth import get_user_model

from identity.domain.entities import UserIdentity

User = get_user_model()


class DjangoUserRepository:
    def get_by_email(self,email:str)->UserIdentity | None:
        user = User.objects.filter(email__iexact=email).first()

        if user is None:
            return None

        return UserIdentity(id = user.pk,email=user.email,is_active = user.is_active,first_name=user.first_name,last_name=user.last_name,is_staff=user.is_staff)

    def create_user(self, email: str, password: str,first_name:str,last_name:str) -> UserIdentity:
        user = User.objects.create_user(
            email=email,
            password=password,
            first_name=first_name,
            last_name = last_name
        )

        return UserIdentity(
            id=user.pk,
            email=user.email,
            is_active=user.is_active,
            last_name=user.last_name,
            first_name=user.first_name,
            is_staff=user.is_staff,
        ) 
    
    def authenticate(self,email:str,password:str)->UserIdentity | None:
        user = User.objects.filter(email__iexact=email).first()
        
        if user is None:
            return None
        
        if not user.check_password(password):
            return None
        
        return UserIdentity(id=user.pk,email=user.email,is_active=user.is_active,first_name=user.first_name,last_name=user.last_name,is_staff=user.is_staff)