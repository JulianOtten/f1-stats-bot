const snek = require('snekfetch');
const fs = require("fs");
const discord = require('discord.js')

module.exports.run = async(bot, message, arguments) => {
    let json = snek.get("http://ergast.com/api/f1/current/constructorStandings.json").then(r => {
        var standingsObject = r.body
            //http://ergast.com/api/f1/current/constructors/ferrari/drivers.json
    });
}
module.exports.help = {
    name: "teamStandings"
}