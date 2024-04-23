const custom = require('./custom');

module.exports = {
    builder: function (SlashCommandBuilder){
        SlashCommandBuilder.addSubcommandGroup(subcommandGroup => {
            subcommandGroup
                .setName('dm')
                .setDescription('Commands to DM a user');
                
                subcommandGroup = custom.builder(subcommandGroup);

                return subcommandGroup;
            });

        return SlashCommandBuilder;
    },
    execute: async function(interaction){
        await interaction.reply("Command");
    }
};