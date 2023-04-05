const { Client, Message, MessageEmbed} = require("discord.js");
const Coins = require('../../../../Global/Databases/Schemas/Coins');

module.exports = {
    Isim: "mağaza",
    Komut: ["coinmağazası","coinmarket","market"],
    Kullanim: "mağaza",
    Aciklama: "Coin harcamalarını bu komut ile yapılabilir.",
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
    let embed = new MessageEmbed().setFooter({text : sistem.embed.altbaşlık}).setColor("RANDOM");
    let embed2 = new MessageEmbed().setFooter({text : sistem.embed.altbaşlık}).setColor("RANDOM");
    let embed3 = new MessageEmbed().setFooter({text : sistem.embed.altbaşlık}).setColor("RANDOM");
    let uye = message.guild.members.cache.get(message.member.id); 
    var filter = msj => msj.author.id === message.author.id && msj.author.id !== client.user.id;
    let Hesap = await Coins.findById(message.member.id)
    let Coin = Hesap ? Hesap.Coin : 0
    coinConf.Ürünler.forEach(x => {
embed.addField(`${message.guild.emojiGöster(x.UrunEmoji) ? message.guild.emojiGöster(x.UrunEmoji) ? message.guild.emojiGöster(x.UrunEmoji) : message.guild.emojiGöster(x.UrunEmoji) : message.guild.emojiGöster(emojiler.Tag)} ${x.UrunIsmi} (\`#${x.Id}\`)`,`
Ürün Fiyatı: \`${x.UrunFiyat}\` ${message.guild.emojiGöster(emojiler.Görev.Para)} ${x.Rol ? `\nÜrün Rolü: \`${x.RolID ? message.guild.roles.cache.get(x.RolID) ? message.guild.roles.cache.get(x.RolID).name : "@Rol Bulunamadı!" : "@Rol Bulunamadı"}\` ` : ""}${x.UrunTuru === "Rozet" ? `\nRozet: \`${x.UrunTuru === "Rozet" ? "✅": ""}\`` : ``}
${x.UrunDetay}`, true)})

    embed.setDescription(`\n${message.guild.emojiGöster(emojiler.market)} \`${sistem.SERVER.Name} Mağazasına hoş geldin\` ${uye}\`, \nBurada kendine çeşitli eşyalar ve sunucumuz için işine yarayabilecek belirli özelliklerden satın alabilirsin.\`\n
    ${message.guild.emojiGöster(emojiler.Terfi.icon)} **Mağaza (\`Bakiye: ${Coin}\` ${message.guild.emojiGöster(emojiler.Görev.Para)}**)`).addField(`${message.guild.emojiGöster(emojiler.Terfi.icon)} Ürün nasıl satın alabilirim?`,`Aşağıda \`30 Saniye\` içerisinde sohbet kutucuğuna ürünün \`ID\` numarasını girerek satın alabilirsin.`)
    let msg = await message.channel.send({embeds: [embed]}).then(async m => { 
      await m.react('💸')
      return m;
    })
    // let tepki = await msg.awaitReactions((reaction, user) => user.id == message.author.id, { errors: ["time"], max: 1, time: 30000 }).then(coll => coll.first()).catch(err => {  msg.reactions.removeAll(); return; });
   
    // if(!tepki) return;
      if (true) { 
        let satinal = await message.channel.send(` Merhaba, satın almak istediğin ürünün \`#ID\` numarasını girer misiniz?`)
        const msg_filter = m => m.author.id === message.author.id;
    message.channel.awaitMessages({
    filter: msg_filter,
    errors: ["time"],
    max: 1,
  time:15000})
    .then(async sehira => { 
          let ürünid = sehira.first().content
          let alıncakürün = coinConf.Ürünler[coinConf.Ürünler.indexOf(coinConf.Ürünler.find(x => x.Id == ürünid))]
          if(!alıncakürün) {
            msg = await msg.reactions.removeAll();
            satinal.delete();
            msg.delete({timeout: 30000});
            return;
          } else {
            satinal.delete();
            let satınalma = await message.channel.send(`${message.guild.emojiGöster(emojiler.Terfi.icon)} **#${alıncakürün.Id}** numaralı \`${alıncakürün.UrunIsmi}\` isimli ürünü \`${alıncakürün.UrunFiyat}\` ${message.guild.emojiGöster(emojiler.Görev.Para)} fiyatına satın almak istiyor musun? (__Evet__/__Hayır__)`)
            message.channel.awaitMessages({ errors: ["time"], max: 1, time: 10000})
            .then(async sehirasatinal => { 
              if(sehirasatinal.first().content.toLowerCase() === "hayır" || sehirasatinal.first().content.toLowerCase() === "Hayır") {
                msg.reactions.removeAll();
                message.channel.send(`${message.guild.emojiGöster(emojiler.Onay)} \`${alıncakürün.UrunIsmi}\` isimli ürünü satın alma işlemi iptal edildi.`).then(x => { x.delete({timeout: 5000})});
                satınalma.delete()
              };
              if(sehirasatinal.first().content.toLowerCase() === "evet" || sehirasatinal.first().content.toLowerCase() === "Evet") { 
                if(Coin >= alıncakürün.UrunFiyat) {
                  if(!alıncakürün.Extra) {
                    let KontrolEt = await Coins.findById({_id: uye.id})
                    if(KontrolEt && KontrolEt.Envanter && KontrolEt.Envanter.find(x => x.UrunID == alıncakürün.Id)) { 
                      msg.reactions.removeAll();
                      satınalma.delete()
                      return message.channel.send('Hata `Önceden bu ürünü satın almışsın tekrardan satın alamazsın.`').then(x => x.delete({timeout: 7500})); 
                    };
                  }
                  if(alıncakürün.Rol) {
                    if(uye.roles.cache.has(alıncakürün.RolID)) return message.channel.send(`Hata: \`${alıncakürün.UrunIsmi}\` isimli ürünün rolü zaten üzeriniz de mevcut tekrardan rol alma işlemi yapamazsınız!`).then(x => {
                      msg.reactions.removeAll();
                      x.delete({timeout: 5000})
                      satınalma.delete()
                    });
                    if(alıncakürün.RolID) await uye.roles.add(alıncakürün.RolID);
                    message.channel.send({embeds: [embed3.setDescription(`${message.guild.emojiGöster(emojiler.Konfeti)} **${alıncakürün.UrunIsmi}** isimli ürünü satın alarak, ${alıncakürün.RolID ? message.guild.roles.cache.get(alıncakürün.RolID) ? message.guild.roles.cache.get(alıncakürün.RolID) : "@Rol Bulunamadı" : "@Rol Bulunamadı"} adlı rol üstüne eklendi.`)]})
                  }
                  await Coins.updateOne({_id: uye.id}, { $inc: { Coin: -alıncakürün.UrunFiyat }}, {upsert: true})
                  await Coins.updateOne({_id: uye.id}, { $push: { "Envanter": {UrunID: alıncakürün.Id, UrunEmoji: alıncakürün.UrunEmoji, UrunIsmi: alıncakürün.UrunIsmi, UrunFiyat: alıncakürün.UrunFiyat, UrunTuru: alıncakürün.UrunTuru ? alıncakürün.UrunTuru : "Normal", Sat: alıncakürün.Sat, Tarih: Date.now() }}}, {upsert: true})
                  
                  msg.reactions.removeAll();
                  satınalma.delete();

                  uye.send({embeds: [embed2.addField(`Başarılı!`,`\`${alıncakürün.UrunIsmi}\` isimli ürünü başarıyla satın aldın!`).addField(`Ürün Bilgisi`,`\`#satın-alma-log\` isimli kanala bilgi geçildi.\nÜrün teslimi için yöneticisi olan kişilere başvurun.`).addField('Ürün ve hesap bakiyesi', `\`Ürün Fiyatı: ${alıncakürün.UrunFiyat}\` ${message.guild.emojiGöster(emojiler.Görev.Para)}`, true).addField(`᲼`,`\`Güncel Bakiye: ${Coin - alıncakürün.UrunFiyat}\` ${message.guild.emojiGöster(emojiler.Görev.Para)}`, true)]}).catch(x => {});
                  message.channel.send({embeds: [embed2.addField(`Başarılı!`,`\`${alıncakürün.UrunIsmi}\` isimli ürünü başarıyla satın aldın!`).addField(`Ürün Bilgisi`,`\`#satın-alma-log\` isimli kanala bilgi geçildi.\nÜrün teslimi için yöneticisi olan kişilere başvurun.`).addField('Ürün ve hesap bakiyesi', `\`Ürün Fiyatı: ${alıncakürün.UrunFiyat}\` ${message.guild.emojiGöster(emojiler.Görev.Para)}`, true).addField(`᲼`,`\`Güncel Bakiye: ${Coin - alıncakürün.UrunFiyat}\` ${message.guild.emojiGöster(emojiler.Görev.Para)}`, true)]}).then(x => x.delete({timeout: 15000}));
                  message.guild.kanalBul("satın-alma-log").send({embeds: [embed3.setDescription(`${uye} isimli üye **${tarihsel(Date.now())}** tarihinde **${alıncakürün.UrunIsmi}** isimli ürünü \`${alıncakürün.UrunFiyat}\` ${message.guild.emojiGöster(emojiler.Görev.Para)} fiyatına satın aldı.`)]})
                } else {
                  msg.reactions.removeAll();
                  satınalma.delete()
                  message.channel.send(`Hata: \`Yeterli miktar bulunamadığından işlem iptal edildi. :(\``).then(x => x.delete({timeout: 7500}));
                }
              }
            })
          }
        }).catch(err => {
          msg.reactions.removeAll();
          satinal.delete()
          message.delete()
          msg.delete({timeout: 7500})
        })
      }
    }
};

