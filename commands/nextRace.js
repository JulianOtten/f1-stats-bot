const snek = require('snekfetch');
const fs = require("fs");
const discord = require('discord.js')

module.exports.run = async(bot, message, arguments) => {
    let json = snek.get("http://ergast.com/api/f1/current/next.json").then(r => {
        let body = r.body;
        let races = body.MRData.RaceTable.Races[0];

        let dateString = races.date.split("-")
        let year = Number(dateString[0])
        let month = Number(dateString[1]);
        let day = Number(dateString[2]);
        let timeString = races.time.split(":")
        let hour = Number(timeString[0]);
        let minute = Number(timeString[1]);

        let embed = new discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(`${races.raceName}`)
            .addField(`Circuit Name:`, races.Circuit.circuitName, true)
            .addField('Location:', `${races.Circuit.Location.locality} - ${races.Circuit.Location.country}`, true)
            .addField('Start:', `Sun ${day}-${month}-${year} | ${hour}:00 GMT`)
            .setFooter('F1Bot©', bot.user.avatarURL)
            .setThumbnail(bot.user.avatarURL)
            .setTimestamp(new Date())
            .setColor("#ff0000")
        message.channel.send(embed)
    });
}

module.exports.help = {
    name: "nextRace",
    description: "Get information on when and where the next formula one race will be"
}