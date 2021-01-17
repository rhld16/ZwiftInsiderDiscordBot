const Discord = require("discord.js"),
client = new Discord.Client();
let tab = "650791518147313664"
client.once("ready", () => {
  client.user.setPresence({ activity: { type: "PLAYING", name: "Zwift" }});
  console.log("Ready!")});
client.on("message", message => { 
  if (message.channel.type === 'news') {
    message.crosspost().then(() => console.log('Crossposted message')).catch(console.error);
  }
});
client.on("guildMemberRemove", member => updateStats());
client.on("guildMemberAdd", member => updateStats());
function updateStats() {
  try {
    member.guild.channels.cache.get(tab).setName(`📊Total Zwifters: ${member.guild.memberCount}`);
  } catch (e) {
    console.log(e);
  }
}
const http = require("http"), express = require("express"), app = express();
app.get("/", (request, response) => {response.sendStatus(200)});
app.listen(process.env.PORT);
client.login(process.env.TOKEN);