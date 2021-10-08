const twitchApi = require("./twitchApi");

async function getID(username) {
	const json = await twitchApi(`users?login=${username}`);
	const id = json.data[0] ? json.data[0].id : "0";
	return id;
}

module.exports = getID;
