module.exports = {
  name: "purge",
  description: "Deletes a certain amount of messages",
  usage: "<number>",
  execute(message, args) {
    var allowedToUse = false;
    if (message.member.hasPermission("MANAGE_CHANNELS")) {
      allowedToUse = true;
    } else {
      return message.reply(
        "this command can only be used by a moderator or higher."
      );
    }
    if (allowedToUse) {
      var numberzero = 0;
      const number = message.content
        .split(" ")
        .slice(1)
        .join(" ");
      if (isNaN(number)) {
        message.reply("That's not a number?!");
        return;
      }
      if (Number(number)) {
        var adding = 1;
      } else {
        var adding = 2;
      }
      var amount = Number(number);
      let newamount = amount + +adding;
      if (newamount > 100) {
        message.reply("Please choose a number less than or equal to 99");
        return;
      }
      let messagecount = newamount.toString();
      message.channel.bulkDelete(messagecount, true);
      // Logging the number of messages deleted on both the channel and console.
      message
        .reply("Total messages deleted including command: " + newamount)
        .then(msg => {
          msg.delete({ timeout: 5000 });
        });
      console.log(
        "Total messages deleted including command: " +
          messagecount
      );
    } else {
      message.reply("this command can only be used by a moderator or higher.");
    }
  }
};
