# NOTES 260

wow!! This is cool :)

## EC2

35.171.1.184
https://cosmicclickerchallenge.click/
I learned how to create an EC2 instance and I allocated an elastic ip address.

## Entering my server

ssh -i production.pem ubuntu@35.171.1.184
ssh -i production.pem ubuntu@cosmicclickerchallenge.click

## Play.html

https://startup.cosmicclickerchallenge.click/play.html

## Deploying files to the server

### Old Method Static

cd Startup
./deployFiles.sh -k production.pem -h cosmicclickerchallenge.click -s startup

### New Method Backend

cd Startup
./deployService.sh -k production.pem -h cosmicclickerchallenge.click -s startup

## Entering the Server

ssh -i ~/Desktop/cs260/Startup/production.pem ubuntu@cosmicclickerchallenge.click

## Listening on port 4000

node index.js
