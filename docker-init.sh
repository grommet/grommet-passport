#!/bin/bash

# echo "Installing Yarn"
npm i -g yarn
yarn cache clear
yarn config set cache-folder /nodejs/yarn-cache

echo "Installing Forever"
npm i -g forever

echo "Installing client dependencies"
yarn --cwd /var/www/client

echo "Launching client server"
npm run start --prefix /var/www/client