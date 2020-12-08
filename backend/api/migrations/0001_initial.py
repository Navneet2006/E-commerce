from django.db import migrations
from api.user.models import CustomUser

class Migration(migrations.Migration):
    def seed_data(apps,schema_editor):
        user= CustomUser(name ="navneet", 
                        email="navneetdhankad111@gmail.com",
                        is_staff=True,
                        is_superuser=True,
                        gender="Male")

        user.set_password("sunny.01")
        user.save()

    dependencies =[]

    operations = [
                 migrations.RunPython(seed_data),
                 ]