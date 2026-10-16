from typing import Protocol


class TokenIssuer(Protocol):
    def issue_tokens(self, user_id: int) -> dict[str, str]:
        ...   
        
        
class TokenService(Protocol):
    def refresh_tokens(self, raw_refresh: str) -> dict[str, str]:
        ...
    def revoke_refresh_token(self, raw_refresh: str) -> None:
        ...
