module.exports.run = async(bot, message, arguments) => {
    const cmds = bot.commands;

    const help = {};

    cmds.map(c => help[c.help.name] = c.help.description);

    console.log(help);
}

module.exports.help = {
    name: "help",
    description: "Used to get information about all the commands"
}