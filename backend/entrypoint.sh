#!/bin/bash

# Apply database migrations automatically
echo "Applying database migrations..."
python manage.py migrate

# Create default superuser for development
# (The '|| true' part ensures it doesn't crash if the user already exists)
echo "Creating default superuser..."
export DJANGO_SUPERUSER_USERNAME=root
export DJANGO_SUPERUSER_EMAIL=admin@admin.com
export DJANGO_SUPERUSER_PASSWORD=123456
python manage.py createsuperuser --noinput || true

# Start the server (this executes the CMD from Dockerfile)
exec "$@"
