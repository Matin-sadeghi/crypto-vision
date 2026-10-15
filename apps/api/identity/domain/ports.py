from typing import Protocol

from .entities import UserIdentity

class UserRepository(Protocol):
    def get_by_email(self,email:str)->UserIdentity|None:
        ...
    def create_user(self,email:str,password:str)->UserIdentity:
        ...