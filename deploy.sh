#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# copy index.html as 404.html to prevent showing 404 page on reload
cp index.html 404.html

git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:M1nt-y/doit.git master:gh-pages

cd -