from django.forms import ModelForm
from django.forms import BaseInlineFormSet
from django.forms.widgets import TextInput
from django.core.exceptions import ValidationError
from .models import ProductTag, Order


class TagForm(ModelForm):
  class Meta:
    model = ProductTag
    fields = '__all__'
    widgets = {
      'color': TextInput(attrs={'type': 'color'}),
    }


class OrderStageFormSet(BaseInlineFormSet):
  def clean(self):
    super().clean()

    is_prev_done = True
    for form in self.forms:
      if not is_prev_done and form.cleaned_data['is_done']:
        raise ValidationError('Этап не может быть выполненным, так как не выполнены предыдущие этапы')
      is_prev_done = form.cleaned_data['is_done']
