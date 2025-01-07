#!/usr/bin/env sh

# Exit immediately if a command exits with a non-zero status
set -e

# Navigate to the services directory
cd "$(dirname "$0")/.."

# Stop and remove Docker Compose services
docker-compose down

# Display the status of the services
docker-compose ps