#!/usr/bin/env bash

if [[ -e "dist.zip" ]]; then
  rm dist.zip
fi

if [[ -d "dist" ]]; then
  rm -r dist
fi

mkdir -p dist/icons

node_modules/.bin/tsc --noEmit

# target browsers based on support for :has selector
node_modules/esbuild/bin/esbuild src/content-script.ts src/service-worker.ts --bundle --outdir=dist --target=chrome105,firefox121 --format=esm

cp icons/*.png dist/icons

jq 'del(."$schema")' manifest.json > dist/manifest.json

cp src/content-styles.css dist/content-styles.css

cd dist && zip -r ../dist.zip .
