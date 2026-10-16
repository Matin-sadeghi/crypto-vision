from django.urls import path
from .views import RegisterView,LoginView,MeView,RefrshCookieView,LogoutView

urlpatterns = [
    path("register/",RegisterView.as_view(),name="auth-register"),
    path("login/",LoginView.as_view(),name="auth-login"),
    path("refresh/",RefrshCookieView.as_view(),name="auth-refresh"),
    path("logout/",LogoutView.as_view(),name="auth-logout"),
    path("me/",MeView.as_view(),name="auth-me")
    
]
