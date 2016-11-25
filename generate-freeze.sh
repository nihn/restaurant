#!/bin/sh

docker-compose run --rm --entrypoint bash frontend -c "
apt-get update &&
apt-get install libpq-dev build-essential &&
pip install virtualenv &&
virtualenv freeze &&
freeze/bin/pip install -r requirements.txt &&
freeze/bin/pip freeze > freeze.txt"
