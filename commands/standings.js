const snek = require('snekfetch');
const fs = require("fs");
const discord = require('discord.js')

module.exports.run = async(bot, message, arguments) => {
    let json = snek.get("http://ergast.com/api/f1/current/driverStandings.json").then(r => {
        var standingsObject = r.body

        let driverStandings = standingsObject.MRData.StandingsTable.StandingsLists[0].DriverStandings;

        if (driverStandings > 25) return message.channel.send("I am sorry, but somehow there are more than 25 gridspots,  which means I will not be able to show you the grid... :(")

        let embed = new discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(`Current f1 driver standings: \n`)


        for (let i = 0; i < driverStandings.length; i++) {
            let number;
            if (!driverStandings[i].Driver.permanentNumber) number = "00";
            else number = driverStandings[i].Driver.permanentNumber;
            embed.addField(`${driverStandings[i].Driver.code} (${number}) #${driverStandings[i].position}`,
                `Name: ${driverStandings[i].Driver.givenName} ${driverStandings[i].Driver.familyName} \nDriver for: ${driverStandings[i].Constructors[0].name} \nPoints: ${driverStandings[i].points} \nWins: ${driverStandings[i].wins}`, true)
        }
        embed.setFooter('F1Bot©', bot.user.avatarURL)
            .setThumbnail(bot.user.avatarURL)
            .setTimestamp(new Date())
            .setColor("#ff0000")
        message.channel.send(embed);
    });
}

module.exports.help = {
    name: "standings"
}