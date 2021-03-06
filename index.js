const discord = require('discord.js');
const bot = new discord.Client();
const settings = require('./settings.json');
const fs = require('fs');

const prefix = settings.prefix;
const token = settings.token;

bot.prefix = prefix;

bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) {
        console.log("No commands to load!");
        return;
    }
    console.log(`Loading ${jsfiles.length} commands!`);
    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${i + 1}: ${f} loaded`);
        bot.commands.set(props.help.name, props);
    });
});

bot.on("ready", async() => {
    console.log(`${bot.user.username} is ready to party!`);
    bot.setInterval(function() {
        bot.user.setGame(`${prefix}help | Playing in ${bot.guilds.size} guilds`)
    }, 300000)
});

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let arguments = messageArray.slice(1);

    if (!command.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length));
    if (cmd) cmd.run(bot, message, arguments);
});

bot.login(token);

process.on('unhandledRejection', error => {
    console.error(`Uncaught Promise Error: \n${error.stack}`);
});