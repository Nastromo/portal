#!/bin/bash

cp -R middleware prod
cp -R models prod
cp -R routes prod
cp -R utils prod
cp app.js prod
cp db.js prod
cp package.json prod

cd prod
tar czf app.tar.gz middleware/ models/ routes/ utils/ app.js db.js package.json .env

sftp -i "empraws.pem" ec2-user@18.222.204.34 << 'ENDSSH'
put app.tar.gz
exit
ENDSSH

rm app.tar.gz

ssh -i "empraws.pem" ec2-user@18.222.204.34 << 'ENDSSH'
pm2 stop portal
rm -rf portal_back/* portal_back/.*
tar xf app.tar.gz -C portal_back
rm app.tar.gz
cd portal_back
npm install
pm2 start portal
ENDSSH