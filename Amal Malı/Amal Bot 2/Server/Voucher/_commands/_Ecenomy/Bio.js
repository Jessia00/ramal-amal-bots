const { Client, Message, MessageEmbed} = require("discord.js");
const Coins = require('../../../../Global/Databases/Schemas/Coins');
const Users = require('../../../../Global/Databases/Schemas/Client.Users');
const moment = require("moment");
require("moment-duration-format");
require("moment-timezone");

module.exports = {
    Isim: "biyografi",
    Komut: ["biography", "bio"],
    Kullanim: "bio <5-100> <Kaldırmak İçin: - >",
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
    let embed = new MessageEmbed().setColor("RANDOM");
    let uye = message.guild.members.cache.get(message.member.id);
    let Hesap = await Coins.findById(uye.id)
    let Coin = Hesap ? Hesap.Coin : 0
    if(args[0] === "-") {
        if(Hesap) {
            if(Hesap.Bio) {
                await Coins.updateOne({_id: uye.id}, { $inc: {Coin: coinConf.BioCoin/2}, $set: { "Bio" : new String }}, {upsert: true}).exec()
                message.react(emojiler.Onay)
                return message.channel.send(`${message.guild.emojiGöster(emojiler.Onay)} başarıyla \`${Hesap.Bio}\` olarak ayarlanmış biyografi kaldırıldı ve ekstra olarak \`+${coinConf.BioCoin/2}\` ${message.guild.emojiGöster(emojiler.Görev.Para)} geri iade edildi. `).then(x => setTimeout(() => {
x.delete()
}, 7500))
                
            }
        }
    }
    let bio = args.splice(0).join(" ")
    if(Coin < coinConf.BioCoin) return message.channel.send(` Biyografi değiştirmek için yeterli bakiye bulunamadı. (\`Gerekli ${coinConf.BioCoin}\` ${message.guild.emojiGöster(emojiler.Görev.Para)})`).then(x => setTimeout(() => {
x.delete()
}, 7500));
    if(!bio) return message.channel.send(`\`Lütfen biyografinizi giriniz mininum 5 karakterden oluşmalı.\``).then(x => setTimeout(() => {
x.delete()
}, 7500));
    if(bio.length > 100) return message.channel.send(` \`100 karakterden fazla olamaz lütfen daha az karakter giriniz.\``).then(x => setTimeout(() => {
x.delete()
}, 7500));
    if(bio.length < 5) return message.channel.send(`\`5 Karakterden daha küçük olamaz lütfen geçerli bir biyografi giriniz.\``);
    await Coins.updateOne({_id: uye.id}, { $inc: {Coin: -coinConf.BioCoin}, $set: { "Bio": bio }}, {upsert: true}).exec()
    message.react(message.guild.emojiGöster(emojiler.Onay)) 
    message.channel.send({embeds: [embed.setDescription(`${message.guild.emojiGöster(emojiler.Onay)} \`${coinConf.BioCoin}\` ${message.guild.emojiGöster(emojiler.Görev.Para)} karşılığı, başarıyla biyografin \`${bio}\` olarak ayarlandı.`)]}).then(x => setTimeout(() => x.delete(), 5000))
}};

