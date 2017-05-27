#!/bin/sh

# Requires ionic and firebase-tools are installed
# If not installed, copy the following command:
# npm install -g firebase-tools ionic cordova

cd epoch
ionic cordova build browser
firebase deploy
