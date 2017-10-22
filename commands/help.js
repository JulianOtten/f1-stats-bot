const discord = require('discord.js')

module.exports.run = async(bot, message, arguments) => {
    const myCommands = bot.commands;
    const commandNames = myCommands.keyArray();
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    let currentCategory = '';

    let embed = new discord.RichEmbed()
        .setTitle(":mailbox_with_mail: Command List")
        .setAuthor(message.author.username, message.author.avatarURL)

    const sorted = myCommands.array().sort((p, c) => p.help.name > c.help.name);
    sorted.forEach(c => {
        embed.addField(`${bot.prefix}${c.help.name}`, `${c.help.description}`)
    });
    embed.setFooter('F1Bot©', bot.user.avatarURL)
        .setThumbnail(bot.user.avatarURL)
        .setTimestamp(new Date())
        .setColor("#ff0000")
    message.reply("Help has been sent :incoming_envelope: ")
    message.author.send(embed);
}

module.exports.help = {
    name: "help",
    description: "Used to get information about all the commands"
}