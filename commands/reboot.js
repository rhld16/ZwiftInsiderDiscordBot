const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};
module.exports = {
  name: "reboot",
  description: "Reboots the bot",
  usage: "",
  execute(message, args) {
    var dev_ids = ["283561050354483200", "519390684977954826"];
    var allowedToUse = false;
    for (let i = 0; i < dev_ids.length; i++)
      if (message.author.id == dev_ids[i]) allowedToUse = true;

    if (allowedToUse) {
      console.log("Rebooting");
      message.reply("Goodnight");
      sleep(500).then(() => {
        process.exit(0);
      });
    } else {
      message.reply("this command can only be used by a developer.");
    }
  }
};
