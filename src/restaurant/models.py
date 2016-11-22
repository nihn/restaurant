from django.core.exceptions import ValidationError
from django.db import models


class PositiveFloatField(models.FloatField):
    description = 'Positive floating point number'

    def validate(self, value, model_instance):
        super(PositiveFloatField, self).validate(value, model_instance)
        if value <= 0:
            raise ValidationError("'%(value)s' value must be positive.",
                                  params={'value': value})


class BaseModel(models.Model):
    class Meta:
        abstract = True

    ctime = models.DateField(auto_now_add=True)
    mtime = models.DateField(auto_now=True)

    def __unicode__(self):
        return self.name


class Dish(BaseModel):
    class Meta:
        verbose_name_plural = 'Dishes'

    name = models.TextField(max_length=30)
    price = PositiveFloatField()
    preparing_time = models.DurationField()
    vegetarian = models.BooleanField(default=False)


class Menu(BaseModel):
    name = models.TextField(max_length=15, unique=True)
    dishes = models.ManyToManyField(Dish)
    description = models.TextField()
