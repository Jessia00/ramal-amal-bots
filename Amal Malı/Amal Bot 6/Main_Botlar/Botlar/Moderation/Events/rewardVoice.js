const { Ramalcim, voiceUser } = require("../../../Helpers/Schemas");
class voiceReward {
  Event = "voiceStateUpdate"
  async run(newState, oldState) {
const ramal = await Ramalcim.findOne({ guildID: config.guildID})
const voiceData = await voiceUser.findOne({ guildID: config.guildID, userID: oldState.id });
if (!ramal.levelLog) return;
if(voiceData) {
if(voiceData.topStat >= 360000000) {
if(oldState.member.roles.cache.has(ramal.vBronz) || oldState.member.roles.cache.has(ramal.vGumus) || oldState.member.roles.cache.has(ramal.vAltin) || oldState.member.roles.cache.has(ramal.vElmas)) return;
client.channels.cache.get(ramal.levelLog).send(`${emojis.star} ${oldState.member} Tebrikler! Ses istatistiklerin **Ses Bronz** rolüne sahip olmanızı sağladı!`)
oldState.member.roles.add(ramal.vBronz)
}
if(voiceData.topStat >= 1080000000) {
if(oldState.member.roles.cache.has(ramal.vGumus) || oldState.member.roles.cache.has(ramal.vAltin) || oldState.member.roles.cache.has(ramal.vElmas)) return;
client.channels.cache.get(ramal.levelLog).send(`${emojis.star} ${oldState.member} Tebrikler! Ses istatistiklerin **Ses Gümüş** rolüne sahip olmanızı sağladı!`)
oldState.member.roles.add(ramal.vGumus)
oldState.member.roles.remove(ramal.vBronz)
}
if(voiceData.topStat >= 2700000000) {
if(oldState.member.roles.cache.has(ramal.vAltin) || oldState.member.roles.cache.has(ramal.vElmas)) return;
client.channels.cache.get(ramal.levelLog).send(`${emojis.star} ${oldState.member} Tebrikler! Ses istatistiklerin **Ses Altın** rolüne sahip olmanızı sağladı!`)
oldState.id.roles.add(ramal.vAltin)
oldState.member.roles.remove(ramal.vGumus)
}
if(voiceData.topStat >= 7200000000) {
if(oldState.member.roles.cache.has(ramal.vElmas)) return;
client.channels.cache.get(ramal.levelLog).send(`${emojis.star} ${oldState.member} Tebrikler! Ses istatistiklerin **Ses Elmas** rolüne sahip olmanızı sağladı!`)
oldState.member.roles.add(ramal.vElmas)
oldState.member.roles.remove(ramal.vAltin)
}
}

   }  
}

module.exports = voiceReward