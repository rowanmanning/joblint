
# Color helpers
C_CYAN=\x1b[34;01m
C_RESET=\x1b[0m

# Build the site
build:
	@echo "$(C_CYAN)> building site$(C_RESET)"
	@bundle exec jekyll build --drafts

# Watch the site for changes, then build
watch:
	@echo "$(C_CYAN)> watching and building site$(C_RESET)"
	@bundle exec jekyll build --watch --drafts

# Serve the site
serve:
	@echo "$(C_CYAN)> serving site$(C_RESET)"
	@bundle exec jekyll serve --watch --drafts
