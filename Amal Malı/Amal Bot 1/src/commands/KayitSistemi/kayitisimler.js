const nameData = require("../../schemas/names")
const serverSettings =require('../../models/sunucuayar')
const {red, green } = require("../../configs/emojis.json")
const moment = require("moment")
moment.locale("tr")
module.exports = {
  conf: {
    aliases: [],
    name: "isimler",
    help: "isimler [kullanıcı]"
  },
  run: async (client, message, args, embed, prefix) => {
      if (!message.guild) return;
    let conf = await serverSettings.findOne({
      guildID: message.guild.id
  });

    if(!conf.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) 
    {
    message.react(red)
    message.reply({ content:`Yetkin bulunmamakta.\Yetkili olmak istersen başvurabilirsin.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const data = await nameData.findOne({ guildID: message.guild.id, userID: member.user.id });

    const ramal = embed
    .setColor("RANDOM")
    .setAuthor({ name: `${member.user.username} Kullanıcısının Kayıt Bilgileri` })
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 2048 }))
    .setDescription(data ? data.names.splice(0, 10).map((x, i) => `\`${i + 1}.\` \`${x.name}\` Kullanıcısı <@${x.yetkili}> Tarafından Kayıt Edildi. 
    (${x.rol}) \`${moment(x.date).format("LLL")}\``).join("\n")  : "Bu kullanıcıya ait isim geçmişi bulunmuyor!")

    message.reply({ embeds: [ramal]});
  }
};
