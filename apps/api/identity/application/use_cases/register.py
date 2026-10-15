from dataclasses import dataclass

from identity.domain.entities import UserIdentity
from identity.domain.ports import UserRepository

class EmailAlreadyRegisteredError(Exception):
    pass

@dataclass(frozen=True)
class RegisterUserInput:
    email:str
    password:str
    first_name:str
    last_name:str
    


class RegisterUserUseCase:
    def __init__(self,user_repo:UserRepository):
        self.user_repo = user_repo

    def execute(self,data:RegisterUserInput)->UserIdentity:
        email = data.email.strip().lower()

        existing_user = self.user_repo.get_by_email(email)

        if existing_user is not None:
            raise EmailAlreadyRegisteredError("Email is already registerd")

        if len(data.password) < 8 :
            raise ValueError("password must be at least 8 characters")

        return self.user_repo.create_user(email=email,password=data.password,first_name=data.first_name,last_name=data.last_name)