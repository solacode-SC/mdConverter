.PHONY: up down restart rebuild logs clean reset status

up:
	@echo "\033[1;32mStarting MD Converter...\033[0m"
	@echo "\033[1;36m🌐 App will be available at: http://localhost:3000\033[0m"
	docker compose up --build

down:
	@echo "\033[1;31mStopping MD Converter...\033[0m"
	docker compose down

status:
	@echo "\033[1;34mChecking container status...\033[0m"
	docker compose ps

restart:
	@echo "\033[1;33mRestarting MD Converter...\033[0m"
	docker compose restart

rebuild:
	@echo "\033[1;34mRebuilding MD Converter...\033[0m"
	docker compose up --build --force-recreate -d

logs:
	docker compose logs -f

clean:
	@echo "\033[1;31mCleaning up containers and dangling images...\033[0m"
	docker compose down -v
	docker system prune -f

reset: clean
	@echo "\033[1;31mFull reset... Rebuilding...\033[0m"
	docker compose up --build
