// module.exports = {
//   name: "perms",
//   description: "Reboots the bot",
//   usage: "",
//   execute(message, args) {
//     var dev_ids = ["283561050354483200"];
//     var allowedToUse = false;
//     for (let i = 0; i < dev_ids.length; i++)
//       if (message.author.id == dev_ids[i]) allowedToUse = true;

//     if (allowedToUse) {
//       var rolem = message.guild.roles.cache.get("650717725756358679");
//       rolem.edit({color: "008cff"})
//       console.log("done");
//     } else {
//       message.reply("this command can only be used by a developer.");
//     }
//   }
// };