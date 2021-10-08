const createClient = require("./client/createClient");
const {
	getUserFollows,
	getID,
	handleConnection,
	handleMessage,
} = require("./utils/index");
require("dotenv").config({ path: "./src/credentials/.env" });

(async () => {
	const target = process.env.TARGET;
	const id = await getID(target);
	const follows = await getUserFollows(id);
	const channels = [target];

	follows.forEach((follow) => channels.push(follow.login));
	const client = createClient(channels);

	client.connect().then(() => console.log("Connecting to channels..."));

	setTimeout(() => {
		console.log("Should be done connecting to channels");
	}, 500 * follows.length);

	client.on("connecting", (adress, port) => {
		handleConnection(client, adress, port);
	});
	client.on("message", (channel, tags, message, self) => {
		handleMessage(client, target, channel, tags, message, self);
	});
})();
