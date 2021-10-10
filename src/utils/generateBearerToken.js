const fetch = require("node-fetch");
const fs = require("fs");
require("dotenv").config({ path: "./src/credentials/.env" });

async function generateBearerToken() {
	const requestOptions = {
		method: "POST",
	};
	const response = await fetch(
		`https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`,
		requestOptions
	);
	const json = await response.json();

	const token = json.access_token;

	fs.writeFileSync(
		"./src/credentials/cache.json",
		JSON.stringify({ bearer: token }),
		(error) => {
			if (error) {
				console.log(error);
				return;
			}
		}
	);
	return token;
}

module.exports = generateBearerToken;
