const sendTag = require('../tag.js');
module.exports = {
	name: 'discord',
	description: 'discord!',
  cooldown: 5,
	execute(message, args) {
    sendTag(message.channel,
      "Using Discord",
      "Here is a simple guide on Zwift Insider on how to use Discord",
      "http://webcamstartup.com/wp-content/uploads/2018/04/discord-logo.jpg",
      "https://support.discord.com/hc/en-us/articles/360045138571-Beginner-s-Guide-to-Discord");
	},
};