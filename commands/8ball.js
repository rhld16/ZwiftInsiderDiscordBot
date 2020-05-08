var emoji;
module.exports = {
  name: "8ball",
  description: "Ask the 8ball a yes or no question",
  usage: "<yes no question>",
  execute(message, args) {
    var myArray = [
      "It is certain",
      "It is decidedly so",
      "Without a doubt",
      "Yes, definitely",
      "You may rely on it",
      "As I see it, yes",
      "Most likely",
      "Outlook good",
      "Yes",
      "Signs point to yes",
      "Reply hazy try again",
      "Ask again later",
      "Better not tell you now",
      "Cannot predict now",
      "Concentrate and ask again",
      "Don't count on it",
      "My reply is no",
      "My sources say no",
      "Outlook not so good",
      "Very doubtful",
      "No you silly sausage",
      "Hang on I'm busy",
      "You're a mistake"
    ];

    var randomItem = myArray[Math.floor(Math.random() * myArray.length)];

    emoji = ":8ball:";

    // external emoji perm check
      emoji = ":8ball:";

    message.channel.send({
      embed: {
        title: emoji + " 8Ball",
        description: `Q: ${message.content
          .split(" ")
          .slice(1)
          .join(" ")}\nA: ${randomItem}`,
        color: 2829099
      }
    });
  }
}