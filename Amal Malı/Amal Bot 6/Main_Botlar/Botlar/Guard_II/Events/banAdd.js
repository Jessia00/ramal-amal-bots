const { Ramalcim, permis } = require("../../../Helpers/Schemas")
const { ytKapat, guvenli } = require("../../../Helpers/function")
class guildBanAdd {
  Event = "guildBanAdd"
  async run(ban) {
    const ramal = await Ramalcim.findOne({ guildID: config.guildID })
    if (ramal.serverGuard === true) try {
        let entry = await ban.guild.fetchAuditLogs({ type: 'MEMBER_BAN_ADD' }).then(audit => audit.entries.first());
        if (!entry || Date.now() - entry.createdTimestamp > 5000 || await guvenli(entry.executor.id)) return;
        ytKapat(config.guildID)  
      } catch (error) { console.log(`Etkinlik : Ban Add - Hata : ` + error) }
  }
}

module.exports = guildBanAdd