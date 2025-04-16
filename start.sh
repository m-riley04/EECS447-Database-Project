#!/usr/bin/env bash
set -e

## Install & build both
pushd backend
npm install
#npm run build
popd

pushd frontend
npm install
#npm run build
popd

## Launch both in parallel
pushd backend
node src/server.js &
PID_SRV=$!
popd

pushd frontend
npm run dev &
PID_CLI=$!
popd

## Wait for either to exit
wait $PID_SRV $PID_CLI
