var emoji;
module.exports = {
  name: "zwift",
  description: "WIP",
  usage: "<zwift question>",
  execute(message, args) {
    var ZwiftAccount = require("zwift-mobile-api");
    var account = new ZwiftAccount("rhodrilld@gmail.com", "yespeas");
    var playerId = "1266306"
    var profile = account.getProfile(playerId);
var world = account.getWorld(1);

world.riders().then(riders => {
    console.log(riders); // JSON array of all riders currently riding
});
}
}