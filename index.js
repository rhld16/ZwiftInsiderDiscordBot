const Discord = require("discord.js"),
client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]}),
reactions = require("./reactions.js"),
stats = require("./stats.js"),
handler = require("./handler.js"),
ytdl = require("ytdl-core-discord"),
chan = '718449584371662880';
async function play() {
   const c = await client.channels.cache.get(chan).join();
  console.log("joined");
  const d = c.play(await ytdl("https://www.youtube.com/watch?v=36YnV9STBqc"), { type: 'opus' });
  d.on('finish', () => {
	console.log('finish!'),
    c.disconnect();
    play();
  });
}
client.once("ready", () => {
  client.user.setPresence({ activity: { type: "PLAYING", name: "Zwift | use !help" }});
  console.log("Ready!")});
client.on("message", message => { handler(message) });
client.on("guildMemberRemove", member => { stats.left(member) });
client.on("guildMemberAdd", member => { stats.new(member) });
client.on("messageReactionAdd", async (reaction, user) => { reactions.add(reaction, user) });
client.on("messageReactionRemove", async (reaction, user) => { reactions.remove(reaction, user) });
client.on('voiceStateUpdate', (oldMember, newMember) => {
	console.log('change');
  let newUserChannel = newMember.channel
  let oldUserChannel = oldMember.channel
  if (oldUserChannel === null) {
		play();
	} else if (newUserChannel === null && client.channels.cache.get(chan).size < 2) {
		client.channels.cache.get(chan).leave();
	}
});
const http = require("http"), express = require("express"), app = express();
app.get("/", (request, response) => {response.sendStatus(200)});
app.listen(process.env.PORT);
client.login(process.env.TOKEN);
