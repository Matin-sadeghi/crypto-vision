from dataclasses import dataclass

@dataclass(frozen=True)
class UserIdentity:
    id:int
    email:str
    is_active:bool
    first_name:str
    last_name:str
    is_staff:bool = False