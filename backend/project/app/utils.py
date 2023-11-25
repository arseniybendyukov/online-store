from datetime import datetime


def to_price(price: int) -> str:
  return f'{price} ₽'


def format_datetime(raw: datetime) -> str:
  return raw.strftime('%d.%m.%Y %H:%M')


def crop_text(text: str, symbols: int) -> str:
  cropped_text = text[:symbols]
  if len(text) > symbols:
    cropped_text += '…'
  return cropped_text
