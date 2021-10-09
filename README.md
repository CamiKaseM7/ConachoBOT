# ConachoBOT
This is a "spy bot" for twitch using the tmi.js library
it prints on the console every message of the target on channels that he follows.

## How to use
### Installation
1. Clone the repo
```sh
git clone https://github.com/CamiKaseM7/ConachoBOT.git
```
2. Install the dependencies
```sh
npm install
```
### Register an application
1. Go to https://dev.twitch.tv/console 
2. Click `Register Your Application`
3. Write the name you want for your app and an OAuth Redirect URL, we won't need that so you can just write https://www.example.com or any valid url

### Getting a token 
1. Open your applicacion, copy the Client ID and generate a Client Secret
2. Run this and copy the access_token of the response
```
curl -X POST https://id.twitch.tv/oauth2/token?client_id=<YOUR CLIENT ID>&client_secret=<YOUR CLIENT SECRET>&grant_type=client_credentials
```
### Replace variables
1. Go to `src/credentials/.env` and change `BEARER_TOKEN` with your access_token, `CLIENT_ID` with your application client_id and `TARGET` with the name of the user you want to "spy"
### Time to run the script
To run it you just have to do
```sh
node .
```
Note that due to Twitch rate limit, we can only join 2 chatrooms per second. After `0.5seconds * AMOUNT_OF_FOLLOWS` we asume that it connected to every chatroom
