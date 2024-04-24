const { Client, Collection, IntentsBitField } = require('discord.js');
const fs = require('fs');

const myIntents = new IntentsBitField();
myIntents.add( IntentsBitField.Flags.GuildPresences, IntentsBitField.Flags.GuildMembers, 
	IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages );

const client = new Client({ intents: myIntents });
client.commands = new Collection();
client.commandData = [];
client.roles = new Collection();
client.guildchannels = new Collection();
client.config = require('./config.json');

const commandFiles = fs.readdirSync('./commands',  { withFileTypes: true }).filter((item) => item.isDirectory()).map((item) => item.name);
for (const file of commandFiles) {
	try{
		const command = require(`./commands/${file}`);
		client.commands.set(command.data.name, command);
		client.commandData.push(command.data.toJSON());
		console.debug(`${file} command registered`);
	} catch (e) {
		console.error(`Could not load command: ${file}`);
		console.error(e);
	}
}


const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
	console.debug(`${file} event handler was registered`);
}

client.login(client.config.discord.token);