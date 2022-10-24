FROM ubuntu:bionic

LABEL MAINTAINER="Benoit Vander Stappen <vdsbenoit@gmail.com>"

# Based on Kusumoto work https://github.com/Kusumoto/docker-ionic-android-sdk

ARG NODEJS_VERSION="10"
ARG IONIC_VERSION="5.4.12"
ARG ANDROID_SDK_VERSION="4333796"
ENV ANDROID_BUILD_TOOLS_VERSION="29.0.2"

ENV ANDROID_HOME="/opt/android-sdk"
ENV ANDROID_SDK_ROOT=$ANDROID_HOME
ENV JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-amd64

# 1) Install system package dependencies
# 2) Install Nodejs/NPM/Ionic-Cli
# 3) Install Android SDK
# 4) Install SDK tool for support ionic build command
# 5) Cleanup
# 6) Add and set user for use by ionic and set work folder

RUN apt-get update -qq\
 && apt-get install -y \
    build-essential \
    openjdk-8-jre \
    openjdk-8-jdk \
    curl \
    unzip \
    git \
    gradle \
 && curl -sL https://deb.nodesource.com/setup_${NODEJS_VERSION}.x | bash - \
 && apt-get update \
 && apt-get install -y nodejs \
 && npm install -g cordova ionic@${IONIC_VERSION} \
 && npm install -g @angular/cli \
 && npm install -g firebase-tools \
 && cd /tmp \
 && curl -fSLk https://dl.google.com/android/repository/sdk-tools-linux-${ANDROID_SDK_VERSION}.zip -o sdk-tools-linux.zip \
 && unzip sdk-tools-linux.zip \
 && mkdir /opt/android-sdk \
 && mv tools /opt/android-sdk \
 && yes | $ANDROID_HOME/tools/bin/sdkmanager --licenses \
 && $ANDROID_HOME/tools/bin/sdkmanager "platform-tools" \
 && $ANDROID_HOME/tools/bin/sdkmanager "build-tools;${ANDROID_BUILD_TOOLS_VERSION}" \
 && apt-get autoremove -qq\
 && apt-get autoclean \
 && rm -rf /var/lib/apt/lists/* \
 && rm -rf /tmp/sdk-tools-linux.zip \
 && mkdir /ionicapp

WORKDIR /ionicapp




