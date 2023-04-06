const Discord = require("discord.js");
const { Ramalcim } = require("../../../Helpers/Schemas")
class UserUpdate {
    Event = "userUpdate"
    async run(old, nev) {
        const ramal = await Ramalcim.findOne({ guildID: config.guildID })
        const guild = client.guilds.cache.get(config.guildID)
        let user = guild.members.cache.get(old.id);
        if (!user) return;
        if (!guild) return;
        if (old.discriminator == nev.discriminator || old.bot || nev.bot) {
            return;
        } else try {
            let etiket = ramal.tags.filter(discrim => !isNaN(discrim))[0]
            if (nev.discriminator !== old.discriminator) {
                if (ramal?.etiketTag && old.discriminator == etiket && nev.discriminator !== etiket) {
                    user.setRoles(ramal.unregisterRole).catch(e => { }); user.roles.add(ramal.etkinlikRole); user.roles.add(ramal.cekilisRole); user.setNickname(`İsim | Yaş`)
                    if (log) log.send(`${uye}, adlı üye tagımızı kullanıcı adından silerek aramızdan ayrıldı!\n\n─────────────────\n\nÖnce ${old.tag} | Sonra: ${nev.tag}`)
                } else if (old.discriminator !== etiket && nev.discriminator == etiket) {
                    user.roles.add(ramal?.tagRol).catch(err => { })
                    if (log) log.send(`${user}, adlı üye tagımızı kullanıcı adına ekleyerek ailemize katıldı!\n\n─────────────────\n\nÖnce: ${old.tag} | Sonra: ${nev.tag}`)
                }
            }

        } catch (error) {
            client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``)
        }
    }
}

module.exports = UserUpdate