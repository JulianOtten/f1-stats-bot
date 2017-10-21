const snek = require('snekfetch');
const fs = require("fs");

module.exports.run = async(bot, message, arguments, discord) => {
    let json = snek.get("http://ergast.com/api/f1/current/driverStandings.json").then(r => {
        var standingsObject = JSON.stringify(r.body, null, 4);

        let driverStandings = standingsObject.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        console.log(driverStandings);


    });
}

module.exports.help = {
    name: "standings"
}