#!/bin/sh

docker run --rm -v restaurant_data:/tmp/backup -v $(pwd):/backup debian tar cvf /backup/test-data.tar /tmp/backup
