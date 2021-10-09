const fetch = require("node-fetch");

async function getChatters(channel) {
	const chatters = [];
	const response = await fetch(
		`https://tmi.twitch.tv/group/user/${channel}/chatters`
	);
	const json = await response.json();

	json.chatters.broadcaster.forEach((chatter) => chatters.push(chatter));
	json.chatters.vips.forEach((chatter) => chatters.push(chatter));
	json.chatters.moderators.forEach((chatter) => chatters.push(chatter));
	json.chatters.viewers.forEach((chatter) => chatters.push(chatter));

	return chatters;
}

module.exports = getChatters;
