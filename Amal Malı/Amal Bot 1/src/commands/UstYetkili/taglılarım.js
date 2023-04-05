const taggeds = require("../../schemas/taggeds");
const { red, green } = require("../../configs/emojis.json")
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");
let serverSettings = require ("../../models/sunucuayar");
module.exports = {
  conf: {
    aliases: ["tt"],
    name: "tt",
    help: "taglılar"
  },

  run: async (client, message, args, embed) => {
 if (!message.guild) return;
    let conf = await serverSettings.findOne({
      guildID: message.guild.id
  });

  if (!conf.staffs.some(x => message.member.roles.cache.has(x))) return message.react(red)  
       const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const taggedData = await taggeds.findOne({ guildID: message.guild.id, userID: message.author.id });
      const uyeler = taggedData.taggeds.slice(0,5).map(x => `<@${x}>`).join(", ")

      const row = new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setPlaceholder('Seçenekler İçin Menüyü Kullan!')
          .setCustomId('kurulumselect')
          .addOptions([
          { 
              label: "Taglı Üyelerim",
              description: "Taglı Üyelerimi Listeler",
              value: "taglilarim",
              emoji: "1️⃣"
  
          },
          { 
            label: "Top Taglı",
            description: "Top Tagli Listesini Listeler",
            value: "unjail2",
            emoji: "2️⃣"
  
          },
          { 
            label: "Kapat",
            description: "Menüyü Kapat.",
            value: "closeMenu",
            emoji: "🚀"
          }
        ])
        );
  
  
        const embeds = new MessageEmbed()
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
.setDescription(`Merhabalar ${message.author} **Ramalin Ask Botu** Sunucusunda Toplam
      Taglı Kazandırdığın Üye \`${taggedData ? `${taggedData.taggeds.length} kişi`: "Veri bulunmuyor."}\`
      
      **Detaylı Bilgilere** Bamak İçin Aşağıda Oluşan Menüyü Kullanabilirsin Bol **Taglı Üye** Çekmeler Dilerim!`)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })

  let msg = await message.channel.send({ embeds: [embeds], components: [row]})
            message.react(`${client.emojis.cache.find(x => x.name === "green")}`);
             msg.awaitMessageComponent({ filter: (component) => component.user.id === message.author.id, componentType: 'SELECT_MENU',}).then(async (interaction) => {
         
  if(interaction.values[0] == "taglilarim") {
               await interaction.deferUpdate();
            
               const embed = new MessageEmbed()
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
.setDescription(`\` • • > \` ${message.author} **Adlı Yetkilinin Taglı Üyeleri**

\` • \` ${uyeler}`)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
.setThumbnail(message.guild.iconURL({ dynamic: true }))
  
msg.edit({ embeds: [embed], components : [row] })}

            

  })
  
  }
  }    
