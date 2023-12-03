from random import randint


def get_random_blue_color():
  r = randint(0, 40)
  g = randint(90, 130)
  b = randint(220, 255)

  return f'rgb({r}, {g}, {b})'
