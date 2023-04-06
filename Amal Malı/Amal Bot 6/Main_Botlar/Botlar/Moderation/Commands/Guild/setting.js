const { Ramalcim} = require("../../../../Helpers/Schemas")
class Settings extends Command {
    constructor(client) {
        super(client, {
            name: "ayar",
            aliases: ["ayarlar","ayar","settings"],
            Founder: true,
        });
    }
    async run(client, message, args, embed) {
        const ramal = await Ramalcim.findOne({ guildID: message.guild.id })
        const row = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId('serverguard').setLabel(`Sunucu Koruma ${ramal.serverGuard ? '🟢' : '🔴'}`).setStyle('PRIMARY'), new Discord.MessageButton().setCustomId('channelguard').setLabel(`Kanal Koruma ${ramal.channelGuard ? '🟢' : '🔴'}`).setStyle('PRIMARY'), new Discord.MessageButton().setCustomId('roleguard').setLabel(`Rol Koruma ${ramal.roleGuard ? '🟢' : '🔴'}`).setStyle('PRIMARY'), new Discord.MessageButton().setCustomId('urlguard').setLabel(`URL Koruma ${ramal.urlGuard ? '🟢' : '🔴'}`).setStyle('PRIMARY'), new Discord.MessageButton().setCustomId('tacguard').setLabel(`Taç Guard ${ramal.tacGuard ? '🟢' : '🔴'}`).setStyle('PRIMARY'),)
        const row2 = new Discord.MessageActionRow().addComponents( new Discord.MessageButton().setCustomId('taglialim').setLabel(`Taglı Alım ${ramal.tagliAlim ? '🟢' : '🔴'}`).setStyle('PRIMARY'),)
        let settings = await message.channel.send({ embeds: [embed.setDescription(`Merhaba! **${message.author}** Aşağıdaki butonlardan açık/kapatmak istediğiniz ayarları seçebilirsiniz!`)], components: [row, row2] })
        var filter = (button) => button.user.id === message.author.id;
        const collector = settings.createMessageComponentCollector({ filter })
        collector.on('collect', async (button, user) => {
            if (button.customId === "serverguard") {
                if (ramal.serverGuard === true) {
                    await Ramalcim.findOneAndUpdate({ guildID: config.guildID }, { serverGuard: false }, { upsert: true });
                    button.reply(`Tebrikler ${button.user}! Başarıyla \`Sunucu Koruması\` kapatıldı! ${emojis.onay}`)
                } else if (ramal.serverGuard === false) {
                    await Ramalcim.findOneAndUpdate({ guildID: config.guildID }, { serverGuard: true }, { upsert: true });
                    button.reply(`Tebrikler ${button.user}! Başarıyla \`Sunucu Koruması\` açıldı! ${emojis.onay}`)
                }
            }
            if (button.customId === "roleguard") {
                if (ramal.roleGuard === true) {
                    await Ramalcim.findOneAndUpdate({ guildID: config.guildID }, { roleGuard: false }, { upsert: true });
                    button.reply(`Tebrikler ${button.user}! Başarıyla \`Rol Koruması\` kapatıldı! ${emojis.onay}`)
                } else if (ramal.roleGuard === false) {
                    await Ramalcim.findOneAndUpdate({ guildID: config.guildID }, { roleGuard: true }, { upsert: true });
                    button.reply(`Tebrikler ${button.user}! Başarıyla \`Rol Koruması\` açıldı! ${emojis.onay}`)
                }
            }
            if (button.customId === "channelguard") {
                if (ramal.channelGuard === true) {
                    await Ramalcim.findOneAndUpdate({ guildID: config.guildID }, { channelGuard: false }, { upsert: true });
                    button.reply(`Tebrikler ${button.user}! Başarıyla \`Kanal Koruması\` kapatıldı! ${emojis.onay}`)
                } else if (ramal.channelGuard === false) {
                    await Ramalcim.findOneAndUpdate({ guildID: config.guildID }, { channelGuard: true }, { upsert: true });
                    button.reply(`Tebrikler ${button.user}! Başarıyla \`Kanal Koruması\` açıldı! ${emojis.onay}`)
                }
            }
            if (button.customId === "urlguard") {
                if (ramal.urlGuard === true) {
                    await Ramalcim.findOneAndUpdate({ guildID: config.guildID }, { urlGuard: false }, { upsert: true });
                    button.reply(`Tebrikler ${button.user}! Başarıyla \`Url Koruması\` kapatıldı! ${emojis.onay}`)
                } else if (ramal.urlGuard === false) {
                    await Ramalcim.findOneAndUpdate({ guildID: config.guildID }, { urlGuard: true }, { upsert: true });
                    button.reply(`Tebrikler ${button.user}! Başarıyla \`Url Koruması\` açıldı! ${emojis.onay}`)
                }
            }
            if (button.customId === "tacguard") {
                if (ramal.tacGuard === true) {
                    await Ramalcim.findOneAndUpdate({ guildID: config.guildID }, { tacGuard: false }, { upsert: true });
                    button.reply(`Tebrikler ${button.user}! Başarıyla \`Taç Koruması\` kapatıldı! ${emojis.onay}`)
                } else if (ramal.tacGuard === false) {
                    await Ramalcim.findOneAndUpdate({ guildID: config.guildID }, { tacGuard: true }, { upsert: true });
                    button.reply(`Tebrikler ${button.user}! Başarıyla \`Taç Koruması\` açıldı! ${emojis.onay}`)
                }
            }
            if (button.customId === "taglialim") {
                if (ramal.tagliAlim === true) {
                    await Ramalcim.findOneAndUpdate({ guildID: config.guildID }, { tagliAlim: false }, { upsert: true });
                    button.reply(`Tebrikler ${button.user}! Başarıyla \`Taglı Alım\` kapatıldı! ${emojis.onay}`)
                } else if (ramal.tagliAlim === false) {
                    await Ramalcim.findOneAndUpdate({ guildID: config.guildID }, { tagliAlim: true }, { upsert: true });
                    button.reply(`Tebrikler ${button.user}! Başarıyla \`Taglı Alım\` açıldı! ${emojis.onay}`)
                }
            }
        })
    }
};

module.exports = Settings