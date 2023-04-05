const { Client, Message, MessageEmbed} = require("discord.js");
const Coins = require('../../../../Global/Databases/Schemas/Coins');
const moment = require("moment");
require("moment-duration-format");
require("moment-timezone");
module.exports = {
    Isim: "coinekle",
    Komut: ["addcoin"],
    Kullanim: "günlük",
    Aciklama: "24 Saatte bir belirli bir coin ödülü alırsınız.",
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
   * @param {Array<String|Number>} args
   * @returns {Promise<void>}
   */

  onRequest: async function (client, message, args) {
    if(!ayarlar.staff.includes(message.member.id) && !message.member.permissions.has('ADMINISTRATOR') && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku))) return message.channel.send(cevaplar.noyt);
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!uye) return message.channel.send(cevaplar.üye + ` \`${sistem.botSettings.Prefixs[0]}${module.exports.Isim} <@sehira/ID> <Miktar>\``);
    let Miktar = parseInt(args[1]);
    if(isNaN(Miktar)) return message.channel.send(`${cevaplar.prefix} Lütfen bir miktar belirtmelisin! __Örn:__ \`${sistem.botSettings.Prefixs[0]}${module.exports.Isim} <@sehira/ID> <Miktar>\``);
    await Coins.updateOne({ _id: uye.id }, { $inc: { "Coin": Miktar } }, {upsert: true}).exec();
    message.react(message.guild.emojiGöster(emojiler.Onay)).then(x => setTimeout(() => message.delete(), 10000))
   }
};

