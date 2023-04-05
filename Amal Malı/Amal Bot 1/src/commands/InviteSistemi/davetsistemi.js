const moment = require("moment");
require("moment-duration-format");
const inviterSchema = require("../../schemas/inviter");
const inviteMemberSchema = require("../../schemas/inviteMember");
const conf = require("../../configs/sunucuayar.json")
const {  kirmiziok, star, miniicon } = require("../../configs/emojis.json");
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");
module.exports = {
    conf: {
      aliases: ["davetim","davetlerim"],
      name: "-",
      help: "-"
    },
  
run: async (client, message, args, embed, prefix) => {
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

    
    const row = new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setPlaceholder('Lütfen aşağıdan seçim yapınız.')
          .setCustomId('kurulumselect')
          .addOptions([
          { 
              label: "Davetim",
              description: "Sizin Sunucudaki davet sayısını gösterir",
              value: "davetim",
              emoji: "945431043853402192"

          },
          { 
            label: "Davet Ettiklerim",
            description: "Sunucudaki davet ettigin kişileri gösterir",
            value: "topdavet",
            emoji: "945431043853402192"

          },
          { 
            label: "Kapat",
            description: "Menüyü Kapat.",
            value: "closeMenu",
            emoji: "❌"
          }
        ])
        );


        embed.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) }).setTimestamp().setColor(message.author.displayHexColor).setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })}).setThumbnail(message.guild.iconURL({ dynamic: true }))
      embed.setDescription(`Merhaba ${message.author}, aşağıda bulunan menüden 30 saniye içerisinde incelemek istediğiniz veriyi seçin.`)

            let msg = await message.channel.send({ components: [row], embeds: [embed] })
            message.react(`${client.emojis.cache.find(x => x.name === "green")}`);
             msg.awaitMessageComponent({ filter: (component) => component.user.id === message.author.id, componentType: 'SELECT_MENU',}).then(async (interaction) => {
             if(interaction.values[0] == "topdavet") {
                embed.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
     .setThumbnail(message.guild.iconURL({ dynamic: true }))
     let Embedcik = new MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true, size: 2048 }));
    message.channel.send({ embeds: [Embedcik.setDescription(
    filtered.length > 0 ? filtered.map((m, index) => ` \`${index + 1}.\` <@${m.userID}>`).join("\n") : "Databasede Kayıtlı Davet Ettiğin Kullanıcı Bulunamadı.!")] }).then(e => setTimeout(() => e.delete().catch(() => { }), 15000)), message.react(`${client.emojis.cache.find(x => x.name === "ramal_yes")}`)
    
            interaction.update({ components: [row], embeds: [embed] }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000))}		 
             if(interaction.values[0] == "davetim") {
                embed.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
.setDescription(`${star} Kullanıcının ${message.author} Toplam **${total}** davet. 

\`(${regular} gerçek, ${bonus} bonus, ${leave} ayrılmış, ${fake} fake)\`      
${kirmiziok} Günlük: \`${daily}\`, Haftalık: \`${weekly}\`, Taglı: \`${tagged}\`)
`)

                interaction.update({ components: [row], embeds: [embed] }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000))}
                if(interaction.values[0] == "topinvite") {
                
                    let data = await db.find({ guildID: message.guild.id }).sort({ total: -1 });
  if (!data.length)return message.channel.send({ embeds: [embed.setDescription("Herhangi bir invite verisi bulunamadı!")] });
  let arr = [];
  data.forEach((x) => arr.push({ id: x.userID, total: x.total }));
  let index = arr.findIndex((x) => x.id == message.author.id) + 1;

  let list = data
    .filter((x) => message.guild.members.cache.has(x.userID))
    .splice(0, 10)
    .map((x, index) => `${x.userID === message.author.id ? `**${index + 1}. <@${x.userID}> - Toplam ${x.total} davet (${x.regular} gerçek, ${x.bonus} bonus, ${x.fake} fake, ${x.leave} ayrılmış)**` : `**${index + 1}.** <@${x.userID}> - Toplam **${x.total}** davet \`(${x.regular} gerçek, ${x.bonus} bonus, ${x.fake} fake, ${x.leave} ayrılmış)\``}`)
    .join("\n");

  const veri = await db.findOne({ guildID: message.guild.id, userID: message.author.id });
  if (index < 10) {
    const embed = new MessageEmbed()
    .setAuthor({ name: "Invite Sıralaması" })
    .setDescription(list);
    message.channel.send({ embeds: [embed]});
  } else {
    const embed = new MessageEmbed()
    .setAuthor({ name: "Invite Sıralaması" })
    .addField(`Invite Sıralaması (\`${list} \n... \n**${index}. ${message.author} Toplam ${veri.total} davet (${veri.regular} gerçek, ${veri.bonus} bonus, ${veri.fake} fake, ${veri.leave} ayrılmış)**`);
    message.channel.send({ embeds: [row]});
  }

    
                    interaction.update({ components: [row], embeds: [embed] }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000))
                }                                
                    if(interaction.values[0] == "closeMenu") {
                        interaction.message.delete()					
                        }
                

                    
                
                    })

}
}