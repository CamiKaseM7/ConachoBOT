const getChatters = require("./getChatters");
const getUserFollows = require("./getUserFollows");
const getID = require("./getID");

async function getConnectedChannels(target) {
	async function isConnected(channel) {
		const chatters = await getChatters(channel);
		return { name: channel, connected: chatters.includes(target) };
	}

	const id = await getID(target);
	const follows = await getUserFollows(id);

	follows.push({ login: target });

	const promises = [];

	follows.forEach((follow) => {
		promises.push(isConnected(follow.login));
	});

	return Promise.all(promises);
}

module.exports = getConnectedChannels;
