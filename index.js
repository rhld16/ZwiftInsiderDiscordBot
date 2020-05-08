// Loading the things I need in this file:
const fs = require("fs");
const path = require("path");
const Discord = require("discord.js");
const DiscordRSS = require("discord.rss");
const prefix = "!";
//const Database = require("better-sqlite3");
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"]
});
const cooldowns = new Discord.Collection();
client.commands = new Discord.Collection();
client.music = require("discordjs-music-plugin");
const override = {
  suppressLogLevels: ["info"],
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
  //  const db = new Database("xplevel.db", {});
  /*const createTable = db.prepare(
    `CREATE TABLE IF NOT EXISTS xplev (discord_id, xp Int, level Int)`
  );
  createTable.run();*/
  /* const row = db
    .prepare(`SELECT * FROM xplev WHERE discord_id = ?`)
    .get(message.author.id);
  if (!row) {
    const creatediscordid = db.prepare(
      `INSERT INTO xplev (discord_id, xp, level) VALUES (?, ?, ?)`
    );
    creatediscordid.run(`${message.author.id}`, 0, 0);
    if (!db[message.author.id])
      db[message.author.id] = {
        xp: 0,
        level: 0
      };
  }
  db.prepare(`UPDATE xplev SET xp = xp +1 WHERE discord_id=?`).run(
    message.author.id
  );
  let xplevelup = db
    .prepare(`SELECT xp FROM xplev WHERE discord_id = ?`)
    .get(message.author.id);
  if (xplevelup == "{ xp: 24 }") {
    const resetxp = db
      .prepare(`UPDATE xplev SET xp = 0 WHERE discord_id=?`)
      .run(message.author.id);
    let xplevelup = db
      .prepare(`SELECT xp FROM xplev WHERE discord_id = ?`)
      .get(message.author.id);
    console.log(xplevelup);
    const levelup = db
      .prepare(`UPDATE xplev SET level = level +1 WHERE discord_id=?`)
      .run(message.author.id);
    let newlevel = db
      .prepare(`SELECT level FROM xplev WHERE discord_id = ?`)
      .get(message.author.id);
    console.log(newlevel);
    message.reply("Congrats");
  }
  db[message.author.id].xp++;
  let userInfo = db[message.author.id];
  if (userInfo.xp > 100) {
    userInfo.level++;
    userInfo.xp = 0;
    message.reply("Congratulations, you level up");
  }
  fs.writeFile("./database.json", JSON.stringify(db), x => {
    if (x) console.error(x);
  });*/
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      cmd => cmd.aliases && cmd.aliases.includes(commandName)
    );

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

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(
          1
        )} more second(s) before reusing the \`${command.name}\` command.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

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
  let threeleft = 3000 - member.guild.memberCount;
  guild.channels.cache
    .find(channel => channel.name === "welcome")
    .send(
      "Welcome " +
        member.displayName +
        "! Please check your Direct Messages for important notes."
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
  logging: false
});

const drss = new DiscordRSS.Client(override);
drss.login(process.env.TOKEN);
client.login(process.env.TOKEN);
