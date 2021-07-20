function sendTag(channel, title, body, img, link) {
  const embed = {
    title: title,
    description: body,
    url: link,
    color: 15886114,
    thumbnail: {
      url: img
    }
  };
  channel.send({ embed });
}
module.exports = sendTag;