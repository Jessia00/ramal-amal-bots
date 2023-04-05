const { MessageEmbed } = require('discord.js')
const serverSettings =require('../../models/sunucuayar')
const { red } = require("../../configs/emojis.json")
const emoji = require("../../configs/emojis.json")
const moment = require("moment");
moment.locale("tr");

module.exports = {
  conf: {
    aliases: ["say"],
    name: "say",
    help: "say"
  },

  run: async (client, message, args, embed) => {

    if (!message.guild) return;
    let conf = await serverSettings.findOne({
      guildID: message.guild.id
  });

    if(!conf.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) 
    {
      message.react(red)
      return
    }
    let Tag = conf.tag
    let etiket = conf.etikets 

    var takviye = (message.guild.premiumSubscriptionCount)
    var takviyesayı = (message.guild.premiumTier)
    var TotalMember = (message.guild.memberCount)
    var AktifMember = (message.guild.members.cache.filter(m => m.presence && m.presence.status !== "offline").size)
    let tag = `${(message.guild.members.cache.filter(b => b.roles.cache.has("1062832796340588545")).size)}`
    var sesli = (message.guild.members.cache.filter((x) => x.voice.channel).size)

    const ramal = new MessageEmbed()
    .setDescription(`<t:${Math.floor(Date.now() / 1000)}:R> **Tarihli Sunucu Verisi**
  
  \` ❯ \` Sunucumuzda şuanda toplam \`${TotalMember}\` kişi bulunmakta.
  \` ❯ \` Sunucumuzda şuan aktif \`${AktifMember}\` kişi bulunmakta.
  \` ❯ \` Toplam taglı sayısı \`${tag}\` kişi.
  \` ❯ \` Sunucumuzda toplam \`${takviye}\` boost bulunmakta.
  \` ❯ \` Sesli sohbetlerde toplam \`${sesli}\` kişi bulunmakta
  `)
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
      message.reply({ embeds: [ramal]});
            
  },
  };

function rakam(sayi) {
  var basamakbir = sayi.toString().replace(/ /g, "     ");
  var basamakiki = basamakbir.match(/([0-9])/g);
  basamakbir = basamakbir.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase();
  if (basamakiki) {
    basamakbir = basamakbir.replace(/([0-9])/g, d => {
      return {
        '0': `${emoji.sifir}`,
        '1': `${emoji.bir}`,
        '2': `${emoji.iki}`,
        '3': `${emoji.uc}`,
        '4': `${emoji.dort}`,
        '5': `${emoji.bes}`,
        '6': `${emoji.alti}`,
        '7': `${emoji.yedi}`,
        '8': `${emoji.sekiz}`,
        '9': `${emoji.dokuz}`
      }
      [d];
    })
  }
  return basamakbir;
}