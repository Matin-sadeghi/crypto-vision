from django.contrib.auth import get_user_model
from django.test import SimpleTestCase, TestCase
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


class AuthSessionTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            email="member@example.com",
            password="secure-password-123",
            first_name="Test",
            last_name="Member",
        )

    def test_login_sets_http_only_refresh_cookie_and_me_returns_user(self):
        response = self.client.post(
            "/api/v1/auth/login/",
            {"email": self.user.email, "password": "secure-password-123"},
            format="json",
        )

        self.assertEqual(response.status_code, 200)
        data = response.json()["data"]
        self.assertEqual(data["user"]["id"], self.user.id)
        self.assertIn("access", data)
        self.assertNotIn("refresh", data)

        refresh_cookie = response.cookies["refreshToken"]
        self.assertEqual(refresh_cookie["httponly"], True)
        self.assertEqual(refresh_cookie["path"], "/api/v1/")

        refresh_response = self.client.post("/api/v1/auth/refresh/")
        self.assertEqual(refresh_response.status_code, 200)
        self.assertIn("access", refresh_response.json()["data"])

        me_response = self.client.get(
            "/api/v1/auth/me/",
            HTTP_AUTHORIZATION=f"Bearer {data['access']}",
        )

        self.assertEqual(me_response.status_code, 200)
        self.assertEqual(me_response.json()["data"]["email"], self.user.email)
