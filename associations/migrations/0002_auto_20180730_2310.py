# Generated by Django 2.0.7 on 2018-07-30 23:10

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('associations', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='election',
            name='ends_at',
            field=models.DateTimeField(default=datetime.datetime(2018, 7, 31, 23, 10, 31, 476640)),
        ),
    ]
