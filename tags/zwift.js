const sendTag = require('../tag.js');
module.exports = {
	name: 'zwift',
	execute(message, args) {
    sendTag(message.channel,
      "Zwift",
      "Zwift is a massively multiplayer online cycling and running physical training program that enables users to interact, train and compete in a virtual world.",
      "https://yt3.ggpht.com/ytc/AAUvwnjfB9nd1KlJmdHPJaW0NugDoz0N95rPRDibiExf_Q=s900-c-k-c0x00ffffff-no-rj",
      "https://www.zwift.com/");
	},
};