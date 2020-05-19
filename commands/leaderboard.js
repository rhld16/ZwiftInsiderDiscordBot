const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
const client = new Discord.Client();
module.exports = {
  name: "leaderboard",
  description: "See the top ten zwifters on this discord",
  usage: "",
  execute(message, args) {
    const top10 = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 3;").all(message.guild.id);
    const embed = new Discord.MessageEmbed()
    .setTitle("Leaderboard")
    .setAuthor("Zwift Insider", "https://i2.wp.com/zwiftinsider.com/wp-content/uploads/2017/12/zi-only.jpg?fit=1056%2C1056&ssl=1")
    .setDescription("Our top 10 zwifters!")
    .setColor("f26724");

  for(const data of top10) {
    console.log(data.user)
    embed.addFields({ name: message.guild.members.cache.get(data.user).displayName, value: `${data.points} points (level ${data.level})` });
  }
  return message.channel.send({embed});
  }
};
