const tmi = require("tmi.js");
require("dotenv").config({ path: "./src/credentials/.env" });

function createClient(channels) {
	const config = {
		options: { debug: process.env.DEBUG == "true", joinInterval: 500 },
		identity: {
			username: process.env.BOT_USERNAME,
			password: process.env.BOT_TOKEN,
		},
		channels: channels,
	};
	const client = tmi.Client(config);
	return client;
}

module.exports = createClient;
