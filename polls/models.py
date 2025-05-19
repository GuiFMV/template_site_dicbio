from django.db import models

class Person(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    age = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name