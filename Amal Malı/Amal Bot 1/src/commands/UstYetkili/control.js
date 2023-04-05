const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { star, kirmiziok } = require("../../configs/emojis.json")
let ayar = require("../../configs/sunucuayar.json"); 
let sunucu = require("../../configs/settings.json");  
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    conf: {
      aliases: ["tgcontrol", "tgkontrol"],
      name: "tgkontrol",
      help: "tgkontrol"
    },
  
    run: async (client, message, args, durum, kanal) => {

    if(!ayar.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) 
    { 
    message.reply({ content:`Yetkin bulunmamakta dostum.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
 
       let guild = client.guilds.cache.get(sunucu.guildID);
       await guild.members.fetch();

      
       
       let taglilar = message.guild.members.cache.filter(s => s.user.username.includes(ayar.tag) && !s.roles.cache.has(ayar.ekipRolu))
       let taglilars = message.guild.members.cache.filter(s => s.user.username.includes(ayar.tags) && !s.roles.cache.has(ayar.ekipRolu))
       let taglilarss = message.guild.members.cache.filter(s => s.user.username.includes(ayar.tags2) && !s.roles.cache.has(ayar.ekipRolu))
       let taglilarssss = message.guild.members.cache.filter(s => s.user.username.includes(ayar.tags3) && !s.roles.cache.has(ayar.ekipRolu))
       let taglilarsssss = message.guild.members.cache.filter(s => s.user.username.includes(ayar.tags4) && !s.roles.cache.has(ayar.ekipRolu))
       let taglilarssssss = message.guild.members.cache.filter(s => s.user.username.includes(ayar.tags5) && !s.roles.cache.has(ayar.ekipRolu))
       let taglilarsssssss = message.guild.members.cache.filter(s => s.user.username.includes(ayar.tags6) && !s.roles.cache.has(ayar.ekipRolu))
       let taglilarssssssss = message.guild.members.cache.filter(s => s.user.username.includes(ayar.tags7) && !s.roles.cache.has(ayar.ekipRolu))
       let taglilarsssssssss = message.guild.members.cache.filter(s => s.user.username.includes(ayar.etikets) && !s.roles.cache.has(ayar.ekipRolu)) 
       let ramalcim = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)

const row = new MessageActionRow()
.addComponents(
new MessageButton().setStyle('DANGER').setLabel('Family Rol Dağıt').setCustomId('tagrol').setEmoji(`${client.emojis.cache.find(x => x.name === "bir")}`),
new MessageButton().setStyle('PRIMARY').setLabel('Kayıtsız Rol Dağıt').setCustomId('kayıtsızdagit').setEmoji(`${client.emojis.cache.find(x => x.name === "iki")}`),
);

let ramal = new MessageEmbed()
.setDescription(`
🎉 Kontrol Paneline Hoş Geldiniz Aşağədaki Family Ve Kayıtsız Butonuna Basarak Rolsüzlere Kayıtsız Tagı olup rolü olmayanlarada rol verdire bilirsiniz.
`)

.addFields(
{ name: "**Taglı Rol**", value: `
\`\`\`diff
Family Rol İçin butona Tıkla
\`\`\`
`, inline: true },
{ name: "**Kayıtsız Rol**", value: `
\`\`\`css
${ramalcim.size} kişi
\`\`\`
`, inline: true }
)

.setColor("RANDOM")
.setFooter({ text: message.author.tag, iconURL: message.author.avatarURL()})
.setTimestamp()
.setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
 
 
  let msg = await message.channel.send({ embeds: [ramal], components: [row]})
 
    var filter = (button) => button.user.id === message.author.id;
   
    let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })

      collector.on("collect", async (button) => {

    if (button.customId === 'ecdagit') {
 
    button.reply({ content:`
Etkinlik/Çekiliş rolü olmayan ${ramal.size} kullanıcıya etkinlik, çekiliş rolleri verildi !`})
    }


    if (button.customId === 'tagrol') {
 
      let taglilar = message.guild.members.cache.filter(s => s.user.username.includes(ayar.tag) && !s.roles.cache.has(ayar.ekipRolu))
      let taglilars = message.guild.members.cache.filter(s => s.user.username.includes(ayar.tags) && !s.roles.cache.has(ayar.ekipRolu))
      let taglilarss = message.guild.members.cache.filter(s => s.user.username.includes(ayar.tags2) && !s.roles.cache.has(ayar.ekipRolu))
      let taglilarssss = message.guild.members.cache.filter(s => s.user.username.includes(ayar.tags3) && !s.roles.cache.has(ayar.ekipRolu))
      let taglilarsssss = message.guild.members.cache.filter(s => s.user.username.includes(ayar.tags4) && !s.roles.cache.has(ayar.ekipRolu))
      let taglilarssssss = message.guild.members.cache.filter(s => s.user.username.includes(ayar.tags5) && !s.roles.cache.has(ayar.ekipRolu))
      let taglilarsssssss = message.guild.members.cache.filter(s => s.user.username.includes(ayar.tags6) && !s.roles.cache.has(ayar.ekipRolu))
      let taglilarssssssss = message.guild.members.cache.filter(s => s.user.username.includes(ayar.tags7) && !s.roles.cache.has(ayar.ekipRolu))
      let taglilarsssssssss = message.guild.members.cache.filter(s => s.user.username.includes(ayar.etikets) && !s.roles.cache.has(ayar.ekipRolu))

    button.reply({ content:`
Tagı olup rolü olmayan ${taglilar.size} kullanıcıya rol verildi.
Tagı olup rolü olmayan ${taglilars.size} kullanıcıya rol verildi.
Tagı olup rolü olmayan ${taglilarss.size} kullanıcıya rol verildi.
Tagı olup rolü olmayan ${taglilarssss.size} kullanıcıya rol verildi.
Tagı olup rolü olmayan ${taglilarsssss.size} kullanıcıya rol verildi.
Tagı olup rolü olmayan ${taglilarssssss.size} kullanıcıya rol verildi.
Tagı olup rolü olmayan ${taglilarsssssss.size} kullanıcıya rol verildi.
Tagı olup rolü olmayan ${taglilarssssssss.size} kullanıcıya rol verildi.
Tagı olup rolü olmayan ${taglilarsssssssss.size} kullanıcıya rol verildi.
Tag Rolü verilen kullanıcılar;
${taglilar.map(x => x || "Rolü olmayan Kullanıcı bulunmamaktadır.")}`})

    message.guild.members.cache.filter(s => s.user.username.includes(ayar.tag) && !s.roles.cache.has(ayar.ekipRolu)).map(x=> x.roles.add(ayar.ekipRolu))
    message.guild.members.cache.filter(s => s.user.username.includes(ayar.tags) && !s.roles.cache.has(ayar.ekipRolu)).map(x=> x.roles.add(ayar.ekipRolu))
    message.guild.members.cache.filter(s => s.user.username.includes(ayar.tags2) && !s.roles.cache.has(ayar.ekipRolu)).map(x=> x.roles.add(ayar.ekipRolu))
    message.guild.members.cache.filter(s => s.user.username.includes(ayar.tags3) && !s.roles.cache.has(ayar.ekipRolu)).map(x=> x.roles.add(ayar.ekipRolu))
    message.guild.members.cache.filter(s => s.user.username.includes(ayar.tags4) && !s.roles.cache.has(ayar.ekipRolu)).map(x=> x.roles.add(ayar.ekipRolu))
    message.guild.members.cache.filter(s => s.user.username.includes(ayar.tags5) && !s.roles.cache.has(ayar.ekipRolu)).map(x=> x.roles.add(ayar.ekipRolu))
    message.guild.members.cache.filter(s => s.user.username.includes(ayar.tags6) && !s.roles.cache.has(ayar.ekipRolu)).map(x=> x.roles.add(ayar.ekipRolu))
    message.guild.members.cache.filter(s => s.user.username.includes(ayar.tags7) && !s.roles.cache.has(ayar.ekipRolu)).map(x=> x.roles.add(ayar.ekipRolu))
    message.guild.members.cache.filter(s => s.user.username.includes(ayar.etikets) && !s.roles.cache.has(ayar.ekipRolu)).map(x=> x.roles.add(ayar.ekipRolu))                
    }

    if (button.customId === 'kayıtsızdagit') {
 
    let ramalcim = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)

    button.reply({ content:`
Kayıtsız rolü olmayan ${ramalcim.size} kullanıcıya kayıtsız rolü verildi !

Kayıtsız Rolü verilen kullanıcılar;
${ramalcim.map(x => x || "Rolü olmayan Kullanıcı bulunmamaktadır.")} `})

    message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0).map(x=> x.roles.add(ayar.unregRoles))

    }

  });
}
}
