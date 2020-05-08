module.exports = {
  name: "say",
  description: "Announces this message in the same channel",
  usage: "<announcment>",
  execute(message, args) {
   var allowedToUse = false;
    var dev_ids = ["283561050354483200", "519390684977954826"];
    if(message.author.id=dev_ids) {
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
