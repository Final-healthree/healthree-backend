#!/bin/bash
REPOSITORY=/home/ubuntu/healthree-backend

cd $REPOSITORY

npm i

pm2 kill

pm2 start process.json