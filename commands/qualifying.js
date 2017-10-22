const snek = require('snekfetch');
const fs = require("fs");
const discord = require('discord.js')

module.exports.run = async(bot, message, arguments) => {
    let json = snek.get("http://ergast.com/api/f1/current/next/qualifying.json").then(r => {
        var response = r.body;

        let circuit = response.MRData.RaceTable.Races[0];
        let results = response.MRData.RaceTable.Races[0].QualifyingResults;

        let embed = new discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(`:checkered_flag:Current qualifying results for ${circuit.raceName} (${circuit.season}): \n`)

        for (let i = 0; i < results.length; i++) {

            let number;
            if (!results[i].Driver.permanentNumber) number = "00";
            else number = results[i].Driver.permanentNumber;

            let driverTimes
            if (results[i].position >= 15) {
                driverTimes = `Q1: ${results[i].Q1}`
            } else if (results[i].position >= 10) {
                driverTimes = `Q1: ${results[i].Q1}\nQ2: ${results[i].Q2}`
            } else {
                driverTimes = `Q1: ${results[i].Q1}\nQ2: ${results[i].Q2}\nQ3: ${results[i].Q3}`
            }

            embed.addField(`${results[i].Driver.code} (${number}) #${results[i].position}`,
                `Name: ${results[i].Driver.givenName} ${results[i].Driver.familyName} \nDriver for: ${results[i].Constructor.name} \nTimes:\n${driverTimes}`, true)
        }
        embed.setFooter('F1Bot©', bot.user.avatarURL)
            .setThumbnail(bot.user.avatarURL)
            .setTimestamp(new Date())
            .setColor("#ff0000")
        message.channel.send(embed);
    });
}

module.exports.help = {
    name: "qualifying"
}