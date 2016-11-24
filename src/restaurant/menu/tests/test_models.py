from unittest import TestCase

from django.core.exceptions import ValidationError

from restaurant.menu.models import PositiveFloatField


class PositiveFloatFieldTestCase(TestCase):
    def test_value_ok(self):
        try:
            PositiveFloatField().validate(1.0, None)
        except ValidationError:
            self.fail('Validation error raised')

    def test_invalid_value(self):
        self.assertRaises(
            ValidationError, PositiveFloatField().validate, -1.0, None)
