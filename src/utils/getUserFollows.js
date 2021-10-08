const twitchApi = require("./twitchApi");

async function getUserFollowsAfter(channel_id, cursor) {
	let url = `users/follows?from_id=${channel_id}&first=100`;
	if (cursor) url += `&after=${cursor}`;
	const json = await twitchApi(url);
	return json;
}

async function getUserFollows(channel_id) {
	const follows = [];
	let cursor = undefined;

	while (true) {
		const json = await getUserFollowsAfter(channel_id, cursor);
		json.data.forEach((follow) =>
			follows.push({
				name: follow.to_name,
				login: follow.to_login,
				id: follow.to_id,
				followed_at: follow.followed_at,
			})
		);

		cursor = json.pagination.cursor;
		if (!cursor) break;
	}
	return follows;
}

module.exports = getUserFollows;
