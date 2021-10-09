const getUserFollows = require("./getUserFollows");
const getID = require("./getID");
const handleConnection = require("./handleConnection");
const handleMessage = require("./handleMessage");
const getChatters = require("./getChatters");
const getConnectedChannels = require("./getConnectedChannels");

module.exports = {
	getUserFollows: getUserFollows,
	getID: getID,
	handleConnection: handleConnection,
	handleMessage: handleMessage,
	getChatters: getChatters,
	getConnectedChannels: getConnectedChannels,
};
