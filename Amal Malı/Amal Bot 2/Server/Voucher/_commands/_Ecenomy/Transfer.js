const { Client, Message, MessageEmbed} = require("discord.js");
const Coins = require('../../../../Global/Databases/Schemas/Coins');
module.exports = {
    Isim: "transfer",
    Komut: ["coingönder","cointransfer"],
    Kullanim: "transfer <@sehira/ID> <Miktar>",
    Aciklama: "",
    Kategori: "eco",
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
    if(!coinConf.sistem) return;
    let embed = new MessageEmbed()
    let uye = message.guild.members.cache.get(message.member.id);
    let Hesap = await Coins.findById(message.member.id)
    let Coin = Hesap ? Hesap.Coin : 0
    let Gönderilen = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!Gönderilen) return message.channel.send(cevaplar.üye + ` \`${sistem.botSettings.Prefixs[0]}${module.exports.Isim} <@sehira/ID> <Miktar>\``);
    let Miktar = Number(args[1]);
    if(isNaN(Miktar)) return message.channel.send('Hata: `Lütfen miktar yerine harf girmeyin rakam kullanın.`')
    Miktar = Miktar.toFixed(0);
    if(Miktar <= 0) return message.channel.send('Hata: `Göndermek istediğiniz miktar 1 dan küçük olamaz.`');
    if(Coin < Miktar) return message.channel.send('Hata: `Maalesef yeterli bakiyen bulunamadı.`');
    await Coins.updateOne({_id: uye.id}, { $inc: { Coin: -Miktar }}, {upsert: true})
    await Coins.updateOne({_id: uye.id}, { $push: { "Transferler": { Uye: Gönderilen.id, Tutar: Miktar, Tarih: Date.now(), Islem: "Gönderilen" } }}, {upsert: true})
    await Coins.updateOne({_id: Gönderilen.id}, { $push: { "Transferler": { Uye: uye.id, Tutar: Miktar, Tarih: Date.now(), Islem: "Gelen" } }}, {upsert: true})
    await Coins.updateOne({_id: Gönderilen.id}, { $inc: { Coin: Miktar }}, {upsert: true})
    await message.react(`${message.guild.emojiGöster(emojiler.Onay)}`)
    await message.channel.send({embeds: [embed.setDescription(`${message.guild.emojiGöster(emojiler.Onay)} ${Gönderilen} üyesine başarıyla \`${Miktar}\` ${message.guild.emojiGöster(emojiler.Görev.Para)} gönderdin.`)]})
    }
};