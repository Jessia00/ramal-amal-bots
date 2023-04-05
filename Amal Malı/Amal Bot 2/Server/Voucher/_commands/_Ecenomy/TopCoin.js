const { Client, Message, MessageEmbed} = require("discord.js");
const Coins = require('../../../../Global/Databases/Schemas/Coins');
const { genEmbed } = require('../../../../Global/Init/Embed');

module.exports = {
    Isim: "topcoin",
    Komut: ["zenginler"],
    Kullanim: "zenginler",
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
    let embed = new MessageEmbed().setAuthor(sistem.embed.başlık, message.guild.iconURL({dynamic: true, size: 2048})).setColor("RANDOM");
    let Zenginler = await Coins.find().sort({Coin: -1}).limit(20).exec();
    message.channel.send({embeds: [embed.setDescription(`${Zenginler.filter(x => message.guild.members.cache.get(x._id)).map((x, index) => `\`${index == 0 ? `👑` : `${index+1}.`}\` ${x._id ? message.guild.members.cache.get(x._id) : `<@${x._id}>`} \`${x.Coin}\` ${message.guild.emojiGöster(emojiler.Görev.Para)} ${x._id == message.member.id ? `**(Siz)**` : ``}`).join("\n")}`)]})
    }
};