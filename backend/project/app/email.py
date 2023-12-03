import six
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_bytes
from .models import User
from django.core.mail import EmailMessage
from django.conf import settings


class TokenGenerator(PasswordResetTokenGenerator):
  def _make_hash_value(self, user, timestamp):
    return six.text_type(user.pk) + \
           six.text_type(timestamp) + \
           six.text_type(user.is_email_verified)

token_generator = TokenGenerator()


def send_activation_email(user, request):
  email_subject = 'Активация аккаунта'

  uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
  token = token_generator.make_token(user)
  link = f'http://{settings.MAIN_DOMAIN}/auth/email-verification?uidb64={uidb64}&token={token}'

  email_body = render_to_string('app/email_activation.html', {
    'user': user,
    'link': link,
  })

  email = EmailMessage(
    subject=email_subject,
    body=email_body,
    from_email=settings.EMAIL_HOST_USER,
    to=[user.email],
  )

  email.send()
