const Discord = require("discord.js");
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"]
});
const moment = require("moment");
const fs = require("fs");
module.exports = {
  name: "graph",
  description: "Hopefully makes a graph of member count",
  usage: "",
  execute(message, args) {
    message.reply("yes");
    var joins = [];
    var str = [];
    var list = [];
    message.guild.members.fetch().then(
      value => {
        value.forEach(user => myFunction(user.joinedTimestamp));
        function myFunction(d) {
          var date = new Date(d);
          var formattedDate =date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate();
          joins.push(formattedDate);
          joins = joins.sort();
              fs.writeFile("Output.txt", JSON.stringify(joins), function(err) {
            console.error;
          });
      }},
      reason => {
        console.error;
      }
    );
    message.reply("done");
  }
};
