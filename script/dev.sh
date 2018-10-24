#!/bin/bash

npm run dev-server &
sleep 3s
NODE_ENV=development npm run electron
