const twitchApi = require("./twitchApi");

async function getID(username) {
	const json = await twitchApi(`users?login=${username}`);
	const data = json.data[0];
	if (!data) throw new Error("Channel not found");
	return data.id;
}

module.exports = getID;
