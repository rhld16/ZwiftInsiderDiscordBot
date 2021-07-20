const sendTag = require('../tag.js');
module.exports = {
	name: 'zi',
	execute(message, args) {
    sendTag(message.channel,
      "Zwift Insider",
      "Zwift Insider is the community-driven source for all things Zwift. The team of contributors delivers an unmatched breadth and depth of content including Zwift news, hacks, training tips, and more.",
      "https://pbs.twimg.com/profile_images/943153414292279297/Xm2M38U4_400x400.jpg",
      "https://zwiftinsider.com/");
	},
};