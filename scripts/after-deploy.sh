#!/bin/bash
REPOSITORY=/home/ubuntu/healthree-backend

cd $REPOSITORY

sudo -s

npm ci

pm2 kill

pm2 start process.json