const { Client, Message, MessageEmbed} = require("discord.js");
const Coins = require('../../../../Global/Databases/Schemas/Coins');

module.exports = {
    Isim: "günlük",
    Komut: ["günlükcoin","maaş","daily"],
    Kullanim: "günlük",
    Aciklama: "24 Saatte bir belirli bir coin ödülü alırsınız.",
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
    let uye = message.guild.members.cache.get(message.member.id);
    let Hesap = await Coins.findById({_id: message.member.id}) 
    if(Hesap && Hesap.GunlukCoin) {
            let yeniGün = Hesap.GunlukCoin + (1*24*60*60*1000);
            if (Date.now() < yeniGün) {
                message.react(message.guild.emojiGöster(emojiler.Iptal)) 
                return message.reply({content: `${message.guild.emojiGöster(emojiler.Iptal)} Tekrardan günlük ödül alabilmen için **${kalanzaman(yeniGün)}** beklemen gerekiyor.`, ephemeral: true }).then(x => setTimeout(() => {
                    x.delete()
                    }, 5000));
            }
        }
    let Günlük = Math.random();
    Günlük = Günlük*(500-200);
    Günlük = Math.floor(Günlük)+200
    await Coins.updateOne({ _id: message.member.id }, { $set: { "GunlukCoin": Date.now() }, $inc: { "Coin": Günlük } }, {upsert: true}).exec();
    message.react(message.guild.emojiGöster(emojiler.Onay)) 
    message.reply({content: `${message.guild.emojiGöster(emojiler.Onay)} ${uye} başarıyla \`${Günlük} Coin\` ${message.guild.emojiGöster(emojiler.Görev.Para)} ödülünü aldın. **24 Saat** sonra tekrardan ödülünü alabileceksin.`, ephemeral: true })
   }
};