const fetch = require("node-fetch");
const fs = require("fs");
const sleep = require("./sleep");
const generateBearerToken = require("./generateBearerToken");
require("dotenv").config({ path: "./src/credentials/.env" });

async function twitchApi(endpoint, body) {
	let bearer;

	if (fs.existsSync("./src/credentials/cache.json")) {
		const cache = fs.readFileSync("./src/credentials/cache.json");
		bearer = JSON.parse(cache).bearer;
		if (!bearer) bearer = await generateBearerToken();
	} else {
		bearer = await generateBearerToken();
	}

	const requestOptions = {
		method: "get",
		headers: {
			Authorization: `Bearer ${bearer}`,
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
