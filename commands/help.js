module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[command name]',
	execute(message, args) {
		const data = [];
		const { commands } = message.client;
			data.push('Here\'s a list of all my commands:');
			data.push('8ball, ban, flip, help, hi, ping, purge, say, shrug, stats, time');
			data.push('This bot also offers 24/7 music in the 24/7 music voice channel');
      message.author.send(data, { split: true })
     if(message.channel.type==='text'){
      return message.reply('I\'ve sent you a DM with all my commands!')};
	}
};
