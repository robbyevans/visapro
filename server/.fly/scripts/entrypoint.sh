#!/bin/bash
set -e

# Wait for database to be ready (for PostgreSQL)
if [ -n "$DATABASE_URL" ]; then
  until pg_isready -d "$DATABASE_URL"; do
    echo "Waiting for database to be ready..."
    sleep 2
  done
fi

# Run database migrations
echo "Running database migrations..."
bundle exec rails db:migrate

# Start the server
echo "Starting application server..."
exec "$@"
