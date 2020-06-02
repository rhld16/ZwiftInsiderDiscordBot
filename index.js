// Loading the things I need in this file:
const fs = require("fs");
const Discord = require("discord.js");
const DiscordRSS = require("discord.rss");
const prefix = "!";
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"]
});
client.commands = new Discord.Collection();
client.music = require("discordjs-music-plugin");
const override = {
  suppressLogLevels: ["silent"],
  bot: { prefix: "!" },
  database: { uri: "./rss" },
  feeds: { refreshTimeMinutes: 30 }
};
const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}
client.once("ready", () => {
  client.user.setPresence({
    activity: { type: "PLAYING", name: "Zwift | use !help" }
  });
  console.log("Ready!");
});
client.on("message", message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName) || client.commands.find(
      cmd => cmd.aliases && cmd.aliases.includes(commandName));
  if (!command) return;
  if (command.guildOnly && message.channel.type !== "text") {
    return message.reply("I can't execute that command inside DMs!");
  }
  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }
  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});

let tabs = {
  total: "650791518147313664",
  users: "650791628990185482"
};
client.on("guildMemberRemove", member => {
  try {
    member.guild.members.fetch().then(fetchedMembers => {
      const totalOnline = fetchedMembers.filter(
        member => member.presence.status === "online"
      );
      member.guild.channels.cache
        .get(tabs.total)
        .setName(`📊Total Zwifters: ${member.guild.memberCount}`); // You can change this text, but still keep ${guild.memberCount}, as it defines total members.
      member.guild.channels.cache
        .get(tabs.users)
        .setName(`📊Zwifters Online: ${totalOnline.size}`);
    });
  } catch (e) {
    console.log(e);
  }
});
client.on("guildMemberAdd", member => {
  try {
    member.guild.members.fetch().then(fetchedMembers => {
      const totalOnline = fetchedMembers.filter(
        member => member.presence.status === "online"
      );
      member.guild.channels.cache
        .get(tabs.total)
        .setName(`📊Total Zwifters: ${member.guild.memberCount}`); // You can change this text, but still keep ${guild.memberCount}, as it defines total members.
      member.guild.channels.cache
        .get(tabs.users)
        .setName(`📊Zwifters Online: ${totalOnline.size}`);
    });
  } catch (e) {
    console.log(e);
  }

  member.send(
    "Welcome to the Official Zwift Insider discord server!\n \nPlease check out this article for a detailed explanation on how to use discord.\n \nhttps://zwiftinsider.com/using-discord\n \nThis is a place for Zwift users to come and chat with other users across the globe about various topics of discussion. Check out the text tabs for different topics.\n \nWe also have some voice channels set up for anyone to hop on and chat with other users while Zwifting. A great feature which we hope to promote going forward.\n \nIf you want to play music in the voice channel go into the #music-requests channel and type !play (song name & artist) NOTE! You need to be in the voice channel for this to work.\n \nIf you have any ideas for improvement please send a message to (Bydey)\nPlease also check out Eric Schlange's Zwift Insider Page if you haven't already done so @\n \nhttps://zwiftinsider.com/\n \nAnd last but not least. RIDE ON!"
  );
  const guild = member.guild;
  let left = 4000 - member.guild.memberCount;
  guild.channels.cache
    .find(channel => channel.name === "welcome")
    .send(
      "Welcome " +
        member.displayName +
        `! Please check your Direct Messages for important notes.`
    );
});
//Add/remove news role by reaction
client.on("messageReactionAdd", async (reaction, user) => {
  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch (error) {
      console.log("Something went wrong when fetching the message: ", error);
      return;
    }
  }
  if (reaction.message.id === "691294632499347487") {
    const guild = reaction.message.guild;

    const memberWhoReacted = guild.members.cache.find(
      member => member.id === user.id
    );

    memberWhoReacted.roles.add("691291967648301076");
    console.log(
      `${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`
    );
  }
});
client.on("messageReactionRemove", async (reaction, user) => {
  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch (error) {
      console.log("Something went wrong when fetching the message: ", error);
      return;
    }
  }
  if (reaction.message.id === "691294632499347487") {
    const guild = reaction.message.guild;
    const memberWhoReacted = guild.members.cache.find(
      member => member.id === user.id
    );
    memberWhoReacted.roles.remove("691291967648301076");
    console.log(
      `${reaction.message.author}'s message "${reaction.message.content}" lost a reaction!`
    );
  }
});
// Pinging it to stay on
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);

client.music.start(client, {
  youtubeKey: process.env.YT,
  logging: false,
  channelWhitelist: ['647173105105764362'],
  help: {
    enabled: false,
    exclude: true
  }
});

const drss = new DiscordRSS.Client(override);
drss.login(process.env.TOKEN);
client.login(process.env.TOKEN);
