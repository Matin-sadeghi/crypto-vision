from dataclasses import dataclass

@dataclass(frozen=True)
class UserIdentity:
    id:int
    email:str
    is_active:bool