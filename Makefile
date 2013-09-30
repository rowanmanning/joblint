
# Group targets
all: deps lint start-dev

# Install dependencies
deps:
	@echo "Installing dependencies..."
	@npm install

# Lint JavaScript
lint:
	@echo "Linting JavaScript..."
	@./node_modules/.bin/jshint \
		--config ./test/config/jshint.json \
		--exclude ./node_modules \
		*.js **/*.js

# Start the application
start:
	@echo "Starting application..."
	@NODE_ENV=production node .

# Start the application in development mode
start-dev:
	@echo "Starting application (development mode)..."
	@NODE_ENV=development ./node_modules/.bin/supervisor -q .
