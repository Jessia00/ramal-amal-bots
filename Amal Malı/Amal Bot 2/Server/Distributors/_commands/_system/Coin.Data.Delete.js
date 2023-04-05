const { Client, Message } = require("discord.js");
const Kullanıcı = require('../../../../Global/Databases/Schemas/Client.Users');
const { genEmbed } = require("../../../../Global/Init/Embed");
const Coins = require('../../../../Global/Databases/Schemas/Coins');
module.exports = {
    Isim: "coinsıfırla",
    Komut: ["cointemizle, coinsıfırla, coindelete"],
    Kullanim: "coin-temizle",
    Aciklama: "Belirtilen ceza numarasının bütün bilgilerini gösterir.",
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
    if(!coinConf.sistem) return;
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || await client.getUser(args[0])
    if(!uye) return message.channel.send(`${message.guild.emojiGöster(emojiler.Iptal)} Bir üye belirtmelisin.`)
    let Coin = await Coins.findById(uye.id)
    if(!await Kullanıcı.findOne({ _id: uye.id })) return message.channel.send(`${cevaplar.prefix} ${uye} profiline sahip üyenin sunucu üzerinde verisi bulunamadı.`);
    await uye.Delete()
    await Coins.deleteOne({Coin: uye.id})
    await Kullanıcı.deleteOne({Coin: uye.id});
    await message.channel.send({embeds: [new genEmbed().setDescription(`${message.guild.emojiGöster(emojiler.Onay)} ${uye} üyesinin coin bilgileri sunucudan temizlendi.`)]})
    await message.react(message.guild.emojiGöster(emojiler.Onay))
    }
};