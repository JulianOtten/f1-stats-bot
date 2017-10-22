module.exports.run = async(bot, message, arguments) => {
    const myCommands = bot.commands;
    const commandNames = myCommands.keyArray();
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    let currentCategory = '';
    let output = `= Command List =\n`;
    const sorted = myCommands.array().sort((p, c) => p.help.name > c.help.name);
    sorted.forEach(c => {

        output += `${bot.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}\n`;
    });
    message.reply("Help has been sent :incoming_envelope: ")
    message.author.send(output, { code: 'asciidoc', split: true });
}

module.exports.help = {
    name: "help",
    description: "Used to get information about all the commands"
}