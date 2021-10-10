const createClient = require("./client/createClient");

const {
	handleConnection,
	handleMessage,
	getConnectedChannels,
	sleep,
} = require("./utils/index");

require("dotenv").config({ path: "./src/credentials/.env" });

(async () => {
	const target = process.env.TARGET;

	console.log("Searching connected channels");
	const channels = await getConnectedChannels(target);
	const connectedChannels = [];

	channels.forEach((channel) => {
		if (channel.connected) connectedChannels.push(`#${channel.name}`);
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

	const refreshBot = setInterval(async () => {
		const newConnectedChannels = [];
		const channels = await getConnectedChannels(target);
		channels.forEach((channel) => {
			if (
				channel.connected &&
				!connectedChannels.includes(`#${channel.name}`)
			) {
				console.log(`Found in ${channel.name}`);
				connectedChannels.push(`#${channel.name}`);
				newConnectedChannels.push(`#${channel.name}`);
			}
		});
		for (newConnection of newConnectedChannels) {
			sleep(2000);
			client.join(newConnection);
		}
	}, 1000 * 60);
})();
