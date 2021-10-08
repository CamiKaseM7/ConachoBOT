const fetch = require("node-fetch");
const sleep = require("./sleep");
require("dotenv").config({ path: "./src/credentials/.env" });

async function twitchApi(endpoint, body) {
	const requestOptions = {
		method: "get",
		headers: {
			Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
			"Client-id": process.env.CLIENT_ID,
			"Ratelimit-Reset": "true",
		},
		redirect: "follow",
	};

	if (body) {
		requestOptions.body = JSON.stringify(body);
		requestOptions.method = "post";
	}

	const response = await fetch(
		`https://api.twitch.tv/helix/${endpoint}`,
		requestOptions
	);

	const remaining = response.headers.get("Ratelimit-Remaining");
	const reset = response.headers.get("Ratelimit-Reset");

	if (remaining < 1) {
		const now = new Date();
		sleep(reset - Math.round(now.getTime() / 1000));
		return await twitchApi(endpoint, body);
	}

	const json = await response.json();
	return json;
}

module.exports = twitchApi;
