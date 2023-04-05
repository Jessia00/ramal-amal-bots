const {  voice, mesaj2, star, miniicon } = require("../../configs/emojis.json");
const messageUserChannel = require("../../schemas/messageUserChannel");
const voiceUserChannel = require("../../schemas/voiceUserChannel");
const messageUser = require("../../schemas/messageUser");
const voiceUser = require("../../schemas/voiceUser");
const voiceUserParent = require("../../schemas/voiceUserParent");
const moment = require("moment");
const inviterSchema = require("../../schemas/inviter");
let { Stats, Seens } = require('../../schemas/Tracking');
require("moment-duration-format");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const conf = require("../../configs/sunucuayar.json")
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    conf: {
      aliases: ["me","stat"],
      name: "stat",
      help: "stat"
    },
  
run: async (client, message, args, embed, prefix) => {

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.user.id });
    const total = inviterData ? inviterData.total : 0;
    const regular = inviterData ? inviterData.regular : 0;
    const bonus = inviterData ? inviterData.bonus : 0;
    const leave = inviterData ? inviterData.leave : 0;
    const fake = inviterData ? inviterData.fake : 0;
    let seens = await Seens.findOne({userID: member.user.id});
    const category = async (parentsArray) => {
        const data = await voiceUserParent.find({ guildID: message.guild.id, userID: member.id });
        const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
        let voiceStat = 0;
        for (var i = 0; i <= voiceUserParentData.length; i++) {
          voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
        }
        return moment.duration(voiceStat).format("H [saat], m [dakika] s [saniye]");
      };
      
      const Active1 = await messageUserChannel.find({ guildID: message.guild.id, userID: member.id }).sort({ channelData: -1 });
      const Active2 = await voiceUserChannel.find({ guildID: message.guild.id, userID: member.id }).sort({ channelData: -1 });
      let messageTop;
      Active1.length > 0 ? messageTop = Active1.splice(0, 5).map(x => `<#${x.channelID}>: \`${Number(x.channelData).toLocaleString()} mesaj\``).join("\n") : messageTop = "Veri bulunmuyor."

      const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: member.id });
      const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: member.id });
      const messageWeekly = messageData ? messageData.weeklyStat : 0;
      const voiceWeekly = moment.duration(voiceData ? voiceData.weeklyStat : 0).format("H [saat], m [dakika]");
      const messageDaily = messageData ? messageData.dailyStat : 0;
      const voiceDaily = moment.duration(voiceData ? voiceData.dailyStat : 0).format("H [saat], m [dakika]");

      const row = new MessageActionRow()
      .addComponents(

  new MessageButton()
  .setCustomId("main")
  .setLabel("Menü")
  .setStyle("PRIMARY"),

  new MessageButton()
  .setCustomId("ses")
  .setLabel("Ses Bilgi")
  .setStyle("SUCCESS"),

  new MessageButton()
  .setCustomId("mes")
  .setLabel("Mesaj Bilgi")
  .setStyle("DANGER"),

new MessageButton()
  .setCustomId("davet")
  .setLabel("Davet Bilgi")
  .setStyle("SUCCESS"),

  new MessageButton()
  .setCustomId("mess")
  .setLabel("Bilgi")
  .setStyle("PRIMARY"),
  );

  embed.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) }).setTimestamp().setColor(message.author.displayHexColor).setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })}).setThumbnail(message.guild.iconURL({ dynamic: true }))
      embed.setDescription(`${member.toString()} Adlı üyesinin <t:${Math.floor(Date.now() / 1000)}:R> tarihinden  itibaren Sunucumuzdaki Toplam İstatistikleri Aşağıda Belirtilmiştir!`)
.addFields(
{ name: "**Toplam Ses**",  value: `
\`\`\`css
${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}
\`\`\`
`, inline: true },
{ name: "**Toplam Mesaj**",  value: `
\`\`\`css
${messageData ? messageData.topStat : 0} mesaj
\`\`\`
`, inline: true },
{ name:"**Toplam Davet**",  value: `
\`\`\`css
${inviterData ? `${total} regular`: "Veri bulunmuyor."} 
\`\`\`
`, inline: true },
 )

embed.addField(`${star} **Sesli Sohbet İstatistiği**`, `

${voice} **Genel Toplam Ses :** \`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}\`
${mesaj2} **Genel Toplam Mesaj :** \`${messageData ? messageData.topStat : 0} mesaj\`

${voice} **Haftalık Ses :** \`${voiceWeekly}\`
${mesaj2} **Haftalık Chat :** \`${Number(messageWeekly).toLocaleString()} mesaj\`

${voice} **Günlük Ses :** \`${voiceDaily}\`
${mesaj2} **Günlük Chat :** \`${Number(messageDaily).toLocaleString()} mesaj\`

${star} **Davetleri :** **${total}** (**${regular}** gerçek, **${bonus}** bonus, **${leave}** ayrılmış, **${fake}** fake)
${star} **Daha geniş çaplı bilgilere erişmek için lütfen aşağıdaki butonları kullanınız!** 
`, false);

      let msg = await message.channel.send({ embeds: [embed], components: [row]})

      const filter = (xd) => xd.user.id == message.author.id;
      let collector =  msg.createMessageComponentCollector({ filter, componentType: 'BUTTON', time: 99999999 })

collector.on("collect", async (button) => {
if(button.customId === "ses") {
  await button.deferUpdate();

const embeds = new MessageEmbed()
.setDescription(`${member.toString()} üyesinin \`${moment(Date.now()).format("LLL")}\` tarihinden  itibaren \`${message.guild.name}\` sunucusunda toplam ses bilgileri aşağıda belirtilmiştir.`)
.addFields(
{ name: "__**Toplam Ses**__",  value: `
\`\`\`fix
${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}
\`\`\`
`, inline: true },
{ name: "__**Haftalık Ses**__",  value: `
\`\`\`fix
${voiceWeekly}
\`\`\`
`, inline: true },
{ name:"__**Günlük Ses**__",  value: `
\`\`\`fix
${voiceDaily}
\`\`\`
`, inline: true },
)

  embeds.addField(`${star} **Sesli Sohbet İstatistiği**`, `
  \`• Toplam Ses Sürüniz:\` \`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}\`
${client.emojis.cache.find(x => x.name === "mavinokta")} Public Odalar: \`${await category(conf.publicParents)}\`
${client.emojis.cache.find(x => x.name === "mavinokta")} Secret Odalar: \`${await category(conf.privateParents)}\`
${client.emojis.cache.find(x => x.name === "mavinokta")} Alone Odalar: \`${await category(conf.aloneParents)}\`
${client.emojis.cache.find(x => x.name === "mavinokta")} Yönetim Yetkili Odaları: \`${await category(conf.funParents)}\`
${client.emojis.cache.find(x => x.name === "mavinokta")} Kayıt Odaları: \`${await category(conf.registerParents)}\`
${client.emojis.cache.find(x => x.name === "mavinokta")} Son Görülme Seste ${seens.lastSeenVoice ? `<t:${String(seens.lastSeenVoice ? seens.lastSeenVoice : Date.now()).slice(0, 10)}:R>` : "Son Seste Görülme Bulunamadı!"}
 `, false);

msg.edit({
  embeds: [embeds],
  components : [row]
})}
if(button.customId === "mes") {
  await button.deferUpdate();

const embeds = new MessageEmbed()
.setDescription(`${member.toString()} üyesinin \`${moment(Date.now()).format("LLL")}\` tarihinden  itibaren \`${message.guild.name}\` sunucusunda toplam mesaj bilgileri aşağıda belirtilmiştir.`)

.addFields(
{ name: "__**Toplam Mesaj**__",  value: `
\`\`\`fix
${messageData ? messageData.topStat : 0} mesaj
\`\`\`
`, inline: true },
{ name: "__**Haftalık Mesaj**__",  value: `
\`\`\`fix
${Number(messageWeekly).toLocaleString()} mesaj
\`\`\`
`, inline: true },
{ name:"__**Günlük Mesaj**__",  value: `
\`\`\`fix
${Number(messageDaily).toLocaleString()} mesaj
\`\`\`
`, inline: true },
)
msg.edit({
  embeds: [embeds],
  components : [row]
})}
if(button.customId === "davet") {
  await button.deferUpdate();

const embeds = new MessageEmbed()
.setDescription(`${member.toString()} üyesinin \`${moment(Date.now()).format("LLL")}\` tarihinden  itibaren \`${message.guild.name}\` sunucusunda toplam mesaj bilgileri aşağıda belirtilmiştir.`)

.addFields(
{ name: "__**Toplam Davet**__",  value: `
\`\`\`fix
${inviterData ? inviterData.total : 0} Davet
\`\`\`
`, inline: true },
{ name: "__**Fake Davet**__",  value: `
\`\`\`fix
${inviterData ? inviterData.fake : 0} Fake Davet
\`\`\`
`, inline: true },
{ name:"__**Bonus Davet**__",  value: `
\`\`\`fix
${inviterData ? inviterData.bonus : 0} Bonus Davet
\`\`\`
`, inline: true },
)
embeds.addField(`${star} **Davet İstatistiği**`, `
Toplam Davet **${total}**
Gerçek Davet **${regular}**
Davetinden Çıkanlar **${leave}**
Fake Davet **${fake}**

`, false);
msg.edit({
  embeds: [embeds],
  components : [row]
})}
if(button.customId === "mess") {
  await button.deferUpdate();

const embeds = new MessageEmbed()
.setDescription(`${member.toString()} üyesinin \`${moment(Date.now()).format("LLL")}\` tarihinden  itibaren \`${message.guild.name}\` sunucusunda toplam mesaj bilgileri aşağıda belirtilmiştir.`)

.addFields(
{ name: "__**Toplam Mesaj**__",  value: `
\`\`\`fix
${messageData ? messageData.topStat : 0} mesaj
\`\`\`
`, inline: true },
{ name: "__**Haftalık Mesaj**__",  value: `
\`\`\`fix
${Number(messageWeekly).toLocaleString()} mesaj
\`\`\`
`, inline: true },
{ name:"__**Günlük Mesaj**__",  value: `
\`\`\`fix
${Number(messageDaily).toLocaleString()} mesaj
\`\`\`
`, inline: true },
)
embeds.addField(`${star} **Mesaj İstatistiği**`, `
${messageTop}
`, false);
msg.edit({
  embeds: [embeds],
  components : [row]
})}
if(button.customId === "main") {
  await button.deferUpdate();

msg.edit({
  embeds: [embed],
  components : [row]
})}
})
},
};
  
