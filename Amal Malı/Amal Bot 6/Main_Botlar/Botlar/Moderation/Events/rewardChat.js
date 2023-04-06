const { Ramalcim, messageUser } = require("../../../Helpers/Schemas");
class Message {
  Event = "messageCreate"
  async run(message) {
const ramal = await Ramalcim.findOne({ guildID: config.guildID })
const mesajData = await messageUser.findOne({ guildID: config.guildID, userID: message.author.id });
if (!ramal.levelLog) return;
if(mesajData) {
if(mesajData.topStat == 1000) {
client.channels.cache.get(ramal.levelLog).send(`${emojis.star} ${message.author} Tebrikler! Mesaj istatistiklerin **Chat Bronz** rolüne sahip olmanızı sağladı!`)
message.member.roles.add(ramal.cBronz)
}
if(mesajData.topStat == 5000) {
client.channels.cache.get(ramal.levelLog).send(`${emojis.star} ${message.author} Tebrikler! Mesaj istatistiklerin **Chat Gümüş** rolüne sahip olmanızı sağladı!`)
message.member.roles.add(ramal.cGumus)
message.member.roles.remove(ramal.cBronz)
}
if(mesajData.topStat == 10000) {
client.channels.cache.get(ramal.levelLog).send(`${emojis.star} ${message.author} Tebrikler! Mesaj istatistiklerin **Chat Altın** rolüne sahip olmanızı sağladı!`)
message.member.roles.add(ramal.cAltin)
message.member.roles.remove(ramal.cGumus)
}
if(mesajData.topStat == 50000) {
client.channels.cache.get(ramal.levelLog).send(`${emojis.star} ${message.author} Tebrikler! Mesaj istatistiklerin **Chat Elmas** rolüne sahip olmanızı sağladı!`)
message.member.roles.add(ramal.cElmas)
message.member.roles.remove(ramal.cAltin)
}
}
}
}


module.exports = Message