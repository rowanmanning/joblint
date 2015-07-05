
# Color helpers
C_CYAN=\x1b[34;01m
C_RESET=\x1b[0m
VERSION=`node -e "process.stdout.write(require('./package.json').version)"`
HOMEPAGE=`node -e "process.stdout.write(require('./package.json').homepage)"`

# Group targets
all: deps lint jscs test bundle
ci: lint jscs test

# Install dependencies
deps:
	@echo "$(C_CYAN)> installing dependencies$(C_RESET)"
	@npm install

# Lint JavaScript
lint:
	@echo "$(C_CYAN)> linting javascript$(C_RESET)"
	@./node_modules/.bin/jshint . --config .jshintrc

# Run JavaScript Code Style
jscs:
	@echo "$(C_CYAN)> checking javascript code style$(C_RESET)"
	@./node_modules/.bin/jscs . --config .jscsrc

# Run unit tests
test:
	@echo "$(C_CYAN)> running unit tests$(C_RESET)"
	@./node_modules/.bin/mocha ./test/unit --reporter spec --colors --recursive

# Bundle client-side JavaScript
bundle:
	@echo "$(C_CYAN)> bundling client-side JavaScript$(C_RESET)"
	@echo "/*! Joblint $(VERSION) | $(HOMEPAGE) */" > build/joblint.js
	@echo "/*! Joblint $(VERSION) | $(HOMEPAGE) */" > build/joblint.min.js
	@./node_modules/.bin/browserify ./lib/joblint --standalone joblint >> build/joblint.js
	@./node_modules/.bin/browserify ./lib/joblint --standalone joblint | ./node_modules/.bin/uglifyjs >> build/joblint.min.js
	@./node_modules/.bin/browserify ./test/unit/setup ./test/unit/lib/joblint > build/test.js

.PHONY: test
