const { Ramalcim, permis } = require("../../../Helpers/Schemas")
const { guvenli } = require("../../../Helpers/function")
class guildMemberRemove {
  Event = "guildMemberRemove"
  async run(member) {
    const ramal = await Ramalcim.findOne({ guildID: config.guildID })
    if (ramal.serverGuard === true) try {
        let entry = await member.guild.fetchAuditLogs({ type: 'MEMBER_KICK' }).then(audit => audit.entries.first());
        if (!entry || Date.now() - entry.createdTimestamp > 5000 || await guvenli(entry.executor.id)) return;
        let islemyapan = member.guild.members.cache.get(entry.executor.id);
        if (islemyapan.manageable && ramal.jailedRole) islemyapan.roles.set([ramal.jailedRole], { reason: "Kişi Kicklediği İçin Cezalıya Atıldı" }).catch(error => console.log(`Etkinlik: Kick Add \nHata: ` + error + ``)) 
    } catch (error) { console.log(`Etkinlik : Kick Add - Hata : ` + error) }
  }
}

module.exports = guildMemberRemove