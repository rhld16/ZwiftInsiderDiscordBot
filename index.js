const { Client } = require('discord.js');
const client = new Client({ ws: { intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS'] } });
let tab = '650791518147313664';
client.once("ready", () => {
  client.user.setPresence({ activity: { type: "PLAYING", name: "Zwift" }});
  console.log("Ready!");
  let ziguild = client.guilds.cache.get('501890309039325224');
  var interval = setInterval(() => updateStats(ziguild), 120000);
});
client.on("message", message => { 
  let prefix = ".";
  if (message.channel.type === 'news') message.crosspost().then(() => console.log('Crossposted message')).catch(console.error);
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift();
  // TAGS
  if (command == "zwift")
    sendTag(message.channel,
      "Zwift",
      "Zwift is a massively multiplayer online cycling and running physical training program that enables users to interact, train and compete in a virtual world.",
      "https://yt3.ggpht.com/ytc/AAUvwnjfB9nd1KlJmdHPJaW0NugDoz0N95rPRDibiExf_Q=s900-c-k-c0x00ffffff-no-rj",
      "https://www.zwift.com/");
  if (command == "zi")
    sendTag(message.channel,
      "Zwift Insider",
      "Zwift Insider is the community-driven source for all things Zwift. The team of contributors delivers an unmatched breadth and depth of content including Zwift news, hacks, training tips, and more.",
      "https://pbs.twimg.com/profile_images/943153414292279297/Xm2M38U4_400x400.jpg",
      "https://zwiftinsider.com/");
  if (command == "discord")
    sendTag(message.channel,
      "Using Discord",
      "Here is a simple guide on Zwift Insider on how to use Discord",
      "http://webcamstartup.com/wp-content/uploads/2018/04/discord-logo.jpg",
      "https://zwiftinsider.com/using-discord/");
  if (command == "discordguide")
    sendTag(messgae.channel,
      "Discord Guide",
      "Here is Discord's getting started guide",
      "http://webcamstartup.com/wp-content/uploads/2018/04/discord-logo.jpg",
      "https://support.discord.com/hc/en-us/articles/360045138571-Beginner-s-Guide-to-Discord#h_9de92bc2-3bca-459f-8efd-e1e2739ca4f4")
});
client.on("guildMemberRemove", member => updateStats(member.guild));
client.on('guildMemberAdd', member => {
  updateStats(member.guild);
  client.channels.cache.get("739468064138985562").send(`Welcome ${member.user}! Please check <#794589468094496798> for important notes.`)
});
function updateStats(guild) {
  try {
    const format = num => String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,')
    guild.channels.cache.get(tab).setName(`📊Total Zwifters: ${format(guild.memberCount)}`);
  } catch (e) {
    console.log(e);
  }
}
function sendTag(channel, title, body, img, link) {
  const embed = {
    "title": title,
    "description": body,
    "url": link,
    "color": 3460666,
    "thumbnail": {
      "url": img
    }
  };
  channel.send({ embed });
}
const http = require("http"), express = require("express"), app = express();
app.get("/", (req, res) => {res.sendStatus(200)});
app.listen(process.env.PORT);
client.login(process.env.TOKEN);