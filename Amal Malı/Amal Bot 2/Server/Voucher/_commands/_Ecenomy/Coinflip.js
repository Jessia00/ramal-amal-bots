const { Client, Message, MessageEmbed} = require("discord.js");
const Coins = require('../../../../Global/Databases/Schemas/Coins');
const moment = require("moment");
require("moment-duration-format");
require("moment-timezone");
const Beklet = new Set();

module.exports = {
    Isim: "coinflip",
    Komut: ["cf", "bahis"],
    Kullanim: "coinflip <100-250000-all>",
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
    if(!global.kanallar.coinChat.some(x => message.channel.id == x) && ayarlar.staff.find(x => x != message.member.id)) return message.channel.send(`${message.guild.emojiGöster(emojiler.Iptal)} Sadece ${kanallar.coinChat.map(x => message.guild.channels.cache.get(x)).join(",")} kanalların da oynayabilirsin.`).then(x => setTimeout(() => x.delete(), 3500))
    if(Beklet.has(message.author.id)) return message.channel.send(`\`Flood!\` Lütfen bir kaç saniye sonra tekrar oynamayı deneyin.`).then(x => setTimeout(() => {
        x.delete()
        }, 7500));
    let embed = new MessageEmbed().setColor("RANDOM").setFooter(sistem.embed.altbaşlık);
    let uye = message.guild.members.cache.get(message.member.id);
    let Hesap = await Coins.findById(message.member.id)
    let Coin = Hesap ? Hesap.Coin : 0
    let Miktar = Number(args[0]);
    if(args[0] == "all") {
        if(Coin >= 250000) Miktar = 250000
        if(Coin < 250000) Miktar = Coin
        if(Coin <= 0) Miktar = 10
    }
    Miktar = Miktar.toFixed(0);
    if(isNaN(Miktar)) return message.channel.send(`Miktar yerine harf kullanmamayı tavsiye ederim.`).then(x => setTimeout(() => {
        x.delete()
        }, 7500));
    if(Miktar <= 0) return message.channel.send(`Göndermek istediğiniz miktar, birden küçük olamaz.`).then(x => setTimeout(() => {
        x.delete()
        }, 7500));
    if(Miktar > 250000) return message.channel.send(`$Bahise en fazla \`250.000\` ${message.guild.emojiGöster(emojiler.Görev.Para)} ile girilebilir.`).then(x => setTimeout(() => {
        x.delete()
        }, 7500));
    if(Miktar < 10) return message.channel.send(`Bahise en az \`10\` ${message.guild.emojiGöster(emojiler.Görev.Para)} ile girebilirsiniz.`).then(x => setTimeout(() => {
        x.delete()
        }, 7500));
    if(Coin < Miktar) return message.channel.send(`\`Belirtiğiniz miktar kadar yeterince bakiyen olmadığından dolayı bahse giremezsiniz.\``).then(x => setTimeout(() => {
        x.delete()
        }, 7500));
    await Coins.updateOne({_id: message.member.id }, {$inc: { Coin: -Miktar }}).exec();
    Beklet.add(message.author.id);
    message.reply({content:`${message.guild.emojiGöster(emojiler.Terfi.icon)} \`${Miktar} Coin\` ${message.guild.emojiGöster(emojiler.Görev.Para)} ile bahis oynadın, bahsin döndürülüyor... ${message.guild.emojiGöster(emojiler.Görev.Cf)}`}).then(msg => {
        setTimeout(async () => {
            let rnd = Math.floor(Math.random() * 2), result;
            if(rnd == 1){
                result = "kazandın";
                Miktar = Number(Miktar);
                let coin = Miktar + Miktar;
                await Coins.updateOne({_id: message.member.id }, {$inc: { Coin: Number(coin)}}).exec();
            }
            else result = "kaybettin";
            message.react(rnd == 1 ?  `${message.guild.emojiGöster(emojiler.Görev.Win)}` : `${message.guild.emojiGöster(emojiler.Görev.Lose)}`)
            msg.edit({content: `${message.guild.emojiGöster(emojiler.Görev.Cf)} \`${Miktar} Coin\` ${message.guild.emojiGöster(emojiler.Görev.Para)} ile bahis oynadın ve ${rnd == 1 ?  ` \`${Miktar + Miktar} Coin\` ${message.guild.emojiGöster(emojiler.Görev.Para)}` : `\`Oynadığın miktarı\``} **${result}**!`});    
            Beklet.delete(message.author.id);
        }, 4000);
    });

    }
};

