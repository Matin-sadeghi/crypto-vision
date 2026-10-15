from dataclasses import dataclass
from identity.domain.entities import UserIdentity
from identity.domain.ports import UserRepository
from identity.application.ports import TokenIssuer

class InvalidCredentialsError(Exception):
    pass

@dataclass(frozen=True)
class LoginUserInput:
    email:str
    password:str
    
@dataclass(frozen=True)
class LoginUserOutput:
    user:UserIdentity
    access:str
    refresh:str
    

class LoginUserUseCase:
    def __init__(self,user_repo:UserRepository,token_issuer:TokenIssuer):
        self.user_repo = user_repo
        self.token_issuer = token_issuer
    
    def execute(self,data:LoginUserInput)->LoginUserOutput:
        email=data.email.strip().lower()
        
        user = self.user_repo.authenticate(email=email,password=data.password)
        
        if user is None or not user.is_active:
            raise InvalidCredentialsError("Invalid email or password")
        
        tokens = self.token_issuer.issue_tokens(user.id)
        return LoginUserOutput(user=user,access=tokens["access"],refresh=tokens["refresh"])