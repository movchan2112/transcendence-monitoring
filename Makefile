# Makefile
NAME = ft_transcendence

all: up

up:
	docker compose up --build -d

down:
	docker compose down

logs:
	docker compose logs -f

clean: down
	docker system prune -a --volumes -f

re: clean up

.PHONY: all up down logs clean re
