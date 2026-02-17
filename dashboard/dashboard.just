# ------------------------------------------------------------------------------
# General Commands
# ------------------------------------------------------------------------------

# Install dependencies
install:
    npm install

# Install dependencies in workflow
ci:
    npm ci

# Run the application in development mode
dev:
    npm run dev

# Build the application for production
build:
    npm run build

# Preview the production build
run:
    just dashboard::build
    npm run preview

# Run unit tests
unit-test:
    npm run test

# Run unit tests in watch mode
unit-test-watch:
    npm run test:watch

# Lint typescript code with ESLint
lint:
    npx eslint .

# Lint typescript code with ESLint and generate a SARIF file
eslint-with-sarif:
    npx eslint . --format @microsoft/eslint-formatter-sarif --output-file eslint-results.sarif

# ------------------------------------------------------------------------------
# Prettier
# ------------------------------------------------------------------------------

# Check if code is formatted correctly
prettier-check:
    npx prettier . --check

# Format code with Prettier
prettier-format:
    npx prettier . --check --write
