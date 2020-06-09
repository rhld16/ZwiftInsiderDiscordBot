const Discord = require("discord.js");
const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});
exports.add = function(reaction, user) {
  if (reaction.partial) {
    try {
      reaction.fetch();
    } catch (error) {
      console.log("Something went wrong when fetching the message: ", error);
      return;
    }};
  if (reaction.message.id === "691294632499347487") {
    const guild = reaction.message.guild;
    const memberWhoReacted = guild.members.cache.find(member => member.id === user.id);
    memberWhoReacted.roles.add("691291967648301076");
    console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
  }};
exports.remove = function (reaction, user) {
  if (reaction.partial) {
    try { reaction.fetch();
    } catch (error) {
      console.log("Something went wrong when fetching the message: ", error);
      return }
  };
  if (reaction.message.id === "691294632499347487") {
    const guild = reaction.message.guild;
    const memberWhoReacted = guild.members.cache.find(member => member.id === user.id);
    memberWhoReacted.roles.remove("691291967648301076");
    console.log(`${reaction.message.author}'s message "${reaction.message.content}" lost a reaction!`)}};