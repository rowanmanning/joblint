include Makefile.node

export EXPECTED_COVERAGE := 85

VERSION=`node -e "process.stdout.write(require('./package.json').version)"`
HOMEPAGE=`node -e "process.stdout.write(require('./package.json').homepage)"`

all: install ci bundle

# Bundle client-side JavaScript
bundle:
	@echo "/*! Joblint $(VERSION) | $(HOMEPAGE) */" > build/joblint.js
	@echo "/*! Joblint $(VERSION) | $(HOMEPAGE) */" > build/joblint.min.js
	@browserify ./lib/joblint --standalone joblint >> build/joblint.js
	@browserify ./lib/joblint --standalone joblint | uglifyjs >> build/joblint.min.js
	@browserify ./test/unit/setup ./test/unit/lib/joblint > build/test.js
	@$(TASK_DONE)
