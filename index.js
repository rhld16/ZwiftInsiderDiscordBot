const Discord = require("discord.js"),
client = new Discord.Client();
client.once("ready", () => {
  client.user.setPresence({ activity: { type: "PLAYING", name: "Zwift" }});
  console.log("Ready!")});
client.on("message", message => { 
  if (message.channel.type === 'news') {
    message.crosspost().then(() => console.log('Crossposted message')).catch(console.error);
  }
});
const http = require("http"), express = require("express"), app = express();
app.get("/", (request, response) => {response.sendStatus(200)});
app.listen(process.env.PORT);
client.login(process.env.TOKEN);