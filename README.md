# ConachoBOT

This is a "spy bot" for twitch using the tmi.js library. <br>
It prints on the console every message of the target on channels that he follows.

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

### Replace variables

1. Open your applicacion, copy the Client ID and generate a Client Secret
2. Go to `src/credentials/.env` and change `CLIENT_SECRET` with your client secret, `CLIENT_ID` with your application client id and `TARGET` with the name of the user you want to "spy"

### Time to run the script

To run it you just have to do

```sh
node .
```

Note that due to Twitch rate limit, we can only join 2 chatrooms per second. After `0.5seconds * AMOUNT_OF_FOLLOWS` we asume that it connected to every chatroom
