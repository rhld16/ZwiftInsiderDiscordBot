const Discord = require("discord.js"),
client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]}),
reactions = require("./reactions.js"),
stats = require("./stats.js"),
handler = require("./handler.js"),
ytdl = require("ytdl-core"),
chan = '718449584371662880';
function play() {
  var musich = client.channels.cache.get(chan);
  musich.join().then(n => {
    console.log("joined"),
      n.play(ytdl("https://www.youtube.com/watch?v=36YnV9STBqc"), {filter: "audioonly"})
        .on("finish", () => {
          leave(), play(), console.log("repeat");
        })
        .on("error", () => {
          leave(), play(), console.log("fixed error ;)");
        });
  });
}
function leave() {
  var musich = client.channels.cache.get(chan);
  console.log("leaving");
  musich.leave();
}

client.once("ready", () => {
  client.user.setPresence({ activity: { type: "PLAYING", name: "Zwift | use !help" }});
  const musich = client.channels.cache.get(chan);
  play(musich);
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
