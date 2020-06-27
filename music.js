const Discord = require("discord.js"),
  ytdl = require("ytdl-core"),
  client = new Discord.Client(),
  chan = '718449584371662880',
  musich = client.channels.cache.get(chan);
exports.player = function() {
  console.log('music');
  play(musich);
function play() {
  var musich = client.channels.cache.get(chan);
  musich.join().then(n => {
    console.log("joined"),
      n.play(ytdl("https://www.youtube.com/watch?v=36YnV9STBqc"), {filter: "audioonly"})
        .on("finish", () => {
          leave(), play(), console.log("repeat");
        });
  });
}
function leave() {
  var musich = client.channels.cache.get(chan);
  console.log("leaving");
  musich.leave();
}
  setInterval(function() {
    process.exit(0);
  }, 21600000);
}
