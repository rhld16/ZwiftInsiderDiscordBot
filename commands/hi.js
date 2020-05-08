module.exports = {
	name: 'hi',
	description: 'Hi!',
	execute(message) {
		message.channel.send('Hello.');
	},
};