#!/bin/sh

docker-compose run --rm --entrypoint pip frontend freeze > src/freeze.txt
