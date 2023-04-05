const {MessageEmbed, MessageAttachment, MessageActionRow, MessageButton, MessageSelectMenu} = require("discord.js");
const Stats = require('../../../../Global/Databases/Schemas/Plugins/Client.Users.Stats')
const moment = require('moment');
require('moment-duration-format');
require('moment-timezone');
const { genEmbed } = require("../../../../Global/Init/Embed");
module.exports = {
    Isim: "top",
    Komut: ["topmesaj","topstat","topses"],
    Kullanim: "top",
    Aciklama: "Belirlenen üye veya kullanan üye eğer ki yetkiliyse onun yetki atlama bilgilerini gösterir.",
    Kategori: "stat",
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
     const embed = new genEmbed()
    Stats.find({guildID: message.guild.id}).exec(async (err, data) => {
        data = data.filter(m => message.guild.members.cache.has(m.userID));
        let genelsesbirinci;
        let publicbirinci;
        let mesajbirinci;
        let streamerbirinci;

        genelPublic = ``
        let PublicListele = data.sort((uye1, uye2) => {
            let uye2Toplam = 0;
            if(uye2.voiceStats) uye2.voiceStats.forEach((x, key) => {
                if(key == kanallar.publicKategorisi) uye2Toplam += x
            });
            let uye1Toplam = 0;
            if(uye1.voiceStats) uye1.voiceStats.forEach((x, key) => {
                if(key == kanallar.publicKategorisi) uye1Toplam += x
            });
            return uye2Toplam-uye1Toplam;
        }).slice(0, 20).map((m, index) => {
            let uyeToplam = 0;
            if(index == 0) publicbirinci = message.guild.members.cache.get(m.userID).toString()
            m.voiceStats.forEach((x, key) => { if(key == kanallar.publicKategorisi) uyeToplam += x });
            return `\` ${index + 1} \` ${message.guild.members.cache.get(m.userID).toString()} \`${client.sureCevir(uyeToplam)}\` ${m.userID == message.member.id ? `**(Siz)**` : ``}`;
        }).join('\n');

        
        // genelStreamer = ``
        // let streamerListele = data.sort((uye1, uye2) => {
        //     let uye2Toplam = 0;
        //     if(uye2.voiceStats) uye2.voiceStats.forEach((x, key) => {
        //         if(key == kanallar.streamerKategorisi) uye2Toplam += x
        //     });
        //     let uye1Toplam = 0;
        //     if(uye1.voiceStats) uye1.voiceStats.forEach((x, key) => {
        //         if(key == kanallar.streamerKategorisi) uye1Toplam += x
        //     });
        //     return uye2Toplam-uye1Toplam;
        // }).slice(0, 10).map((m, index) => {
        //     let uyeToplam = 0;
        //     if(index == 0) streamerbirinci = message.guild.members.cache.get(m.userID).toString()
        //     m.voiceStats.forEach((x, key) => { if(key == kanallar.streamerKategorisi) uyeToplam += x });
        //     return `\` ${index + 1} \` ${message.guild.members.cache.get(m.userID).toString()} \`${client.sureCevir(uyeToplam)}\` ${m.userID == message.member.id ? `**(Siz)**` : ``}`;
        // }).join('\n');
       let genelSes = ``;
       let sesSıralaması = data.sort((uye1, uye2) => {
            let uye2Toplam2 = 0;
            if(uye2.voiceStats) uye2.voiceStats.forEach(x => uye2Toplam2 += x);
            let uye1Toplam2 = 0;
            if(uye1.voiceStats) uye1.voiceStats.forEach(x => uye1Toplam2 += x);
            return uye2Toplam2-uye1Toplam2;
        }).slice(0, 20).map((m, index) => {
            let uyeToplam2 = 0;
            if(index == 0) genelsesbirinci = message.guild.members.cache.get(m.userID).toString()
            if(m.voiceStats) m.voiceStats.forEach(x => uyeToplam2 += x);
            return `\` ${index + 1} \` ${message.guild.members.cache.get(m.userID).toString()} \`${client.sureCevir(uyeToplam2)}\` ${m.userID == message.member.id ? `**(Siz)**` : ``}`;
        }).join('\n');
        let genelMesaj = ``
        let mesajSıralaması = data.sort((uye1, uye2) => {
            let uye2Toplam = 0;
            if(uye2.voiceStats) uye2.chatStats.forEach(x => uye2Toplam += x);
            let uye1Toplam = 0;
            if(uye1.voiceStats) uye1.chatStats.forEach(x => uye1Toplam += x);
            return uye2Toplam-uye1Toplam;
        }).slice(0, 20).map((m, index) => {
            let uyeToplam = 0;
            if(m.voiceStats) m.chatStats.forEach(x => uyeToplam += x);
            if(index == 0) mesajbirinci = message.guild.members.cache.get(m.userID).toString()
            return `\` ${index + 1} \` ${message.guild.members.cache.get(m.userID).toString()} \`${Number(uyeToplam)} mesaj\` ${m.userID == message.member.id ? `**(Siz)**` : ``}`;
        }).join('\n');

            // SIRALAMA BUL


         let AMCIKKK = data.sort((uye1, uye2) => {
            let uye2Toplam = 0;
            if(uye2.voiceStats) uye2.voiceStats.forEach((x, key) => {
                if(key == kanallar.publicKategorisi) uye2Toplam += x
            });
            let uye1Toplam = 0;
            if(uye1.voiceStats) uye1.voiceStats.forEach((x, key) => {
                if(key == kanallar.publicKategorisi) uye1Toplam += x
            });
            return uye2Toplam-uye1Toplam;
        }).map((m, index) => {
            let uyee = 0;
            let sira = ``
            if(m.userID === message.member.id) sira = `${index + 1}`
            if(m.userID === message.member.id) m.voiceStats.forEach((x, key) => { if(key == kanallar.publicKategorisi) uyee += x });
            if(m.userID === message.member.id) {
                if(uyee != 0 && sira > 20) return genelPublic = `\` ${sira} \` ${message.guild.members.cache.get(m.userID).toString()} \`${client.sureCevir(uyee)}\` **(Siz)**`
              }
            
           
            
        })

        let YARRAMMMM = data.sort((uye1, uye2) => {
            let uye2Toplam = 0;
            if(uye2.voiceStats) uye2.chatStats.forEach(x => uye2Toplam += x);
            let uye1Toplam = 0;
            if(uye1.voiceStats) uye1.chatStats.forEach(x => uye1Toplam += x);
            return uye2Toplam-uye1Toplam;
        }).map((m, index) => {
            let uyee = 0;
            let sira = ``
            if(m.userID === message.member.id) sira = `${index + 1}`
            if(m.userID === message.member.id) {
                if(m.voiceStats) m.chatStats.forEach(x => uyee += x);
            }
            if(m.userID === message.member.id) {
                if(uyee != 0 && sira > 20) return genelMesaj = `\` ${sira} \` ${message.guild.members.cache.get(m.userID).toString()} \`${uyee} mesaj\` **(Siz)**`
            } 
            
        })
        let kamerayigotunesokim = data.sort((uye1, uye2) => {
            let uye2Toplam = 0;
            if(uye2.voiceStats) uye2.voiceStats.forEach((x, key) => {
                if(key == kanallar.streamerKategorisi) uye2Toplam += x
            });
            let uye1Toplam = 0;
            if(uye1.voiceStats) uye1.voiceStats.forEach((x, key) => {
                if(key == kanallar.streamerKategorisi) uye1Toplam += x
            });
            return uye2Toplam-uye1Toplam;
        }).map((m, index) => {
            let uyee = 0;
            let sira = ``
            if(m.userID === message.member.id) sira = `${index + 1}`
            if(m.userID === message.member.id) m.voiceStats.forEach((x, key) => { if(key == kanallar.streamerKategorisi) uyee += x });
            if(m.userID === message.member.id) {
              if(uyee != 0 && sira > 20) return genelStreamer = `\` ${sira} \` ${message.guild.members.cache.get(m.userID).toString()} \`${client.sureCevir(uyee)}\` **(Siz)**`
            }
        })
        let amgotmeme = data.sort((uye1, uye2) => {
            let uye2Toplam2 = 0;
            if(uye2.voiceStats) uye2.voiceStats.forEach(x => uye2Toplam2 += x);
            let uye1Toplam2 = 0;
            if(uye1.voiceStats) uye1.voiceStats.forEach(x => uye1Toplam2 += x);
            return uye2Toplam2-uye1Toplam2;
        }).map((m, index) => {
            let uyee = 0;
            let sira = ``
            if(m.userID === message.member.id) sira = `${index + 1}`
            if(m.userID === message.member.id && m.voiceStats) m.voiceStats.forEach(x => uyee += x);
            if(m.userID === message.member.id) {
                if(uyee != 0 && sira > 20) return genelSes = `\` ${sira} \` ${message.guild.members.cache.get(m.userID).toString()} \`${client.sureCevir(uyee)}\` **(Siz)**`
            }
        })


        let Row = new MessageActionRow().addComponents(
                new MessageSelectMenu()
                .setCustomId("sdadasd")
                .setPlaceholder(`${message.guild.name} sunucusu istatistik detaylarını listele.`)
                .setOptions([
                    {label: "Genel Public İstatistikleri", value: "pubses", description: "Haftalık Top 20 Public Ses", emoji: {id: "998234546023706744"}},
                    {label: "Genel Ses İstatistikleri", value: "genses", description: "Haftalık Top 20 Genel Ses", emoji: {id: "998234546023706744"}},
                    {label: "Genel Mesaj İstatistikleri", value: "mesis", description: "Haftalık Top 20 Mesaj", emoji: {id: "998234546023706744"}},
                ])
        )


            let load = await message.reply({content: `${message.guild.name} sunucusuna ait tüm istatistik sıralaması listeleniyor...`})

        await load.edit({components: [Row], content: `Aşağıda bulunan istatistiklerden birini seçerek  genel sıralamaları görebilirsin.`});
          var filter = (i) => i.user.id == message.author.id
          let collector = load.createMessageComponentCollector({filter: filter, time: 120000})
          collector.on('end', async (i) => {
            load.delete().catch(err => {})
            
          })
          collector.on('collect', async (i) => {
           
            if(i.values[0] == "pubses") {
              load.edit({content: null, embeds: [new genEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
                .setDescription(`<:mid_rozEt:1018316272548716584>  Aşağı da ${message.guild.name} sunucusuna ait haftalık \`Public Ses\` İstatistikleri listelenmektedir.\n

                **<:nesilroz:1018146784834490379>  Haftanın En İyileri**

 \`👑 Public\`  ${publicbirinci.id == message.member.id ? publicbirinci + " **(Siz)**" : publicbirinci}
 \`👑 Genel\`  ${genelsesbirinci.id == message.member.id ? genelsesbirinci + " **(Siz)**" : genelsesbirinci}
 \`👑 Mesaj\`  ${mesajbirinci.id == message.member.id ? mesajbirinci + " **(Siz)**" : mesajbirinci}

${message.guild.emojiGöster(emojiler.staticon)} **Genel Public Sıralaması**

${PublicListele ? PublicListele : `Kayıt Bulunamadı!`}`)    
            ]})
              i.deferUpdate().catch(err => {})
            }
            if(i.values[0]  == "genses") {
                load.edit({content: null, embeds: [new genEmbed()
                    .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
                    .setDescription(`<:mid_rozEt:1018316272548716584>  Aşağı da ${message.guild.name} sunucusuna ait haftalık \`Genel Ses\` İstatistikleri listelenmektedir.\n
                    
                    **<:nesilroz:1018146784834490379>  Haftanın En İyileri**

 \`👑 Public\`  ${publicbirinci.id == message.member.id ? publicbirinci + " **(Siz)**" : publicbirinci}
 \`👑 Genel\`  ${genelsesbirinci.id == message.member.id ? genelsesbirinci + " **(Siz)**" : genelsesbirinci}
 \`👑 Mesaj\`  ${mesajbirinci.id == message.member.id ? mesajbirinci + " **(Siz)**" : mesajbirinci}

${message.guild.emojiGöster(emojiler.staticon)} **Genel Ses Sıralaması**

${sesSıralaması ? sesSıralaması : `Kayıt Bulunamadı!`}`)    
                ]})
                i.deferUpdate().catch(err => {})
            }
            if(i.values[0]  == "mesis") {
                load.edit({content: null, embeds: [new genEmbed()
                    .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
                    .setDescription(`<:mid_rozEt:1018316272548716584>  Aşağı da ${message.guild.name} sunucusuna ait haftalık \`Mesaj\` İstatistikleri listelenmektedir.\n

                    **<:nesilroz:1018146784834490379>  Haftanın En İyileri**

 \`👑 Public\`  ${publicbirinci.id == message.member.id ? publicbirinci + " **(Siz)**" : publicbirinci}
 \`👑 Genel\`  ${genelsesbirinci.id == message.member.id ? genelsesbirinci + " **(Siz)**" : genelsesbirinci}
 \`👑 Mesaj\`  ${mesajbirinci.id == message.member.id ? mesajbirinci + " **(Siz)**" : mesajbirinci}

${message.guild.emojiGöster(emojiler.staticon)} **Genel Mesaj Sıralaması**

${mesajSıralaması ? mesajSıralaması : `Kayıt Bulunamadı!`}`)    
                ]})
              i.deferUpdate().catch(err => {})
            }

        })
        
    });
  }
};