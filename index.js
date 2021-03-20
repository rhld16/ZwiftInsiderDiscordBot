const fs = require('fs');
const { Client, Collection } = require('discord.js');
const client = new Client({ ws: { intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS'] } });
client.commands = new Collection();
client.cooldowns = new Collection();
let prefix = ".";

const commandFiles = fs.readdirSync('./modules').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./modules/${file}`);
	client.commands.set(command.name, command);
}

client.once("ready", () => {
  client.user.setPresence({ activity: { type: "PLAYING", name: "Zwift" }});
  console.log("Ready!");
  let ziguild = client.guilds.cache.get('501890309039325224');
  var interval = setInterval(() => updateStats(ziguild), 120000);
});

client.on("message", message => { 
  if (message.channel.type === 'news') message.crosspost().then(() => console.log('Crossposted message')).catch(console.error);
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  if (!client.commands.has(commandName)) return;
  const command = client.commands.get(commandName);

  const { cooldowns } = client;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

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

client.on("guildMemberRemove", member => updateStats(member.guild));

client.on('guildMemberAdd', member => {
  updateStats(member.guild);
  client.channels.cache.get("739468064138985562").send(`Welcome ${member.user}! Please check <#794589468094496798> for important notes.`)
});

function updateStats(guild) {
  try {
    const format = num => String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,')
    guild.channels.cache.get('650791518147313664').setName(`📊Total Zwifters: ${format(guild.memberCount)}`);
  } catch (e) {
    console.log(e);
  }
}

const http = require("http"), express = require("express"), app = express();
app.get("/", (req, res) => {res.sendStatus(200)});
app.listen(process.env.PORT);
client.login(process.env.TOKEN);