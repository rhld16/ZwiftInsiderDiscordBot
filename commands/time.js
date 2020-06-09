module.exports = {
  name: "time",
  description: "What's the time?",
  usage: "",
  execute(message, args) {
    var time = new Date();
    message.reply(`${time}`);
  }
};
