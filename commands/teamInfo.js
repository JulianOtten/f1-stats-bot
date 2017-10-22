const snek = require('snekfetch');
const fs = require("fs");
const discord = require('discord.js')

module.exports.run = async(bot, message, arguments) => {
    if (!arguments[0]) return message.channel.send('Please provide a team you want information on!');
    try {
        //http://ergast.com/api/f1/current/constructors/ferrari/drivers.json
        //http://ergast.com/api/f1/constructors/mclaren.json
        let drivers = await snek.get(`http://ergast.com/api/f1/current/constructors/${arguments[0]}/drivers.json`);
        let team = await snek.get(`http://ergast.com/api/f1/constructors/${arguments[0]}.json`);

        if (!drivers || !team) return message.channel.send("Sorry, something went wrong when requesting info for that team, please make sure you spelled the name correctly (not case sensitive)");

        let driversObject = drivers.body;
        let teamObject = team.body;

        let driverInfo = driversObject.MRData.DriverTable.Drivers;
        let teamInfo = teamObject.MRData.ConstructorTable.Constructors;

        let embed = new discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(`Team: ${teamInfo[0].name}`)
            .addField(`Nationality`, teamInfo[0].nationality, true)
            .addField(`Wikipedia:`, `[Read More](${teamInfo[0].url})`, true)

        for (let i = 0; i < driverInfo.length; i++) {
            embed.addField(`${driverInfo[i].code} (${driverInfo[i].permanentNumber})`, `Name: [${driverInfo[i].givenName} ${driverInfo[i].familyName}](${driverInfo[i].url}) \nDate of Birth: ${driverInfo[i].dateOfBirth} \nNationality: ${driverInfo[i].nationality}`, true)
        }

        embed.setFooter('F1Bot©', bot.user.avatarURL)
            .setThumbnail(bot.user.avatarURL)
            .setTimestamp(new Date())
            .setColor("#ff0000")
        message.channel.send(embed);

    } catch (e) {
        console.log(e);
    }
}
module.exports.help = {
    name: "teamInfo",
    description: `Get some really basic information about a team. usage: f1!teamInfo \`ferrari\``
}