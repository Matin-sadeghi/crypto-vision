import logging
from collections.abc import Mapping

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import exception_handler as drf_exception_handler


logger = logging.getLogger(__name__)
_UNSET = object()


def success_response(data=_UNSET, *, message="Success", status_code=status.HTTP_200_OK):
    body = {"status": status_code, "message": message}
    if data is not _UNSET:
        body["data"] = data
    return Response(body, status=status_code)


def error_response(message, *, status_code):
    return Response(
        {"status": status_code, "message": message},
        status=status_code,
    )


def _format_error_message(detail):
    if isinstance(detail, str):
        return detail
    if isinstance(detail, Mapping):
        messages = [
            f"{key}: {message}"
            for key, value in detail.items()
            for message in [_format_error_message(value)]
            if message
        ]
        return "; ".join(messages)
    if isinstance(detail, (list, tuple)):
        return "; ".join(
            message for value in detail if (message := _format_error_message(value))
        )
    return str(detail) if detail is not None else ""


def api_exception_handler(exc, context):
    response = drf_exception_handler(exc, context)
    if response is None:
        logger.error(
            "Unhandled API exception",
            exc_info=(type(exc), exc, exc.__traceback__),
        )
        return error_response(
            "An unexpected error occurred.",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    message = _format_error_message(response.data) or "Request failed."
    response.data = {
        "status": response.status_code,
        "message": message,
    }
    return response
