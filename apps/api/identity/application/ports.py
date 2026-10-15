from typing import Protocol


class TokenIssuer(Protocol):
    def issue_tokens(self, user_id: int) -> dict[str, str]:
        ...