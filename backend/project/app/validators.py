from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator


PERCENTAGE_VALIDATOR = [MinValueValidator(0), MaxValueValidator(100)]

RATING_VALIDATOR = [MinValueValidator(1), MaxValueValidator(5)]

PHONE_NUMBER_VALIDATOR = RegexValidator(
  regex=r'^\+?1?\d{9,15}$',
  message='Номер должен быть введен в формате: \'+999999999\'. Номер не должен содержать больше 15 цифр.'
)
