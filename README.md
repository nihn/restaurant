# Restaurant #
Simple Django project which simulates some restaurant web app. Currently only
menu app is implemented.

## Installing ##
You will need [Docker](https://www.docker.com/) and [Docker-compose](https://docs.docker.com/compose/).
With these two present type `docker-compose build`.

## Running application ##
Type `docker-compose up`, app will be available on `localhost:8000`.

## Tests ##
Run `./tests.sh`

## Backup test dataset ##
Run `./backup-testdata.sh`.

## Applying test dataset ##
Run `./apply-testdata.sh`. Note if you want to do this when postgres was already started then you
need to remove data volume `docker-compose stop && docker-compose rm -f && docker volume rm restaurant_data`.
