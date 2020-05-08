module.exports = {
  name: "shrug",
  description: "¯\\\_(ツ)\_/¯",
  usage: "<message>",
  execute(message, args) {
    message.channel.send(
      `${message.content
        .split(" ")
        .slice(1)
        .join(" ")} ¯\\\_(ツ)\_/¯`
    );
    message.delete();
  }
};
