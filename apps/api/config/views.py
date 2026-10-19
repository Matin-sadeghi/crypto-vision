from rest_framework.decorators import api_view
from drf_spectacular.utils import extend_schema
from config.api_responses import success_response
from identity.presentation.api.serializers import ApiResponseSerializer


@extend_schema(responses=ApiResponseSerializer, summary="Health check")
@api_view(['GET'])
def health(_request):
    return success_response(
        {'status': 'ok', 'service': 'crypto-vision-api'},
        message="API is healthy.",
    )
