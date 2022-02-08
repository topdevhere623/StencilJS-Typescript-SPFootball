#!/bin/bash

# stops execution if any command returns non-zero code
# WARNING: http://mywiki.wooledge.org/BashFAQ/105
set -e


if [ $# -ne 2 ]; then
  echo 1>&2 "Usage: $0 image-name image-tag"
  exit 3
fi

IMAGE_NAME="ffspb-$1"
TAG="${2}"

REGISTRY="registry.guildofdogs.com"

rm -rf www
docker build -f Dockerfile.build -t ffspb-builder .
docker build -f Dockerfile.$1 -t ${IMAGE_NAME}:${TAG} .
docker build -f Dockerfile.$1 -t ${REGISTRY}/ftb/${IMAGE_NAME}:${TAG} .
docker push ${REGISTRY}/ftb/${IMAGE_NAME}:${TAG}
