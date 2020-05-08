module.exports = {
  name: "say",
  description: "Announces this message in the same channel",
  usage: "<announcment>",
  execute(message, args) {
   var allowedToUse = false;
    if(message.author.id=283561050354483200) {
      allowedToUse = true;
    } else {
      return message.reply("this command can only be used by a moderator or higher.");
    }
    if (allowedToUse) {
      const sayMessage = args.join(" ");
      message.delete();
      message.channel.send(sayMessage);
    } else {
      message.reply("this command can only be used by a moderator.");
    }
  }
};
