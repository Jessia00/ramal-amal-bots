const moment = require("moment");
const cezapuans = require("../../schemas/cezapuan");
const ceza = require("../../schemas/ceza")
const name = require("../../schemas/names");
const penals = require("../../schemas/penals");
const inviterSchema = require("../../schemas/inviter");
const messageUser = require("../../schemas/messageUser");
const voiceUser = require("../../schemas/voiceUser");
require("moment-duration-format");
const conf = require("../../configs/sunucuayar.json");
const { kirmiziok, green, red ,star } = require("../../configs/emojis.json");
const { TeamMember, MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js");

module.exports = {
  conf: {
    aliases: ["sff","verisil"],
    name: "verisil",
    help: "verisil"
  },

  run: async (client, message, args, embed) => {
if (!message.member.permissions.has('ADMINISTRATOR'))
{
message.reply({ content:"Bu işlemi yapamazsın dostum!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
message.react(red)
return;
}
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    const row = new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setPlaceholder('Kullanıcı Veri Silme')
          .setCustomId('kurulumselect')
          .addOptions([
          { 
                label: "Sicil Sıfırla",
                description: "Sunucudaki Sicilini Sıfırlar",
                value: "sicilsifirlama",
                emoji: "🎄"
  
          },
          { 
            label: "Ses Sıfırla",
            description: "Sunudaki Ses İstatistiklerini Sıfırlar",
            value: "sessifirlama",
            emoji: "🔊"

          },
          { 
            label: "Mesaj Sıfırla",
            description: "Sunudaki Mesaj İstatistiklerini Sıfırlar",
            value: "mesajsifirlama",
            emoji: "📑"

          },
          { 
            label: "Davet Sıfırla",
            description: "Sunudaki Davet İstatistiklerini Sıfırlar",
            value: "davetsifirla",
            emoji: "📩"

          },
          { 
              label: "İsim Sıfırla",
              description: "Sunucudaki İsim Gecmişini Sıfırlar",
              value: "isimsifirlama",
              emoji: "🚀"

          },
          { 
            label: "Ceza Puanlarını Sıfırla",
            description: "Sunucudaki Ceza Puanlarını Sıfırlar",
            value: "cezapaunsifirla",
            emoji: "🙎‍♂️"

          },
          { 
            label: "Kapat",
            description: "Menüyü Kapat.",
            value: "closeMenu",
            emoji: "❌"
          }
        ])
        );


        embed.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) }).setTimestamp().setColor(message.author.displayHexColor).setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })}).setThumbnail(message.guild.iconURL({ dynamic: true }))
        embed.addField(`VERİ SIFIRLAMA PANELİ`,`
        Aşağıda Oluşan Menüden **${message.guild.name}** Sunucusunun Genel İstatistiklerini Sıfırlamak İçin Menüden Seçenek Seç!`)
            let msg = await message.channel.send({ components: [row], embeds: [embed] })
            message.react(`${client.emojis.cache.find(x => x.name === "green")}`);
             msg.awaitMessageComponent({ filter: (component) => component.user.id === message.author.id, componentType: 'SELECT_MENU',}).then(async (interaction) => {
             if(interaction.values[0] == "sicilsifirlama") {
            
    await penals.deleteMany({userID: member.user.id, guildID: message.guild.id})
    const sicil = new MessageEmbed()
    .setDescription(`${green}  ${member.toString()} üyesinin sicili ${message.author} tarafından \`${moment(Date.now()).format("LLL")}\` tarihinde temizlendi!`) 

            interaction.update({ components: [row], embeds: [sicil] }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000))}		 
             if(interaction.values[0] == "isimsifirlama") {
                
                await name.deleteMany({userID: member.user.id, guildID: message.guild.id})
      const isim = new MessageEmbed()
      .setDescription(`${green} ${member.toString()} üyesinin isim geçmişi ${message.author} tarafından \`${moment(Date.now()).format("LLL")}\` tarihinde temizlendi!`)

                interaction.update({ components: [row], embeds: [isim] }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000))}
                
                if(interaction.values[0] == "cezapaunsifirla") {
                
                    await cezapuans.deleteMany({userID: member.user.id, guildID: message.guild.id})
                    await ceza.deleteMany({userID: member.user.id, guildID: message.guild.id})
                    const cezapuan = new MessageEmbed()
                    .setDescription(`${green}  ${member.toString()} üyesinin ceza puanı ${message.author} tarafından \`${moment(Date.now()).format("LLL")}\` tarihinde temizlendi!`) 
    
                    interaction.update({ components: [row], embeds: [cezapuan] }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000))
                }                         
                
                if(interaction.values[0] == "davetsifirla") {
                
                    const inviter = await inviterSchema.deleteMany({ guildID: message.guild.id });
                    
                    message.reply(`${green}  ${member.toString()} üyesinin daveti ${message.author} tarafından \`${moment(Date.now()).format("LLL")}\` tarihinde temizlendi!`) 
    
                    interaction.update({ components: [row], embeds: [inviter] }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000))
                }

                if(interaction.values[0] == "mesajsifirlama") {
                
                    const mesaj = await messageUser.deleteMany({ guildID: message.guild.id });
                    
                    message.reply(`${green}  ${member.toString()} üyesinin mesaj statistikleri ${message.author} tarafından \`${moment(Date.now()).format("LLL")}\` tarihinde temizlendi!`) 
    
                    interaction.update({ components: [row], embeds: [mesaj] }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000))
                }

                if(interaction.values[0] == "sessifirlama") {
                
                    const ses = await voiceUser.deleteMany({ guildID: message.guild.id });
                    
                    message.reply(`${green}  ${member.toString()} üyesinin ses statistikleri ${message.author} tarafından \`${moment(Date.now()).format("LLL")}\` tarihinde temizlendi!`) 
    
                    interaction.update({ components: [row], embeds: [ses] }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000))
                }


                    if(interaction.values[0] == "closeMenu") {
                        interaction.message.delete()					
                        }
                

                    
                
                    })

}
}