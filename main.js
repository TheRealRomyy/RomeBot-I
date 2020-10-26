// Import discord.js
const Discord = require("discord.js");

// Import my file "config.json"
const config = require("./config.json");

// Create a client with Discord.js
const client = new Discord.Client();

// Say in console "Starting..."
console.log("Starting...");

// Get the event "ready"
client.on("ready", () => {
    // Say in console "Ready !"
    console.log("Ready !");
});

// Get the event "message"
client.on("message", async message => {

    // Check if the bot is mentioned
    if(message.content === `<@!${client.user.id}>`) {

        // Send in the channel "Hello" with the name of the user (with discord markdown)
        message.channel.send("Hello **" + message.author.tag + "** !");

    };

    // Check if the message not start with the prefix : "?" who is in config
    if(!message.content.startsWith(config.prefix)) return;

    // Check if the message author is a bot
    if(message.author.bot) return;

    // Check if the channel type is not DM
    if(message.channel.type === "dm") return;
    
    // Get the args and the commandName
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Check if the name of the command is ping
    if(command === "ping") {

        // Send to the channel of the message "Pong !" with the bot's ping
        message.channel.send("Pong ! ( " + client.ws.ping + "ms )");

    } else if(command === "args") {

        // If there is no args 0 send to the channel : "There is no args !"
        if(!args[0]) return message.channel.send("There is no args !")

        /* Send to the channel : "Your first arg is:" with the first args 
        and "Your args were :" with all args (with the discord markdown) */
        message.channel.send("__Your first arg is:__ **" + args[0] + "** \n__Your args were:__ **" + args.join(" ") + "**");


    } else {
        // Else stop the code
        return;
    };
});

// Connect this client with the token in the config file
client.login(config.token);