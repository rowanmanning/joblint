
# Group targets
all: deps lint test

# Install dependencies
deps:
	@echo "Installing dependencies..."
	@npm install

# Lint JavaScript
lint:
	@echo "Linting JavaScript..."
	@./node_modules/.bin/jshint \
		--config ./test/config/jshint.json \
		./{bin,lib,rule,test}/*

# Run all tests
test: test-unit

# Run unit tests
test-unit:
	@echo "Running unit tests..."
	@./node_modules/.bin/mocha \
		--reporter spec \
		--colors \
		--recursive \
		./test/unit
