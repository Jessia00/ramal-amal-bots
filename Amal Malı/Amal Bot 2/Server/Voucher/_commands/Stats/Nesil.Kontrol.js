const { MessageEmbed, MessageAttachment, MessageActionRow, MessageButton, MessageSelectMenu} = Discord = require("discord.js");
const Canvas = require("canvas");
const Stats = require('../../../../Global/Databases/Schemas/Plugins/Client.Users.Stats')
const Upstaff = require('../../../../Global/Databases/Schemas/Plugins/Client.Users.Staffs');
const moment = require('moment');
const { genEmbed } = require("../../../../Global/Init/Embed");
const ms = require('ms');
require('moment-duration-format');
require('moment-timezone');
module.exports = {
    Isim: "nesilkontrol",
    Komut: ["nesilkontrol","nesilkontrol","nesilkontrol"],
    Kullanim: "nesilkontrol <@user/ID>",
    Aciklama: "Belirlenen üye veya kendinizin istatistik bilgilerine bakarsınız",
    Kategori: "stat",
    Extend: false,
    
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
    let _stats = await Stats.find({guildID: message.guild.id}) 
    if(!_stats) return message.reply({content: `Bu sunucuda herhangi bir istatistik verisi bulunamadı.`});
    let text = ''
    _stats.filter(x => message.guild.members.cache.get(x.userID) && x.oldVoiceStats).map(async (data) => {
        let uye = message.guild.members.cache.get(data.userID)
        if(uye && !roller.kayıtsızRolleri.some(x => uye.roles.cache.has(x))) {
            let ikiHaftalikSesToplam = 0
            data.oldVoiceStats.forEach(c => ikiHaftalikSesToplam += c);
            let nesils = [
                {id: roller.nesilon, hours: "1s"},
                {id: roller.nesildokuz, hours: "3h"},
                {id: roller.nesilsekiz, hours: "5h"},
                {id: roller.nesilyedi, hours: "8h"},
                {id: roller.nesilaltı, hours: "11h"},
                {id: roller.nesilbeş, hours: "15h"},
                {id: roller.nesildört, hours: "20h"},
                {id: roller.nesilüç, hours: "25h"},
                {id: roller.nesiliki, hours: "30h"},
                {id: roller.nesilbir, hours: "35h"},
               ]
   
               
               if(parseInt(ikiHaftalikSesToplam) < ms("3h")) {
                 let rolamkçocu = roller.nesilon
                 if(!uye.roles.cache.has(rolamkçocu)) {
                    uye.roles.add(rolamkçocu)
                    text += `${uye.user.tag} (<@&${rolamkçocu}>)\n`
                 }
                 let kalkcakrolamk = []
                 let filter = nesils.filter(x => x.id != rolamkçocu).forEach(x => {
                   kalkcakrolamk.push(x)
                 })
                 if(kalkcakrolamk && kalkcakrolamk.length > 0) uye.roles.remove(kalkcakrolamk).catch(err => {})
               } else {
                 let _next = nesils.find(x => ms(x.hours) > parseInt(ikiHaftalikSesToplam))
                 if(_next) {
                   let kaltakorospuçocurolleri = []
                   let _own = nesils[nesils.indexOf(_next) - 1]
                   nesils.map(x => kaltakorospuçocurolleri.push(x.id))
                
                   if(!uye.roles.cache.has(_own.id)) {
                    let newRoles = []
                   uye.roles.cache.filter(x => !kaltakorospuçocurolleri.includes(x.id)).map(x => newRoles.push(x.id))
                   if(_own && message.guild.roles.cache.get(_own.id)) {
                     newRoles.push(_own.id)
                   }
                    uye.roles.set(newRoles)
                    text += `${uye.user.tag} (<@&${_own.id}>)\n`   
                  } 
                  
                 } else {
                   let nesilcik = roller.nesilbir
                   if(!uye.roles.cache.has(nesilcik)) {
                    let kaltakorospuçocurolleri = []
                    nesils.map(x => kaltakorospuçocurolleri.push(x.id))
                     let newRoles = []
                    uye.roles.cache.filter(x => !kaltakorospuçocurolleri.includes(x.id)).map(x => newRoles.push(x.id))
                    newRoles.push(nesilcik)
                    uye.roles.set(newRoles)
                    text += `${uye.user.tag} (<@&${nesilcik}>)\n`  
                   }
                 }
               }
        }
    })

    let load = await message.reply({embeds: [new genEmbed().setDescription(`**${message.guild.name}** sunucusunda nesil kontrolü yapılıyor. Lütfen bekleyin...`)]})
    load.edit({embeds: [new genEmbed().setDescription(`Başarıyla anlık olarak **${message.guild.name}** sunucusunun tüm nesil üyeleri senkronize edildi ve dağıtılmaya başlandı.

**Aşağıda verilen nesiller listelenmektedir**:
${text ? text : `Herkes nesiline sahip.`}`)]}).catch(err => {
        const arr = Discord.Util.splitMessage(text, { maxLength: 1950, char: "\n" });
        arr.forEach(element => {
            message.reply({embeds: [new genEmbed().setDescription(`${element}`)]});
        });
    }).then(x => {
      message.react(message.guild.emojiGöster(emojiler.Onay)).catch(err => {})
      setTimeout(() => {
        x.delete().catch(err => {})
      }, 12500)
    })
  }
};
