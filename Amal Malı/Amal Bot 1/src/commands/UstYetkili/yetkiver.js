const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const serverSettings =require('../../models/sunucuayar')
const { red } = require("../../configs/emojis.json")
const emoji = require("../../configs/emojis.json")
const moment = require("moment");
moment.locale("tr");

module.exports = {
  conf: {
    aliases: ["ytver"],
    name: "ytver",
    help: "ytver"
  },

  run: async (client, message, args, embed) => {

    if (!message.guild) return;
    let conf = await serverSettings.findOne({
      guildID: message.guild.id
  });

    if (!conf.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) {
      message.react(red)
      return
    }
    if(!["1038500297561083914", "1038500295375863859","1038759804295979040"].some(role => message.member.roles.cache.get(role)) && (!message.member.permissions.has("ADMINISTRATOR"))) return message.channel.send(`Bu Komutu Kullanabilmek İçin Yetkin Bulunmuyor.`)

    
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if (!uye) return message.reply({ content:`.yetkili @ramal/ID`});
if(message.author.id === uye.id) return message.reply({content: `Üzgünüm Kendine Bu Rolleri Veremezsin!`})
    if (message.guild.members.cache.has(uye.id) && message.member.roles.highest.position <= message.guild.members.cache.get(uye.id).roles.highest.position) return message.reply({ content:"Kendinle aynı yetkide ya da daha yetkili olan birine veremezsin!"})
     


     if (conf.redania > 0 && redania.has(message.author.id) && redania.get(message.author.id) == conf.redania)  {
        message.channel.send({ content:`${message.author} (\`${message.author.id}\`) Limiti Geçtiğin İçin Rollerini Aldım!`}).catch();
        message.member.roles.remove(["1038500297561083914", "1038500295375863859","1038759804295979040"]).catch();
        return;
    }
    
     const row = new MessageActionRow()
    .addComponents(

new MessageButton()
.setCustomId("1")
.setLabel("Alt Yönetim")
.setStyle("DANGER"),
      
new MessageButton()
.setCustomId("2")
.setLabel("Orta Yönetim")
.setStyle("DANGER"),
      
new MessageButton()
.setCustomId("3")
.setLabel("Üst Yönetim")
.setStyle("DANGER"),
);
  
let aa = new MessageEmbed()
.setDescription(`Merhabalar ${message.member.toString()},${uye} Aşağıdan Alt-Orta-Üst Yönetim Rollerini Vermek İçin Butonları Kullan!

\` 1 \` __Alt Yönetim İçin__
\` 2 \` __Orta Yönetim İçin__
\` 3 \` __Üst Yönetim İçin__ `)
.setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true }) })


 let msg = await message.channel.send({ embeds: [aa], components : [row] })


   var filter = (button) => button.user.id === message.author.id;
 let collector = await msg.createMessageComponentCollector({ filter, time: 60000 })

      collector.on("collect", async (button) => {


    if (button.customId === '1') {    
        
        row.components[0].setDisabled(true) 
        row.components[1].setDisabled(true) 
        row.components[2].setDisabled(true) 
        msg.edit({ components: [row] }); 
      button.reply(`**${uye}** Alt Yönetim Rolleri Verildi!`)
      
      uye.roles.add(["1038500301763784764","1038500307371556966"])
   
}
     if (button.customId === '2') {     
     
       row.components[0].setDisabled(true) 
        row.components[1].setDisabled(true) 
        row.components[2].setDisabled(true) 
       
        msg.edit({ components: [row] }); 
      button.reply(`**${uye}** Orta Yönetim Rolleri Verildi!`)
         uye.roles.add(["1038500299859570698","1038500306763395112","1038500307371556966","1038761927054209054","1038500305412833411"])

}
        
         if(button.customId === "3") {
        await button.deferUpdate();

        row.components[0].setDisabled(true) 
        row.components[1].setDisabled(true) 
        row.components[2].setDisabled(true) 
        msg.edit({ components: [row] }); 
      button.reply(`**${uye}** Üst Yönetim Rolleri Verildi!`)
                 uye.roles.add(["1038500296457977959","1038500304397807616","1038500305412833411","1038500306763395112","1038500307371556966","1038761927054209054"])

}
  });

if (conf.redania > 0) {
      if (!redania.has(message.author.id)) redania.set(message.author.id, 1);
      else redania.set(message.author.id, redania.get(message.author.id) + 1);
      setTimeout(() => {
        if (redania.has(message.author.id)) redania.delete(message.author.id);
      }, 1000 * 60 * 60);
    }  
}
}