#!/bin/bash
set -e

IMAGE="localhost/backend-interview:latest"
CONTAINER="backend-interview"
PORT="8089"

echo ">>> Pulling latest code..."
git pull

echo ">>> Building Docker image..."
docker build -t $IMAGE .

echo ">>> Stopping old container..."
docker stop $CONTAINER 2>/dev/null || true
docker rm $CONTAINER 2>/dev/null || true

echo ">>> Starting new container on port $PORT..."
docker run -d \
  --name $CONTAINER \
  --restart unless-stopped \
  -p $PORT:80 \
  $IMAGE

echo ">>> Done! App running at http://localhost:$PORT"

# Check container status
sleep 2
docker ps --filter name=$CONTAINER --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
