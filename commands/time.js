module.exports = {
  name: "time",
  description: "What's the time Mr Wolf?",
  usage: "",
  execute(message, args) {
    var time = new Date();
    message.reply(`${time}`);
  }
};
