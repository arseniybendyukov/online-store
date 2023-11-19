from django.contrib import admin
from app.models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
  list_display = (
    'fullname',
    'email',
    'phone_number',
  )

  @admin.display(description='Имя и фамилия')
  def fullname(self, instance):
    return instance.fullname
  fullname.admin_order_field = 'first_name'
