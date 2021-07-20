const fs = require('fs');
const { Client, Collection } = require('discord.js');
const AntiSpam = require('discord-anti-spam');
const antiSpam = new AntiSpam({
	warnThreshold: 3, // Amount of messages sent in a row that will cause a warning.
	muteThreshold: 4, // Amount of messages sent in a row that will cause a mute
	kickThreshold: 7, // Amount of messages sent in a row that will cause a kick.
	banThreshold: 10, // Amount of messages sent in a row that will cause a ban.
	maxInterval: 2000, // Amount of time (in milliseconds) in which messages are considered spam.
	maxDuplicatesWarning: 6, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesKick: 10, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesBan: 12, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesMute: 8, // Ammount of duplicate message that trigger a mute.
	ignoredPermissions: [ 'ADMINISTRATOR'], // Bypass users with any of these permissions.
	ignoredMembers: [], // Array of member IDs that are ignored.
	muteRoleName: "Muted", // Name or ID of the role that will be added to users if they got muted.
	removeMessages: true // If the bot should remove all the spam messages when taking action on a user!
});
const client = new Client({ ws: { intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS'] } });
client.commands = new Collection();
client.cooldowns = new Collection();

const commandFiles = fs.readdirSync('./tags').filter(file => file.endsWith('.js'));
for (let file of commandFiles) {
  const command = require(`./tags/${file}`);
  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({ activity: { type: "PLAYING", name: "Zwift" } });
  var ziguild = client.guilds.cache.get('501890309039325224');
  var interval = setInterval(() => updateStats(ziguild), 21600000);
});

client.on("message", message => {
  if (message.channel.type === 'news') message.crosspost().then(() => console.log('Crossposted message')).catch(console.error);
  if (message.author.bot) return;
  if (!message.content.startsWith(process.env.PREFIX)) return;
  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  if (!client.commands.has(commandName)) return;
  const command = client.commands.get(commandName);

  const { cooldowns } = client;

  if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Collection());

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 5) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('There was an error trying to execute that command!');
  }
});

client.on('message', message => antiSpam.message(message));

client.on('guildMemberAdd', member => {
  client.channels.cache.get("739468064138985562")
    .send(`Welcome ${member.user}! Please check <#794589468094496798> for important notes.`);
});

function updateStats(guild) {
  try {
    const format = num => String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,')
    guild.channels.cache.get('650791518147313664').setName(`🚴Zwifters: ${format(guild.memberCount)}`);
  } catch (e) {
    console.log(e);
  }
}

const http = require("http"), express = require("express"), app = express();
app.get("/", (req, res) => { res.sendStatus(200) });
app.listen(process.env.PORT);
client.login(process.env.TOKEN);