const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
const client = new Discord.Client();
module.exports = {
  name: "points",
  description: "See your points and level",
  usage: "",
  execute(message, args) {
    let score;
    client.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
    score = client.getScore.get(message.author.id, message.guild.id);
    return message.reply(`You currently have ${score.points} points and are level ${score.level}!`);
  }
};
