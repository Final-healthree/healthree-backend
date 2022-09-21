#!/bin/bash
REPOSITORY=/home/ubuntu/healthree-backend

cd $REPOSITORY

sudo npm ci

sudo pm2 kill

pm2 start process.json