const { REST, Routes } = require('discord.js');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		client.startTime = new Date();
		const rest = new REST({}).setToken(client.config.discord.token);
		(async () => {
			try {
				await rest.put(
					Routes.applicationCommands(client.config.discord.clientID), {
						body: client.commandData,
					},
				);
				console.debug('Successfully registered application commands globally');
			// eslint-disable-next-line brace-style
			} catch (error) {
				if (error) console.error(error);
			}
		})();
		client.guilds.fetch(client.config.discord.guildID).then(guild => {
			guild.members.fetch().then(() => {
				console.debug('Fetched all guild members');
				client.user.setActivity(`${guild.memberCount} members`, { type: 'WATCHING' });
			});
			guild.roles.fetch().then(roles => {
				client.roles = roles;
			}).then(() => {	
				console.debug('Guild Role collection populated');
			});
			guild.channels.fetch().then(channels => {
				client.guildchannels = channels;
			}).then(() => {
				console.debug('Guild channel collection populated');
			});
		});
	},
};