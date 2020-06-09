const Discord = require("discord.js");
const client = new Discord.Client();
const bruh = Date.now();
module.exports = {
  name: "stats",
  description: "Gives some useful bot statistics",
  usage: "",
  execute(message, args) {
  var ms = Date.now()-bruh
  var s = Math.floor(ms / 1000);
  var m = Math.floor(s / 60);
  s = s % 60;
  var h = Math.floor(m / 60);
  m = m % 60;
  var d = Math.floor(h / 24);
  h = h % 24;
    message.channel.send(
      `= STATISTICS =
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Users      :: ${message.guild.memberCount}
• Uptime     :: ${d} Days ${h} Hours ${m} Minutes ${s} Seconds
• Discord.js :: v12.2.0
• Node       :: ${process.version}`,
      { code: "asciidoc" }
    );
  }
};
