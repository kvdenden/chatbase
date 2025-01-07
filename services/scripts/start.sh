#!/usr/bin/env sh

# Exit immediately if a command exits with a non-zero status
set -e

# Navigate to the services directory
cd "$(dirname "$0")/.."

# Start Docker Compose services in detached mode
docker-compose up -d

# Display the status of the services
docker-compose ps