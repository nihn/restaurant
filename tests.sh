#!/bin/sh

docker-compose run --entrypoint bash --rm frontend -c "coverage run --source='.' manage.py test && coverage report"
