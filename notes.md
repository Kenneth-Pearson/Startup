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

cd Startup
./deployFiles.sh -k production.pem -h cosmicclickerchallenge.click -s startup
./deployService.sh -k production.pem -h cosmicclickerchallenge.click -s startup

## Listening on port 4000

node index.js

## API I want to use

https://github.com/nasa/apod-api
Key -> GiL09jgswbhtmZ8bsL0Ze07Jm1OjFwfQNJSdfAVk
