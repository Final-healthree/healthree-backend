#!/bin/bash
REPOSITORY=/home/ubuntu/healthree-backend

cd $REPOSITORY

sudo npm i

sudo pm2 start process.json