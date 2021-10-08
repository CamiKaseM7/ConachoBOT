function handleMessage(client, target, channel, tags, message, self) {
	if (self) return;
	if (tags.username != target) return;

	console.log(`${target} said: ${message} in ${channel}`);
}

module.exports = handleMessage;
