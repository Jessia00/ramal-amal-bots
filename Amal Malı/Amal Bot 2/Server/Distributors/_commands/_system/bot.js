const { Client, Message, Util, Intents, MessageActionRow, MessageButton, MessageAttachment, MessageSelectMenu} = require("discord.js");
const Punitives = require('../../../../Global/Databases/Schemas/Global.Punitives')
const Users = require('../../../../Global/Databases/Schemas/Client.Users')
const GUILDS_SETTINGS = require('../../../../Global/Databases/Schemas/Global.Guild.Settings')
const { genEmbed } = require('../../../../Global/Init/Embed')
module.exports = {
    Isim: "bot",
    Komut: ["bot-dev","update-bots","botsu","acr-bot","bot-setting","dev-discord","bots","botpp"],
    Kullanim: "",
    Aciklama: "",
    Kategori: "-",
    Extend: true,
    
   /**
   * @param {Client} client 
   */
  onLoad: function (client) {
   
  },

   /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   */

  onRequest: async function (client, message, args) {
    let callbacks = require('../../../../Global/Settings/_system.json');

        // Bot Token's
    let Req = callbacks.TOKENS.Requirements
    let Stat = callbacks.TOKENS.Statistics
    let Voucher = callbacks.TOKENS.Voucher
    let SEC_MAIN = callbacks.TOKENS.SECURITY.MAIN
    let SEC_ONE = callbacks.TOKENS.SECURITY.SEC_ONE
    let SEC_TWO = callbacks.TOKENS.SECURITY.SEC_TWO
    let SEC_THREE = callbacks.TOKENS.SECURITY.SEC_THREE
    let SEC_FOUR = callbacks.TOKENS.SECURITY.SEC_FOUR
    let DISTS = callbacks.TOKENS.SECURITY.DISTS
    let WELCOME = callbacks.WELCOMES
        // Bot Token's

    let allTokens = [Req, Stat, Voucher, SEC_MAIN, SEC_ONE, SEC_TWO, SEC_THREE, SEC_FOUR, DISTS]
    let pubTokens = [Req, Stat, Voucher, WELCOME, SEC_MAIN, SEC_ONE, SEC_TWO, SEC_THREE, SEC_FOUR]
   
    let OWNBOTS = []

    allTokens.forEach(client => {
        OWNBOTS.push({
            value: client.user.id,
            emoji: { id: "1031274503893942423" },
            label: `${client.user.tag}`,
            description: `${client.user.id}`
        })
    })
    let Row = new MessageActionRow().addComponents(
        new MessageSelectMenu()
        .setCustomId("selectBot")
        .setPlaceholder("♾️ | Güncellenecek Bir Bot Seçiniz!")
        .setOptions(
            [OWNBOTS]
        )
    )

    let msg = await message.channel.send({embeds: [new genEmbed().setColor("WHITE").setDescription(`${message.guild.emojiGöster(emojiler.Icon)} Aşağıda sıralanmakta olan botların, ismini veya da profil fotoğrafını değişmesini istediğiniz bir botu seçiniz.`)],components: [Row]})
    const filter = i => i.user.id == message.member.id
    const collector = msg.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 35000 })

    collector.on('collect', async (i) => {
        if(i.customId == "selectBot") {
            let type = i.values
            if(!type) return await i.reply({content: "Bir bot veya işlem bulunamadı!", ephemeral: true})

                let botId = i.values
                let botClient = allBots.find(bot => bot.user.id == type)
                if(!botClient) return await i.reply({content: "Bir bot veya işlem bulunamadı!", ephemeral: true})
                let updateRow = new MessageActionRow().addComponents(
                    new MessageButton()
                    .setCustomId("selectAvatar")
                    .setEmoji("999049631591841832")
                    .setLabel("Profil Fotoğrafı Değişikliliği")
                    .setStyle("PRIMARY"),
                    new MessageButton()
                    .setCustomId("selectName")
                    .setEmoji("999049631591841832")
                    .setLabel("İsim Değişikliliği")
                    .setStyle("SUCCESS")
                )
                msg.delete().catch(err => {})
                await message.channel.send({embeds: [new genEmbed().setColor("WHITE").setDescription(`Vahuu! ${botClient.user} isimli bot üzerinde yapmak istediğiniz değişikliliği seçiniz?`)], components: [
                    updateRow
                ]}).then(msg => {
                    const filter = i => i.user.id == message.member.id 
                    const collector = msg.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 35000 })
                    collector.on("collect", async (i) => {
                        let botClient = allBots.find(bot => bot.user.id == botId)
                        if(!botClient) return await i.reply({content: "Bir bot veya işlem bulunamadı!", ephemeral: true})
                        if(i.customId == "selectAvatar") {
                             msg.edit({embeds: [new genEmbed().setColor("DARK_GOLD").setDescription(`${message.guild.emojiGöster(emojiler.Icon)} ${botClient.user} isimli botun yeni profil resmini yükleyin veya bağlantısını girin. İşlemi iptal etmek için (**iptal**) yazabilirsiniz. (**Süre**: \`60 Saniye\`)`)],components: []})
                            var isimfilter = m => m.author.id == message.member.id
                            let col = msg.channel.createMessageCollector({filter: isimfilter, time: 60000, max: 1, errors: ["time"]})

                            col.on('collect', async (m) => {
                                if (m.content == ("iptal" || "i")) {
                                    msg.delete().catch(err => {});
                                    message.react(message.guild.emojiGöster(emojiler.Iptal)).catch(err => {})
                                    await i.reply({content: `${cevaplar.prefix} Profil resmi değiştirme işlemi iptal edildi.`, ephemeral: true})
                                    return;
                                  };
                                  let eskinick = botClient.user.avatarURL({dynamic: true})
                                  let bekle = await message.reply(`Bu işlem biraz uzun sürebilir, Lütfen bekleyin...`)
                                   let isim = m.content || m.attachments.first().url
                                    if(!isim) {
                                        message.react(message.guild.emojiGöster(emojiler.Iptal)).catch(err => {})
                                        msg.delete().catch(err => {});
                                        await i.reply({content: `${cevaplar.prefix} Profil resmi belirtilmediği için işlem iptal edildi.`, ephemeral: true})
                                        return;
                                    }
                                  botClient.user.setAvatar(isim).then(x => {
                                      bekle.delete().catch(err => {})
                                      msg.delete().catch(err => {})
                                      let logChannel = message.guild.kanalBul("guild-log")
                                      if(logChannel) logChannel.send({embeds: [new genEmbed().setFooter(`${tarihsel(Date.now())} tarihinde işleme koyuldu.`).setDescription(`${message.member} tarafından ${botClient.user} isimli botun profil resmi değiştirildi.`).setThumbnail(botClient.user.avatarURL())]})
                                      message.channel.send({embeds: [new genEmbed().setDescription(`${message.guild.emojiGöster(emojiler.Onay)} Başarıyla! ${botClient.user} isimli botun profil resmi güncellendi!`).setThumbnail(botClient.user.avatarURL())]}).then(x => {
                                       message.react(message.guild.emojiGöster(emojiler.Onay)).catch(err => {})
                                       setTimeout(() => {
                                           x.delete().catch(err => {})
                                       }, 30000);
                                   })
                                  }).catch(err => {
                                       bekle.delete().catch(err => {})
                                       msg.delete().catch(err => {})
                                      message.channel.send(`${cevaplar.prefix} **${botClient.user.tag}**, Başarısız! profil resmi güncelleyebilmem için biraz beklemem gerek!`).then(x => {
                                       message.react(message.guild.emojiGöster(emojiler.Iptal)).catch(err => {})
                                       setTimeout(() => {
                                           x.delete().catch(err => {})
                                       }, 7500);
                                   })
                                  })
                            });
                            
                            col.on('end', collected => {
                                msg.delete().catch(err => {});
                            });
                        }
                        if(i.customId == "selectName") {
                            msg.edit({embeds: [new genEmbed().setColor("DARK_GOLD").setDescription(`${message.guild.emojiGöster(emojiler.Icon)} ${botClient.user} isimli botun yeni ismini belirtin. İşlemi iptal etmek için (**iptal**) yazabilirsiniz. (**Süre**: \`60 Saniye\`)`)],components: []})
                            var isimfilter = m => m.author.id == message.member.id
                            let col = msg.channel.createMessageCollector({filter: isimfilter, time: 60000, max: 1, errors: ["time"]})

                            col.on('collect', async (m) => {
                                if (m.content == ("iptal" || "i")) {
                                    msg.delete().catch(err => {});
                                    message.react(message.guild.emojiGöster(emojiler.Iptal)).catch(err => {})
                                    await i.reply({content: `${cevaplar.prefix} İsim değiştirme işlemi iptal edildi.`, ephemeral: true})
                                    return;
                                  };
                                  let eskinick = botClient.user.username
                                  let bekle = await message.reply(`Bu işlem biraz uzun sürebilir, Lütfen bekleyin...`)
                                  let isim = m.content
                                  botClient.user.setUsername(isim).then(x => {
                                      bekle.delete().catch(err => {})
                                      msg.delete().catch(err => {})
                                      let logChannel = message.guild.kanalBul("guild-log")
                                      if(logChannel) logChannel.send({embeds: [new genEmbed().setFooter(`${tarihsel(Date.now())} tarihinde işleme koyuldu.`).setDescription(`${message.member} tarafından ${botClient.user} isimli botun ismi değiştirildi.\n**${eskinick}** \` ••❯ \` **${botClient.user.username}** olarak güncellendi.`)]})
                                      message.channel.send({embeds: [new genEmbed().setDescription(`${message.guild.emojiGöster(emojiler.Onay)} Başarıyla! **${eskinick}** \` ••❯ \` **${botClient.user.username}** olarak değiştirildi.`)]}).then(x => {
                                       message.react(message.guild.emojiGöster(emojiler.Onay)).catch(err => {})
                                       setTimeout(() => {
                                           x.delete().catch(err => {})
                                       }, 30000);
                                   })
                                  }).catch(err => {
                                       bekle.delete().catch(err => {})
                                       msg.delete().catch(err => {})
                                      message.channel.send(`${cevaplar.prefix} **${botClient.user.tag}**, Başarısız! isim değiştirebilmem için biraz beklemem gerek!`).then(x => {
                                       message.react(message.guild.emojiGöster(emojiler.Iptal)).catch(err => {})
                                       setTimeout(() => {
                                           x.delete().catch(err => {})
                                       }, 7500);
                                   })
                                  })
                            });
                            
                            col.on('end', collected => {
                                msg.delete().catch(err => {});
                            });
                        }
                    })
                })
   
        }
    })

    collector.on("end", async () => {
        msg.delete().catch(err => {})
    })
  }
};