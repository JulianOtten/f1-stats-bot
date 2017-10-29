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

        let date = new Date();
        date.setFullYear(year);
        date.setMonth(month);
        date.setDate(day);
        date.setHours(hour);
        date.setMinutes(minute);
        date.setSeconds(0, 0);

        let raceTime;
        if (date.getHours() < 10) raceTime = `0${date.getHours()}`;
        else raceTime = date.getHours();

        var ml = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

        let embed = new discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(`${races.raceName}`)
            .addField(`Circuit Name:`, races.Circuit.circuitName, true)
            .addField('Location:', `${races.Circuit.Location.locality} - ${races.Circuit.Location.country}`, true)
            .addField('Start:', `Sun ${date.getDate()} ${ml[date.getMonth() - 1]} ${date.getFullYear()} | ${raceTime}:00 GMT`)
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