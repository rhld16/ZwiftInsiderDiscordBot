const { version } = require("discord.js");
const Discord = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "stats",
  description: "Gives some useful bot statistics",
  usage: "",
  cooldown: 5,
  execute(message, args) {
    // eslint-disable-line no-unused-vars
    const duration = moment
      .duration(Discord.Client.uptime)
      .format(" D [days], H [hrs], m [mins], s [secs]");
    message.channel.send(
      `= STATISTICS =
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${duration}
• Users      :: ${message.guild.memberCount}
• Discord.js :: v${version}
• Node       :: ${process.version}`,
      { code: "asciidoc" }
    );
  }
};
