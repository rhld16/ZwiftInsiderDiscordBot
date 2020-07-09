const Discord = require("discord.js");
const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});
let tabs = { total: "650791518147313664", users: "650791628990185482" };
exports.left = function (member) {
  try {
    member.guild.members.fetch().then(fetchedMembers => {
      const totalOnline = fetchedMembers.filter(
        member => member.presence.status === "online"
      );
      member.guild.channels.cache
        .get(tabs.total)
        .setName(`📊Total Zwifters: ${member.guild.memberCount}`);
      member.guild.channels.cache
        .get(tabs.users)
        .setName(`📊Zwifters Online: ${totalOnline.size}`);
    });
  } catch (e) {
    console.log(e);
  }
};
exports.new = function (member) {
  member.send(
    "Welcome to the Official Zwift Insider discord server!\n \nPlease check out this article for a detailed explanation on how to use discord.\n \nhttps://zwiftinsider.com/using-discord\n \nThis is a place for Zwift users to come and chat with other users across the globe about various topics of discussion. Check out the text tabs for different topics.\n \nWe also have some voice channels set up for anyone to hop on and chat with other users while Zwifting. A great feature which we hope to promote going forward.\n \nIf you would like to listen to music while zwifting join the 24/7 music voice channel and the Zwift Insider Bot will play you some music.\n \nIf you have any ideas for improvement please send a message to (Bydey)\nPlease also check out Eric Schlange's Zwift Insider Page if you haven't already done so @\n \nhttps://zwiftinsider.com/\n \nAnd last but not least. RIDE ON!"
  );
  const guild = member.guild;
  let left = 4000 - member.guild.memberCount;
  guild.channels.cache
    .find(channel => channel.name === "welcome")
    .send(
      "Welcome " +
        member.displayName +
        `! Please check your Direct Messages for important notes.`
    );
    try {
    member.guild.members.fetch().then(fetchedMembers => {
      const totalOnline = fetchedMembers.filter(
        member => member.presence.status === "online"
      );
      member.guild.channels.cache
        .get(tabs.total)
        .setName(`📊Total Zwifters: ${member.guild.memberCount}`);
      member.guild.channels.cache
        .get(tabs.users)
        .setName(`📊Zwifters Online: ${totalOnline.size}`);
    });
  } catch (e) {
    console.log(e);
  }
};
