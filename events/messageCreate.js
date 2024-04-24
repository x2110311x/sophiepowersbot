module.exports = {
	name: 'messageCreate',
	once: false,
	async execute(member, client) {
		console.debug('A message was sent');
	},
};