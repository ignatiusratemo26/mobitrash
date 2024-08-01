from django.contrib.auth.management.commands.createsuperuser import Command as CreateSuperuserCommand
from django.core.management import CommandError

class Command(CreateSuperuserCommand):
    def add_arguments(self, parser):
        super().add_arguments(parser)
        parser.add_argument('--address', dest='address', required=True, help='User address')
        parser.add_argument('--phone_number', dest='phone_number', required=True, help='User phone number')

    def handle(self, *args, **options):
        address = options.get('address')
        phone_number = options.get('phone_number')

        if not address:
            raise CommandError('You must provide an address.')
        if not phone_number:
            raise CommandError('You must provide a phone number.')

        options['extra_fields'] = {'address': address, 'phone_number': phone_number}
        super().handle(*args, **options)
