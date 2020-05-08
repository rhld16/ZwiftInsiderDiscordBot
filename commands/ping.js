module.exports = {
  name: "ping",
  description: "It pings. Then... Pongs. And it's not Ping Pong.",
  usage: "",
  execute(message, args) {
    // eslint-disable-line no-unused-vars
    message.channel.send("Ping?").then((msg)=>{
    msg.edit(`:ping_pong:Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms.`);
  })
  }
};
