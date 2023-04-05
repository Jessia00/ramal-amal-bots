const coin = require("../../schemas/coin");
const moment = require("moment");
const ceza = require("../../schemas/ceza");
const cezapuan = require("../../schemas/cezapuan")
const muteLimit = new Map();
const { MessageEmbed, Client, Message, MessageActionRow, MessageSelectMenu } = require("discord.js");
moment.locale("tr");
const ms = require("ms");
const serverSettings =require('../../models/sunucuayar')
const { red, green, Mute, revusome, kirmiziok } = require("../../configs/emojis.json")
const settings = require("../../configs/settings.json")
module.exports = {
  conf: {
    aliases: ["sustur","suss"],
    name: "",
    help: ""
  },

  run: async (client,message, args, embed) => {
    if (!message.guild) return;
    let conf = await serverSettings.findOne({
      guildID: message.guild.id
  });

    if (!message.member.permissions.has(8n) && !conf.cmuteHammer.some(x => message.member.roles.cache.has(x))) 
    {
    message.react(red)
    message.channel.send({ content:"Yeterli yetkin bulunmuyor!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return } 
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) { message.channel.send({ content:"Bir üye belirtmelisin!"}) 
    message.react(red)
    return }
    if (conf.chatMute.some(x => member.roles.cache.has(x))) { message.channel.send({ content:"Bu üye zaten susturulmuş!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    message.react(red)
    return }
    const reason = args.slice(2).join(" ") || "Belirtilmedi!";
    if (message.member.roles.highest.position <= member.roles.highest.position) 
    {
    message.react(red)
    message.channel.send({ content:"Kendinle aynı yetkide ya da daha yetkili olan birini susturamazsın!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return
    }
    if (!member.manageable) 
    {
    message.react(red)
    message.channel.send({ content:"Bu üyeyi susturamıyorum!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return
    }
    if (settings.chatmutelimit > 0 && muteLimit.has(message.author.id) && muteLimit.get(message.author.id) == settings.chatmutelimit) 
    {
    message.react(red)
    message.channel.send({ content:"Saatlik susturma sınırına ulaştın!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return
    }
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { MuteAmount: 1 } }, {upsert: true});
    await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
    await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 20 } }, { upsert: true });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
    client.channels.cache.find(x => x.name == "cezapuan_log").send({ content:`${member} üyesi \`chat mute cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});

    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setPlaceholder('Kullanıcının Mute Atılma Sebebi?')
        .setCustomId('kurulumselect')
        .addOptions([
        { 
            label: "Sesteki olayı chat'e yansıtmak / konuyu uzatmak. (5 Dakika)",
            description: "5 dakika",
            value: "mute1",
            emoji: "1️⃣"

        },
        { 
          label: "Küfür, Ortam bozma, Troll. (5 Dakika)",
          description: "5 dakika",
          value: "mute2",
          emoji: "2️⃣"

        },
          { 
          label: "Flood, Spam, CAPSLOCK (10 Dakika)",
          description: "10 dakika",
          value: "mute3",
          emoji: "3️⃣"

        },
        { 
          label: "Dizi veya filmler hakkında spoiler vermek (10 Dakika)",
          description: "10 dakika",
          value: "mute4",
          emoji: "4️⃣"

        },
        { 
          label: "Ailevi küfür (30 Dakika)",
          description: "25 dakika",
          value: "mute5",
          emoji: "5️⃣"

        },
        { 
          label: "Kapat",
          description: "Menüyü Kapat.",
          value: "closeMenu",
          emoji: "🚀"
        }
      ])
      );


      embed.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) }).setTimestamp().setColor(message.author.displayHexColor).setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })})
    embed.setDescription(`${member.toString()} isimli kullanıcıyı susturma sebebinizi menüden seçiniz. <t:${Math.floor(Date.now() / 1000)}:R>`)
          
  let msg = await message.channel.send({ components: [row], embeds: [embed] })
          message.react(`${client.emojis.cache.find(x => x.name === "green")}`);
           msg.awaitMessageComponent({ filter: (component) => component.user.id === message.author.id, componentType: 'SELECT_MENU',}).then(async (interaction) => {
           if(interaction.values[0] == "mute1") {
          await interaction.deferUpdate();

              member.roles.add(conf.cmuteRoles)
  
              const reason = `Kışkırtma Troll`
          
              const time = 1000 * 60 * 5;
              const cıkaralım = time + Date.parse(new Date());
              const şuanki = moment(Date.parse(new Date())).format("LLL");
              const sonraki = moment(cıkaralım).format("LLL");

              const penal = await client.penalize(message.guild.id, member.user.id, "CHAT-MUTE", true, message.author.id, reason, true, Date.now() + time);
  message.reply(`${member.toString()} Adlı Kullanıcı, ${message.author} Tarafından, \`${reason}\` Sebebiyle Kanallarda Susturuldu! \`[Ceza ID: #${penal.id}]\``).then((e) => setTimeout(() => { e.delete(); }, 50000))
  message.react(green)
  if (settings.dmMessages) member.send({ content: `**${message.guild.name}** Suncusunda, \`${message.author.tag}\` Tarafından, \`${reason}\` Nedeniyle Susturuldunuz!`}).catch(() => {});
              
  const log = embed
client.channels.cache.find(x => x.name == "mute_log").send({ embeds: [embed.setDescription(`
${member.toString()} Adlı Kişiye Chat Mutesi Atıldı

Ceza ID : \`#${penal.id}\`
Mute Atılan Kullanıcı : \`${member.user.tag} (${member.user.id})\`
Mute Atan Yetkili : \`${message.author.tag} (${message.author.id})\`
Mute Atılma Saati : <t:${Math.floor(Date.now() / 1000)}:R>
Mute Sebebi : \`${!penal.reason ? 'Belirtilmedi!' : penal.reason}\`


`)] });
msg.edit({ embeds: [row] })}
interaction.message.delete()	

           if(interaction.values[0] == "mute2") {
             await interaction.deferUpdate();
          
              member.roles.add(conf.cmuteRoles)
  
              const reason = `Spam Flood`
          
              const time = 1000 * 60 * 5;
              const cıkaralım = time + Date.parse(new Date());
              const şuanki = moment(Date.parse(new Date())).format("LLL");
              const sonraki = moment(cıkaralım).format("LLL");

              const penal = await client.penalize(message.guild.id, member.user.id, "CHAT-MUTE", true, message.author.id, reason, true, Date.now() + time);
  message.reply(`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle susturuldu! \`(Ceza ID: #${penal.id})\``).then((e) => setTimeout(() => { e.delete(); }, 50000))
  message.react(green)
  if (settings.dmMessages) member.send({ content: `**${message.guild.name}** Suncusunda, \`${message.author.tag}\` Tarafından, \`${reason}\` Nedeniyle Susturuldunuz!`}).catch(() => {});
              
  const log = embed
client.channels.cache.find(x => x.name == "mute_log").send({ embeds: [embed.setDescription(`
${member.toString()} Adlı Kişiye Chat Mutesi Atıldı

Ceza ID : \`#${penal.id}\`
Mute Atılan Kullanıcı : \`${member.user.tag} (${member.user.id})\`
Mute Atan Yetkili : \`${message.author.tag} (${message.author.id})\`
Mute Atılma Saati : <t:${Math.floor(Date.now() / 1000)}:R>
Mute Sebebi : \`${!penal.reason ? 'Belirtilmedi!' : penal.reason}\`


`)] });
msg.edit({ embeds: [row] })}
interaction.message.delete()	

if(interaction.values[0] == "mute3") {
             await interaction.deferUpdate();
          
              member.roles.add(conf.cmuteRoles)
  
              const reason = `Flood, Spam, CAPSLOCK`
          
              const time = 1000 * 60 * 10;
              const cıkaralım = time + Date.parse(new Date());
              const şuanki = moment(Date.parse(new Date())).format("LLL");
              const sonraki = moment(cıkaralım).format("LLL");

              const penal = await client.penalize(message.guild.id, member.user.id, "CHAT-MUTE", true, message.author.id, reason, true, Date.now() + time);
  message.reply(`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle susturuldu! \`(Ceza ID: #${penal.id})\``).then((e) => setTimeout(() => { e.delete(); }, 50000))
  message.react(green)
  if (settings.dmMessages) member.send({ content: `**${message.guild.name}** Suncusunda, \`${message.author.tag}\` Tarafından, \`${reason}\` Nedeniyle Susturuldunuz!`}).catch(() => {});
              
  const log = embed
client.channels.cache.find(x => x.name == "mute_log").send({ embeds: [embed.setDescription(`
${member.toString()} Adlı Kişiye Chat Mutesi Atıldı

Ceza ID : \`#${penal.id}\`
Mute Atılan Kullanıcı : \`${member.user.tag} (${member.user.id})\`
Mute Atan Yetkili : \`${message.author.tag} (${message.author.id})\`
Mute Atılma Saati : <t:${Math.floor(Date.now() / 1000)}:R>
Mute Sebebi : \`${!penal.reason ? 'Belirtilmedi!' : penal.reason}\`


`)] });
msg.edit({ embeds: [row] })}
interaction.message.delete()	             
if(interaction.values[0] == "mute4") {
             await interaction.deferUpdate();
          
              member.roles.add(conf.cmuteRoles)
  
              const reason = `Dizi veya filmler hakkında spoiler vermek`
          
              const time = 1000 * 60 * 10;
              const cıkaralım = time + Date.parse(new Date());
              const şuanki = moment(Date.parse(new Date())).format("LLL");
              const sonraki = moment(cıkaralım).format("LLL");

              const penal = await client.penalize(message.guild.id, member.user.id, "CHAT-MUTE", true, message.author.id, reason, true, Date.now() + time);
  message.reply(`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle susturuldu! \`(Ceza ID: #${penal.id})\``).then((e) => setTimeout(() => { e.delete(); }, 50000))
  message.react(green)
  if (settings.dmMessages) member.send({ content: `**${message.guild.name}** Suncusunda, \`${message.author.tag}\` Tarafından, \`${reason}\` Nedeniyle Susturuldunuz!`}).catch(() => {});
              
  const log = embed
client.channels.cache.find(x => x.name == "mute_log").send({ embeds: [embed.setDescription(`
${member.toString()} Adlı Kişiye Chat Mutesi Atıldı

Ceza ID : \`#${penal.id}\`
Mute Atılan Kullanıcı : \`${member.user.tag} (${member.user.id})\`
Mute Atan Yetkili : \`${message.author.tag} (${message.author.id})\`
Mute Atılma Saati : <t:${Math.floor(Date.now() / 1000)}:R>
Mute Sebebi : \`${!penal.reason ? 'Belirtilmedi!' : penal.reason}\`


`)] });
msg.edit({ embeds: [row] })}
interaction.message.delete()	             
if(interaction.values[0] == "mute5") {
             await interaction.deferUpdate();
          
              member.roles.add(conf.cmuteRoles)
  
              const reason = `Ailevi küfür`
          
              const time = 1000 * 60 * 25;
              const cıkaralım = time + Date.parse(new Date());
              const şuanki = moment(Date.parse(new Date())).format("LLL");
              const sonraki = moment(cıkaralım).format("LLL");

              const penal = await client.penalize(message.guild.id, member.user.id, "CHAT-MUTE", true, message.author.id, reason, true, Date.now() + time);
  message.reply(`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle susturuldu! \`(Ceza ID: #${penal.id})\``).then((e) => setTimeout(() => { e.delete(); }, 50000))
  message.react(green)
  if (settings.dmMessages) member.send({ content: `**${message.guild.name}** Suncusunda, \`${message.author.tag}\` Tarafından, \`${reason}\` Nedeniyle Susturuldunuz!`}).catch(() => {});
              
  const log = embed
client.channels.cache.find(x => x.name == "mute_log").send({ embeds: [embed.setDescription(`
${member.toString()} Adlı Kişiye Chat Mutesi Atıldı

Ceza ID : \`#${penal.id}\`
Mute Atılan Kullanıcı : \`${member.user.tag} (${member.user.id})\`
Mute Atan Yetkili : \`${message.author.tag} (${message.author.id})\`
Mute Atılma Saati : <t:${Math.floor(Date.now() / 1000)}:R>
Mute Sebebi : \`${!penal.reason ? 'Belirtilmedi!' : penal.reason}\`


`)] });
msg.edit({ embeds: [row] })}
interaction.message.delete()	                         
})

}
}    