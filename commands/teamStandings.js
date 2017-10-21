const snek = require('snekfetch');
const fs = require("fs");
const discord = require('discord.js')

module.exports.run = async(bot, message, arguments) => {
    let json = snek.get("http://ergast.com/api/f1/current/constructorStandings.json").then(r => {
        var standingsObject = r.body

        let driverStandings = standingsObject.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;

        if (driverStandings.length > 25) return message.channel.send("I am sorry, but somehow there are more than 25 teams,  which means I will not be able to show you the results... :(")

        let embed = new discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(`:checkered_flag:Current f1 team standings: \n`)

        for (let i = 0; i < driverStandings.length; i++) {
            embed.addField(`${driverStandings[i].Constructor.constructorId} #${driverStandings[i].position}`,
                `Name: ${driverStandings[i].Constructor.name} \nNationality: ${driverStandings[i].Constructor.nationality} \nPoints: ${driverStandings[i].points} \nWins: ${driverStandings[i].wins}`, true)
        }
        embed.setFooter('F1Bot©', bot.user.avatarURL)
            .setThumbnail(bot.user.avatarURL)
            .setTimestamp(new Date())
            .setColor("#ff0000")
        message.channel.send(embed);
    });
}

module.exports.help = {
    name: "teamStandings"
}