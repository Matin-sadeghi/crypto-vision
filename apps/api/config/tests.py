from django.test import SimpleTestCase
from rest_framework.test import APIClient


class ApiResponseContractTests(SimpleTestCase):
    def setUp(self):
        self.client = APIClient()

    def test_health_response_uses_success_envelope(self):
        response = self.client.get("/api/v1/health/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], 200)
        self.assertEqual(response.json()["message"], "API is healthy.")
        self.assertEqual(
            response.json()["data"],
            {"status": "ok", "service": "crypto-vision-api"},
        )

    def test_validation_errors_use_error_envelope(self):
        response = self.client.post("/api/v1/auth/login/", {}, format="json")

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["status"], 400)
        self.assertIn("email", response.json()["message"])
        self.assertIn("password", response.json()["message"])
        self.assertNotIn("error", response.json())
