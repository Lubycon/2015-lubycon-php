#!/bin/bash

echo '========== Welcome to Bitbucket -> Github migration!!! =========='
echo 'Please insert github repository URL ->'

read -p '[URL] : ' githubURL

echo 'Checkout to master branch...'
git reset --hard HEAD
git co master
git pull

echo 'Start migration...'
git remote rename origin bitbucket
git remote add origin $githubURL
git push origin master

echo 'Finish migration'

