const { Ramalcim } = require('../../../../Helpers/Schemas')
class Whitelist extends Command {
    constructor(client) {
        super(client, {
            name: "whitelist",
            aliases: ["güvenli", "ramalcim"],
            Founder: true
        });
    }
    async run(client, message, args, embed) {
        const ramal = await Ramalcim.findOne({ guildID: message.guild.id })
        const member = message.mentions.users.first() || await client.fetchUser(args[1]);
        if (!args[0] || args[0].toLowerCase() !== "ekle" && args[0].toLowerCase() !== "çıkar") { message.reply({ embeds: [embed.setDescription(`**${message.guild.name}** Sunucusu Güvenli Sistemi!\n\nGüvenli listeye eklemek/çıkarmak için \`.ramalcim ekle/çıkar @üye/üyeid\`\n\n${ramal.WhiteListMembers ? ramal.WhiteListMembers.map(id => `<@${id}>`).join('\n') : 'Güvenlide hiç üye yok.'}`)] }) }
        else if (args[0].toLowerCase() === "ekle") {
            if (!args[1]) return message.reply(`**UYARI :** Bir üye belirtmeyi unuttun!`).sil(5)
            if (!member) return message.reply(`**UYARI :** Bir üye belirtmeyi unuttun!`).sil(5)
            else if (ramal.WhiteListMembers.includes(member.id)) return message.reply({ embeds: [embed.setDescription(`Bu üye zaten güvenli listede ${emojis.iptal}`)] }).sil(5)
            else {
                await Ramalcim.findOneAndUpdate({ guildID: config.guildID }, { $push: { WhiteListMembers: member.id } }, { upsert: true })
                message.reply({ embeds: [embed.setDescription(`${member} adlı kullanıcı başarı ile güvenli listeye eklendi ${emojis.onay}`)] })
            }
        } else if (args[0].toLowerCase() === "çıkar") {
            if (!args[1]) return message.reply(`**UYARI :** Bir üye belirtmeyi unuttun!`).sil(5)
            if (!member) return message.reply(`**UYARI :** Bir üye belirtmeyi unuttun!`).sil(5)
            else if (!ramal.WhiteListMembers.includes(member.id)) return message.reply({ embeds: [embed.setDescription(`Bu üye zaten güvenli listede değil ${emojis.iptal}`)] }).sil(5)
            else {
                await Ramalcim.findOneAndUpdate({ guildID: config.guildID }, { $pull: { WhiteListMembers: member.id } }, { upsert: true })
                message.reply({ embeds: [embed.setDescription(`${member} adlı kullanıcı başarı ile güvenli listeden çıkarıldı ${emojis.onay}`)] })
            }
        }
    }
}

module.exports = Whitelist