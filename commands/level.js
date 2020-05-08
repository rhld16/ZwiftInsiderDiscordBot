/*const fs = require("fs");
let db = JSON.parse(fs.readFileSync("../database.json", "utf8"));
module.exports = {
  name: "level",
  description: "See your XP and level",
  execute(message, args) {
    let userInfo = db[message.author.id];
    let member = message.mentions.members.first();
    if (!member)
      return message.channel.send({
        embed: {
          color: 0x4286f4,
          fields: [("Level", userInfo.level), ("XP", userInfo.xp + "/100")]
        }
      });
    let memberInfo = db[member.id];
    message.channel.send({
      embed: {
        color: 0x4286f4,
        fields: [("Level", memberInfo.level), ("XP", memberInfo.xp + "/100")]
      }
    });
  }
};
*/