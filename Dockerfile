FROM ubuntu:20.04

MAINTAINER KevinDuy <mr.kevinduy@gmail.com>

ENV DEBIAN_FRONTEND noninteractive
ENV TZ=Etc/UTC
ENV SHELL=/bin/bash

# Install
ADD install.sh /install.sh

RUN chmod +x /*.sh

RUN /install.sh
