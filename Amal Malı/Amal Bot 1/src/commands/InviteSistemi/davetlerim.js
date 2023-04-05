const { MessageEmbed, MessageActionRow, MessageSelectMenu, } = require("discord.js");
const inviterSchema = require("../../schemas/inviter");
const inviteMemberSchema = require("../../schemas/inviteMember");
const conf = require("../../configs/sunucuayar.json")
const {  kirmiziok, star, miniicon } = require("../../configs/emojis.json");
module.exports = {
  conf: {
    aliases: ["davett"],
    name: "davett",
    help: "davett"
  },

  run: async (client, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.user.id });
    const total = inviterData ? inviterData.total : 0;
    const regular = inviterData ? inviterData.regular : 0;
    const bonus = inviterData ? inviterData.bonus : 0;
    const leave = inviterData ? inviterData.leave : 0;
    const fake = inviterData ? inviterData.fake : 0;
    const invMember = await inviteMemberSchema.find({ guildID: message.guild.id, inviter: member.user.id });
    const bazıları = invMember ? invMember.filter(value => message.guild.members.cache.get(value.userID)).slice(0, 7).map((value, index) => message.guild.members.cache.get(value.userID)).join(", ") : undefined
    const daily = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24).size : 0;
    const weekly = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24 * 7).size : 0;
    const data = await inviteMemberSchema.find({ guildID: message.guild.id, inviter: member.user.id });
        const filtered = data.filter(x => message.guild.members.cache.get(x.userID));
    let tagged;
    if (conf.tag && conf.tag.length > 0) tagged = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && m.user.username.includes(conf.tag)).size : 0;
    else tagged = 0;

    let Embedcik = new MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true, size: 2048 }));
    message.channel.send({ embeds: [Embedcik.setDescription(
    filtered.length > 0 ? filtered.map((m, index) => `
    \`${index + 1}.\` (<@${m.userID}>)`).join("\n") : "Databasede Kayıtlı Davet Ettiğin Kullanıcı Bulunamadı.!")] }).then(e => setTimeout(() => e.delete().catch(() => { }), 15000)), message.react(`${client.emojis.cache.find(x => x.name === "ramal_yes")}`)

    
}
}    