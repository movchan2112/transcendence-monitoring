# Use the official lightweight Python image
FROM python:3.11-slim

# Set the working directory inside the container
WORKDIR /app

# Prevent Python from writing .pyc files and ensure logs are output immediately
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Copy the dependencies file and install them
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Copy the entrypoint script and make it executable
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Set the entrypoint script to be executed first
ENTRYPOINT ["/app/entrypoint.sh"]

# The command to run when the container starts (passed to entrypoint)
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
