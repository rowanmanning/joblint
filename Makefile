
# Group targets
all: deps start-dev

# Install dependencies
deps:
	@echo "Installing dependencies..."
	@npm install

# Start the application
start:
	@echo "Starting application..."
	@NODE_ENV=production node .

# Start the application in development mode
start-dev:
	@echo "Starting application (development mode)..."
	@NODE_ENV=development ./node_modules/.bin/supervisor -q .
