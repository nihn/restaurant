FROM python:3.5-slim

COPY src/requirements.txt requirements.txt
RUN apt-get update && \
    apt-get install -y --no-install-recommends build-essential libpq-dev && \
    pip install -r requirements.txt && \
    apt-get purge -y build-essential libpq-dev && \
    apt-get clean

EXPOSE 8000
WORKDIR /opt/restaurant/src

ENTRYPOINT ["./manage.py"]
CMD ["runserver", "0:8000"]
