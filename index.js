const Discord = require("discord.js"),
client = new Discord.Client();
let tab = '650791518147313664';
client.once("ready", () => {
  client.user.setPresence({ activity: { type: "PLAYING", name: "Zwift" }});
  console.log("Ready!");
  let ziguild = client.guilds.cache.get('501890309039325224');
  var interval = setInterval(() => updateStats(ziguild), 300000);
});
client.on("message", message => { 
  if (message.channel.type === 'news') message.crosspost().then(() => console.log('Crossposted message')).catch(console.error);
});
client.on("guildMemberRemove", member => updateStats(member.guild));
client.on("guildMemberAdd", member => updateStats(member.guild));
function updateStats(guild) {
  try {
    const format = num => String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,')
    guild.channels.cache.get(tab).setName(`📊Total Zwifters: ${format(guild.members.size)}`);
  } catch (e) {
    console.log(e);
  }
}
const http = require("http"), express = require("express"), app = express();
app.get("/", (req, res) => {res.sendStatus(200)});
app.listen(process.env.PORT);
client.login(process.env.TOKEN);