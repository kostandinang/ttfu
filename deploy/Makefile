up:
	@echo "Starting ..."
	docker-compose up -d
	@$(MAKE) --no-print-directory status

build:
	@echo "Building ..."
	docker-compose build

status:
	@echo "Status ..."
	@docker-compose ps