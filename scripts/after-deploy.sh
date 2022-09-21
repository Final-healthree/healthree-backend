#!/bin/bash
REPOSITORY=/home/ubuntu/healthree-backend

cd $REPOSITORY

sudo npm ci

sudo pm2 kill

sudo pm2 start process.json