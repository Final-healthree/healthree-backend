#!/bin/bash
REPOSITORY=/home/ubuntu/healthree-backend

cd $REPOSITORY

npm ci

pm2 kill

pm2 start process.json