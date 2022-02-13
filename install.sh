#!/usr/bin/env bash

apt-get update -y
apt-get install -y tzdata
apt-get install -y \
  git \
  curl \
  vim \
  nano \
  tree \
  zip \
  unzip

# Install nodejs
cd ~
curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh
chmod +x ./nodesource_setup.sh
./nodesource_setup.sh
apt-get install -y nodejs
