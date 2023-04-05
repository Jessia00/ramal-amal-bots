const { Client, Message, MessageEmbed} = require("discord.js");
const Coins = require('../../../../Global/Databases/Schemas/Coins');
const moment = require("moment");
require("moment-duration-format");
require("moment-timezone");
const Beklet = new Set();

module.exports = {
    Isim: "slots",
    Komut: ["slot", "s"],
    Kullanim: "slots <100-250000-all>",
    Aciklama: "",
    Kategori: "eco",
    Extend: true,
    
   /**
   * @param {Client} client 
   */
  onLoad: function (client) {
    Array.prototype.random = function() {
        return this[(Math.floor(Math.random()*this.length))];
      };
  },

   /**
   * @param {Client} client
   * @param {Message} message
   * @param {Array<String|Number>} args
   * @returns {Promise<void>}
   */

  onRequest: async function (client, message, args) {
    if(!coinConf.sistem) return;
    if(!kanallar.coinChat.some(x => message.channel.id == x) && !ayarlar.staff.find(x => x.id == message.member.id)) return message.channel.send(`${message.guild.emojiGöster(emojiler.Iptal)} Sadece ${kanallar.coinChat.map(x => message.guild.channels.cache.get(x)).join(",")} kanalların da oynayabilirsin.`).then(x => setTimeout(() => {
        x.delete()
        }, 5000));
    if(Beklet.has(message.author.id)) return message.channel.send(`\`Flood!\` Lütfen bir kaç saniye sonra tekrar oynamayı deneyin.`).then(x => setTimeout(() => {
        x.delete()
        }, 3000));
    let embed = new MessageEmbed().setAuthor(sistem.embed.başlık, message.guild.iconURL({dynamic: true, size: 2048})).setColor("RANDOM").setFooter(sistem.embed.altbaşlık);
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
        }, 3000));
    if(Miktar <= 0) return message.channel.send(`Göndermek istediğiniz miktar, birden küçük olamaz.`).then(x => setTimeout(() => {
        x.delete()
        }, 3000));
    if(Miktar > 250000) return message.channel.send(`Bahise en fazla \`250.000\` ${message.guild.emojiGöster(emojiler.Görev.Para)} ile girilebilir.`).then(x => setTimeout(() => {
        x.delete()
        }, 3000));
    if(Miktar < 10) return message.channel.send(`Bahise en az \`10\` ${message.guild.emojiGöster(emojiler.Görev.Para)} ile girebilirsiniz.`).then(x => setTimeout(() => {
        x.delete()
        }, 3000));
    if(Coin < Miktar) return message.channel.send(`\`Belirtiğiniz miktar kadar yeterince bakiye olmadığından dolayı bahse giremezsiniz.\``).then(x => setTimeout(() => {
        x.delete()
        }, 3000));
    let KıbrısSEHIRA = [message.guild.emojiGöster("seyfo_vis"),message.guild.emojiGöster("seyfo_heart"),message.guild.emojiGöster("seyfo_pat")];
    var SlotOne = KıbrısSEHIRA[Math.floor(Math.random() * 3)]
    var SlotTwo = KıbrısSEHIRA[Math.floor(Math.random() * 3)]
    var SlotThree = KıbrısSEHIRA[Math.floor(Math.random() * 3)]
    await Coins.updateOne({_id: message.member.id }, {$inc: { Coin: -Miktar }}).exec();
    Beklet.add(message.author.id);
    let cc = Miktar * 4;
    message.reply({content: `
\`___SLOTS___\`
  ${message.guild.emojiGöster("seyfo_slot")} ${message.guild.emojiGöster("seyfo_slot")} ${message.guild.emojiGöster("seyfo_slot")}
\`|         |\`
\`|         |\`
Belirlenen Miktar: \` ${Miktar.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} ${ayarlar.serverName} Parası \`
Kazanılacak Miktar: \` ${cc.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} ${ayarlar.serverName} Parası \``}).then(msg => {
        if (SlotOne === SlotTwo && SlotOne === SlotThree) {
        setTimeout(async () => {
            Miktar = Number(Miktar);
            let coin = Miktar * 4;
            await client.Economy.updateBalance(uye.id, Number(coin), "add", 1)
            msg.edit({content: `\`___SLOTS___\`
  ${SlotOne} ${SlotTwo} ${SlotThree}
\`|         |\`
\`|         |\`
:tada: **Tebrikler!** Bu oyunu kazandınız! 
Kazanılan Ödül: \` ${Miktar.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} ${ayarlar.serverName} Parası => [ 4x ] => +${coin.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} ${ayarlar.serverName} Parası \``});    
            Beklet.delete(message.author.id);
            message.react(message.guild.emojiGöster(emojiler.Onay))
            }, 2500);
        } else {
            setTimeout(async () => {
                let coin = Miktar * 4;
            message.react(message.guild.emojiGöster(emojiler.Iptal))
            msg.edit({content: `\`___SLOTS___\`
  ${SlotOne} ${SlotTwo} ${SlotThree}
**\`|         |\`**
**\`|         |\`**
${message.guild.emojiGöster(emojiler.Iptal)} **Kaybettin!** Bu oyunu kazanamadın!
Kaybedilen Miktar: \` -${Miktar.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} ${ayarlar.serverName} Parası \``});
            Beklet.delete(message.author.id);
            }, 2500);
        }
        });
    }
};