*This project has been created as part of the 42 curriculum by Irina, Vlad, Lily, Mykola, and Marcel.*

# ft_transcendence

## Description
This project is a web-based multiplayer Pong game platform, serving as the final project of the 42 Common Core. Its goal is to provide a comprehensive web application featuring real-time synchronization, user management, and a microservice architecture. This initial version establishes the Proof of Concept (PoC) infrastructure, demonstrating a fully containerized environment with a reverse proxy, a relational database, and a working frontend-backend connection.

## Instructions

### Prerequisites
- Docker and Docker Compose (or OrbStack on macOS).
- Make.

### Environment Setup
Create a `.env` file in the root directory based on `.env.example`:
```bash
cp .env.example .env

Fill in the required database credentials.

Launch the infrastructure

Run the following command to build the images and start the containers (Nginx, Django, PostgreSQL, React) in detached mode:

make up

Database Migrations

Run migrations to set up the database schema:

docker compose run --rm backend python manage.py migrate

Accessing the Application

Frontend (React/Vite): http://localhost:5173 (direct) or http://localhost (via Nginx).

Django Admin: http://localhost/admin/

Development & Initial Setup
Pre-configured Superuser

For initial testing and database management, a superuser has been created (ensure you run createsuperuser if resetting the DB):

Username: root

Password: 123456

Technology Stack

Frontend: React (Vite)

Backend: Django

Database: PostgreSQL

Reverse Proxy: Nginx

Containerization: Docker & Docker Compose

Team Information
Irina: Project Manager / Developer

Vlad: Technical Lead / Developer

Lily: Developer (Frontend Research)

Mykola: Product Owner / Developer

Marcel: Developer

Resources
Django Documentation
https://docs.djangoproject.com/en/stable/

React Documentation
https://react.dev/

Docker Compose Specification
https://docs.docker.com/compose/

AI Usage

AI was used to assist in infrastructure design (Docker Compose, Nginx configuration) and to generate initial boilerplate for Django models, React components, and documentation.
