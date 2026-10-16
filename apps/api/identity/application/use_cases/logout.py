from identity.application.ports import TokenService

class LogoutUseCase:
    def __init__(self, token_service:TokenService):
        self.token_service = token_service

    def execute(self, raw_refresh: str | None) -> None:
        if raw_refresh:
            self.token_service.revoke_refresh_token(raw_refresh)
