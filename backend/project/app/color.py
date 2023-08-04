from random import randint

def get_random_blue_color():
  r = randint(0, 30)
  g = randint(80, 130)
  b = randint(200, 255)

  return f'rgb({r}, {g}, {b})'
