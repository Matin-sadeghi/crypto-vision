
from django.contrib.auth import get_user_model

from identity.domain.entities import UserIdentity

User = get_user_model()


class DjangoUserRepository:
    def get_by_email(self,email:str)->UserIdentity | None:
        user = User.objects.filter(email__iexact=email).first()

        if user is None:
            return None

        return UserIdentity(id = user.pk,email=user.email,is_active = user.is_active)

    def create_user(self, email: str, password: str) -> UserIdentity:
        user = User.objects.create_user(
            email=email,
            password=password,
        )

        return UserIdentity(
            id=user.pk,
            email=user.email,
            is_active=user.is_active,
        ) 