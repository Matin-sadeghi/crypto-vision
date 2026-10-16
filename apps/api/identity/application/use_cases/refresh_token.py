from identity.application.ports import TokenService

class RefreshTokenUseCase:
    def __init__(self, token_service:TokenService):
        self.token_service = token_service

    def execute(self, raw_refresh: str) -> dict[str,str]:
        return self.token_service.refresh_tokens(raw_refresh)


