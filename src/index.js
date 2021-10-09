const createClient = require("./client/createClient");

const {
	handleConnection,
	handleMessage,
	getConnectedChannels,
} = require("./utils/index");

require("dotenv").config({ path: "./src/credentials/.env" });

(async () => {
	const target = process.env.TARGET;

	console.log("Searching connected channels");
	const channels = await getConnectedChannels(target);
	const connectedChannels = [];

	channels.forEach((channel) => {
		if (channel.connected) connectedChannels.push(channel.name);
	});

	console.log("Done searching connected channels");
	console.log(connectedChannels);

	const client = createClient(connectedChannels);

	client.connect().then(() => {
		console.log(
			`Connecting to channels (${connectedChannels.length}), estimated time: ${
				(connectedChannels.length * 2000) / 1000
			} seconds`
		);
		setTimeout(() => {
			console.log("Should be done connecting to channels");
		}, 2000 * connectedChannels.length);
	});

	client.on("connecting", (adress, port) => {
		handleConnection(client, adress, port);
	});

	client.on("message", (channel, tags, message, self) => {
		handleMessage(client, target, channel, tags, message, self);
	});
})();
