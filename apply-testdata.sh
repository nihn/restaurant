#!/bin/sh

docker-compose stop && docker-compose rm -f
docker volume ls | grep restaurant_data

if [ $? -ne 0 ]; then
    docker volume create --name restaurant_data
fi

docker run --rm -v restaurant_data:/tmp/backup -v $(pwd):/backup debian bash -c "cd /tmp/backup && tar xvf /backup/test-data.tar --strip 1 && mv backup/* . && rm -r backup"
