const Discord = require("discord.js");
const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const reactions = require("./reactions.js");
const stats = require("./stats.js");
const handler = require("./handler.js");

client.once("ready", () => {
  client.user.setPresence({ activity: { type: "PLAYING", name: "Zwift | use !help" }});
  console.log("Ready!")});
client.on("message", message => { handler(message) });
client.on("guildMemberRemove", member => { stats.left(member) });
client.on("guildMemberAdd", member => { stats.new(member) });
client.on("messageReactionAdd", async (reaction, user) => { reactions.add(reaction, user) });
client.on("messageReactionRemove", async (reaction, user) => { reactions.remove(reaction, user) });
const http = require("http"), express = require("express"), app = express();
app.get("/", (request, response) => {response.sendStatus(200)});
app.listen(process.env.PORT);
client.login(process.env.TOKEN);