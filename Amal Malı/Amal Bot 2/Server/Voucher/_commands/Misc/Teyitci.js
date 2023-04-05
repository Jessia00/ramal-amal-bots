const { Client, Message, MessageEmbed } = require("discord.js");
const Users = require('../../../../Global/Databases/Schemas/Client.Users');
const moment = require("moment");
const { genEmbed } = require("../../../../Global/Init/Embed");
require("moment-duration-format");
module.exports = {
    Isim: "teyitci",
    Komut: ["teyitci", "kayıteden"],
    Kullanim: "profil <@user/ID>",
    Aciklama: "Belirlenen kişinin veya kullanan kişinin sunucu içerisindeki detaylarını ve discord içerisindeki bilgilerini aktarır.",
    Kategori: "diğer",
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
  let kullanici = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.member;
  if(!kullanici) return message.channel.send(cevaplar.üyeyok);;
  let uye = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.member
  if(!uye) return message.channel.send(cevaplar.üyeyok);
  if(kullanici.bot) return message.channel.send(`${cevaplar.prefix} \`Kullanıcı BOT\` belirtilen kullanıcı bot olduğu için işlem iptal edildi.`);
  uye = message.guild.members.cache.get(kullanici.id)
  kullanici = message.guild.members.cache.get(uye.id)
  let yetkiliKullanim = await Users.findOne({ _id: uye.id })
  let cezapuanoku = await message.guild.members.cache.get(uye.id).cezaPuan() 
  let platform = { web: '`İnternet Tarayıcısı` `🌍`', desktop: '`PC (App)` `💻`', mobile: '`Mobil` `📱`' }
  let bilgi;
  let uyesesdurum;
  let yetkiliDurum;
  const embed = new genEmbed().setAuthor(kullanici.user.tag, kullanici.user.avatarURL({dynamic: true, size: 2048})).setThumbnail(kullanici.user.avatarURL({dynamic: true, size: 2048}))
.addField(`**Teyit Bilgisi**`, 
`\`•\` ID: \`${kullanici.id}\`
\`•\` Profil: ${kullanici}
\`•\` Katılım Sırası: \`${(message.guild.members.cache.filter(a => a.joinedTimestamp <=uye.joinedTimestamp).size).toLocaleString()}/${(message.guild.memberCount).toLocaleString()}\`
${yetkiliKullanim ? yetkiliKullanim.Registrant ? `\`•\` Kayıt Eden Yetkili: ${message.guild.members.cache.get(yetkiliKullanim.Registrant) ? message.guild.members.cache.get(yetkiliKullanim.Registrant)  : `<@${yetkiliKullanim.Registrant}>`} `:"" :""}`)





message.channel.send({embeds: [embed]});



    }
};