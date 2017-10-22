module.exports.run = async(bot, message, arguments) => {
    bot.generateInvite("ADMINISTRATOR").then(link => {
        message.channel.send(link)
    });
}

module.exports.help = {
    name: "invite",
    description: "Invite me to your server! :) (bot is still under construction. bot is not being hosted yet. bot might have unfinished commands)"
}