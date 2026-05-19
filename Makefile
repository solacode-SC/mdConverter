.PHONY: help up down dev prod restart rebuild logs clean reset status

GREEN=\033[1;32m
BLUE=\033[1;34m
RED=\033[1;31m
YELLOW=\033[1;33m
CYAN=\033[1;36m
NC=\033[0m

FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:8000

help:
	@echo "$(CYAN)=======================================$(NC)"
	@echo "$(GREEN)   MD CONVERTER - AVAILABLE COMMANDS   $(NC)"
	@echo "$(CYAN)=======================================$(NC)"
	@echo ""
	@echo "$(YELLOW)DEV MODE:$(NC)"
	@echo "  make dev        -> Start development environment (hot reload)"
	@echo ""
	@echo "$(YELLOW)PROD MODE:$(NC)"
	@echo "  make up         -> Start production"
	@echo "  make prod       -> Alias for production"
	@echo ""
	@echo "$(YELLOW)GENERAL:$(NC)"
	@echo "  make down       -> Stop containers (production)"
	@echo "  make restart    -> Restart containers (production)"
	@echo "  make rebuild    -> Rebuild images (production)"
	@echo "  make logs       -> Show logs (production)"
	@echo "  make status     -> Show status (production)"
	@echo "  make clean      -> Remove containers & volumes (production)"
	@echo "  make reset      -> Full reset + rebuild (production)"
	@echo ""
	@echo "$(CYAN)Frontend: $(FRONTEND_URL)$(NC)"
	@echo "$(CYAN)Backend:  $(BACKEND_URL)$(NC)"
	@echo "$(CYAN)=======================================$(NC)"

up:
	@echo "$(GREEN)🚀 Starting PRODUCTION mode...$(NC)"
	@echo "$(CYAN)Frontend: $(FRONTEND_URL)$(NC)"
	@echo "$(CYAN)Backend:  $(BACKEND_URL)$(NC)"
	docker compose -f docker-compose.yml up -d --build

prod: up

dev:
	@echo "$(YELLOW)🧪 Starting DEVELOPMENT mode...$(NC)"
	@echo "$(CYAN)Frontend: $(FRONTEND_URL)$(NC)"
	@echo "$(CYAN)Backend:  $(BACKEND_URL)$(NC)"
	docker compose -f docker-compose.dev.yml up --build

down:
	@echo "$(RED)🛑 Stopping containers...$(NC)"
	docker compose -f docker-compose.yml down

restart:
	@echo "$(YELLOW)🔄 Restarting...$(NC)"
	docker compose -f docker-compose.yml restart

rebuild:
	@echo "$(BLUE)🔨 Rebuilding...$(NC)"
	docker compose -f docker-compose.yml up -d --build --force-recreate

logs:
	docker compose -f docker-compose.yml logs -f

status:
	@echo "$(BLUE)📊 Container status:$(NC)"
	docker compose -f docker-compose.yml ps

clean:
	@echo "$(RED)🧹 Cleaning system...$(NC)"
	docker compose -f docker-compose.yml down -v
	docker system prune -f

reset: clean
	@echo "$(RED)♻️ Full reset + rebuild...$(NC)"
	docker compose -f docker-compose.yml up -d --build
