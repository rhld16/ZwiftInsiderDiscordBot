const Discord = require("discord.js"),
  ytdl = require("ytdl-core"),
  client = new Discord.Client();
exports.player =  function() {
  const musich = client.channels.cache.get('718449584371662880');
  musich.leave();
  console.log("bot ready");
  play(musich);
  client.on("message", e => {
    if (e.content.startsWith(".")) {
      let n = e.content.substring(1).split(" ")[0],
      o = commands[n];
      o.process(e);
    }
  });
const commands = {
  ping: {
    process: function(e) {
      e.channel.send({
        embed: { description: "🏓 pong! my ping is " + client.ws.ping + "ms" }
      });
    }
  },
  join: {
    process: function(e) {
      play();
    }
  },
  reboot: {
    process: function(e) {
      leave(),
      console.log("rebooting"), 
      process.exit(0);
    }
  }
};
function play() {
  var musich = client.channels.cache.get(chanid);
  musich.join().then(n => {
    console.log("joined"),
      n
        .play(ytdl("https://www.youtube.com/watch?v=36YnV9STBqc"), {
          filter: "audioonly"
        })
        .on("finish", () => {
          leave(), play(), console.log("repeat");
        });
  });
}
  setInterval(function() {
    process.exit(0);
  }, 21600000);
}
