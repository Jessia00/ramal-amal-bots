const coin = require("../../schemas/coin");
const moment = require("moment");
const ceza = require("../../schemas/ceza");
const cezapuan = require("../../schemas/cezapuan")
const vmuteLimit = new Map();
moment.locale("tr");
const ms = require("ms");
const serverSettings =require('../../models/sunucuayar')
const { MessageEmbed, Client, Message, MessageActionRow, MessageSelectMenu } = require("discord.js");
const settings = require("../../configs/settings.json")
const { red, green, Mute, revusome, kirmiziok } = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["voicemute"],
    name: "vsustur",
    help: "voicemute"
  },

  run: async (client, message, args, embed) => {

    if (!message.guild) return;
    let conf = await serverSettings.findOne({
      guildID: message.guild.id
  });
  
    if (!message.member.permissions.has(8n) && !conf.vmuteHammer.some(x => message.member.roles.cache.has(x))) 
    {
    message.react(red)
    message.channel.send({content: "Yeterli yetkin bulunmuyor!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) {
    message.react(red)
    message.channel.send({content:"Bir üye belirtmelisin!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if (conf.voiceMute.some(x => member.roles.cache.has(x))) 
    {
    message.react(red)
    message.channel.send({content: "Bu üye zaten susturulmuş!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    const duration = args[1] ? ms(args[1]) : undefined;
    if (!duration) {
    message.react(red)
    message.channel.send({content:"Kendinle aynı yetkide ya da daha yetkili olan birini susturamazsın!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if (!member.manageable) 
    {
    message.react(red)
    message.channel.send({ content:"Bu üyeyi susturamıyorum!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if (settings.voicemutelimit > 0 && vmuteLimit.has(message.author.id) && vmuteLimit.get(message.author.id) == settings.voicemutelimit) 
    {
    message.react(red)
    message.channel.send({ content:"Saatlik susturma sınırına ulaştın!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { VoiceMuteAmount: 1 } }, {upsert: true});
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
    await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 20 } }, { upsert: true });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
    if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({content:`${member} üyesi \`voice mute cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});

    const row = new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setPlaceholder('Kullanıcının Susturulma Sebebi?')
          .setCustomId('kurulumselect')
          .addOptions([
          { 
              label: "Ailevi Küfür - 20 dakika",
              description: "20 dakika",
              value: "vmute1",
              emoji: "1️⃣"
  
          },
          { 
            label: "Küfür - 10 dakika",
            description: "10 dakika",
            value: "vmute2",
            emoji: "2️⃣"
  
          },
            { 
            label: "Troll / Düzen Bozmak - 10 dakika",
            description: "10 dakika",
            value: "vmute3",
            emoji: "3️⃣"
  
          },
          { 
            label: "Tartışma / Kavga - 15 dakika",
            description: "15 dakika",
            value: "vmute4",
            emoji: "4️⃣"
  
          },
          { 
            label: "Kadın Üyelere Sarkmak - 25 dakika",
            description: "25 dakika",
            value: "vmute5",
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
      embed.setDescription(`${member.toString()} isimli kullanıcıyı sesli kanallarda susturma sebebinizi menüden seçiniz. <t:${Math.floor(Date.now() / 1000)}:R>`)
            
    let msg = await message.channel.send({ components: [row], embeds: [embed] })
            message.react(`${client.emojis.cache.find(x => x.name === "green")}`);
             msg.awaitMessageComponent({ filter: (component) => component.user.id === message.author.id, componentType: 'SELECT_MENU',}).then(async (interaction) => {
             if(interaction.values[0] == "vmute1") {
            await interaction.deferUpdate();
  
            member.roles.add(conf.voiceMute);
            if (member.voice.channelID && !member.voice.serverMute) {
              member.voice.setMute(true);
              member.roles.add(conf.voiceMute);
            }
            
            const reason = `Ailevi Küfür`
        
            const time = 1000 * 60 * 20;
            const cıkaralım = time + Date.parse(new Date());
            const şuanki = moment(Date.parse(new Date())).format("LLL");
            const sonraki = moment(cıkaralım).format("LLL");
           
        
            const penal = await client.penalize(message.guild.id, member.user.id, "VOICE-MUTE", true, message.author.id, reason, true, Date.now() + time);
            message.react(green)
            message.reply(`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle **sesli kanallarda** susturuldu! \`(Ceza ID: #${penal.id})\``)
            if (settings.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle **sesli kanallarda** susturuldunuz!`).catch(() => {});
        
            const log = embed
  client.channels.cache.find(x => x.name == "vmute_log").send({ embeds: [embed.setDescription(`
${member.toString()} Adlı Kişiye Ses Mutesi Atıldı
        
${Mute} Mute Atan Kişi : ${message.author} (\`${message.author.id}\`)
${revusome} Ceza Süresi: \`20 Dakkika\`
${kirmiziok} Ses Mute atılma tarihi: \`${şuanki}\`
${kirmiziok} Ses Mute bitiş tarihi: \`${sonraki}\`
${kirmiziok} Ceza Sebebi: \`${reason}\`
        
        
`)] });
  msg.edit({ embeds: [row] })}
  interaction.message.delete()	
  
             if(interaction.values[0] == "vmute2") {
               await interaction.deferUpdate();
            
               member.roles.add(conf.voiceMute);
               if (member.voice.channelID && !member.voice.serverMute) {
                 member.voice.setMute(true);
                 member.roles.add(conf.voiceMute);
               }
               
               const reason = `Küfür`
           
               const time = 1000 * 60 * 10;
               const cıkaralım = time + Date.parse(new Date());
               const şuanki = moment(Date.parse(new Date())).format("LLL");
               const sonraki = moment(cıkaralım).format("LLL");
           
               const penal = await client.penalize(message.guild.id, member.user.id, "VOICE-MUTE", true, message.author.id, reason, true, Date.now() + time);
               message.react(green)
               message.reply(`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle **sesli kanallarda** susturuldu! \`(Ceza ID: #${penal.id})\``).then(x=>x.delete({timeout:50000}))
               if (settings.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle **sesli kanallarda** susturuldunuz!`).catch(() => {});
           
               const log = embed
               client.channels.cache.find(x => x.name == "vmute_log").send({ embeds: [embed.setDescription(`
${member.toString()} Adlı Kişiye Ses Mutesi Atıldı
           
${Mute} Mute Atan Kişi : ${message.author} (\`${message.author.id}\`)
${revusome} Ceza Süresi: \`10 Dakkika\`
${kirmiziok} Ses Mute atılma tarihi: \`${şuanki}\`
${kirmiziok} Ses Mute bitiş tarihi: \`${sonraki}\`
${kirmiziok} Ceza Sebebi: \`${reason}\`
           
           
`)] });
  msg.edit({ embeds: [row] })}
  interaction.message.delete()	
  
  if(interaction.values[0] == "vmute3") {
               await interaction.deferUpdate();
            
               member.roles.add(conf.voiceMute);
               if (member.voice.channelID && !member.voice.serverMute) {
                 member.voice.setMute(true);
                 member.roles.add(conf.voiceMute);
               }
               
               const reason = `Troll / Düzen Bozmak`
           
               const time = 1000 * 60 * 10;
               const cıkaralım = time + Date.parse(new Date());
               const şuanki = moment(Date.parse(new Date())).format("LLL");
               const sonraki = moment(cıkaralım).format("LLL");
           
               const penal = await client.penalize(message.guild.id, member.user.id, "VOICE-MUTE", true, message.author.id, reason, true, Date.now() + time);
               message.react(green)
               message.reply(`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle **sesli kanallarda** susturuldu! \`(Ceza ID: #${penal.id})\``)
               if (settings.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle **sesli kanallarda** susturuldunuz!`).catch(() => {});
           
            const log = embed
            client.channels.cache.find(x => x.name == "vmute_log").send({ embeds: [embed.setDescription(`
${member.toString()} Adlı Kişiye Ses Mutesi Atıldı
           
${Mute} Mute Atan Kişi : ${message.author} (\`${message.author.id}\`)
${revusome} Ceza Süresi: \`10 Dakkika\`
${kirmiziok} Ses Mute atılma tarihi: \`${şuanki}\`
${kirmiziok} Ses Mute bitiş tarihi: \`${sonraki}\`
${kirmiziok} Ceza Sebebi: \`${reason}\`
           
           
`)] });
  msg.edit({ embeds: [row] })}
  interaction.message.delete()	             
  if(interaction.values[0] == "vmute4") {
               await interaction.deferUpdate();
            
               member.roles.add(conf.voiceMute);
            if (member.voice.channelID && !member.voice.serverMute) {
              member.voice.setMute(true);
              member.roles.add(conf.voiceMute);
            }
            
            const reason = `Tartışma / Kavga`
        
            const time = 1000 * 60 * 15;
            const cıkaralım = time + Date.parse(new Date());
            const şuanki = moment(Date.parse(new Date())).format("LLL");
            const sonraki = moment(cıkaralım).format("LLL");
        
            const penal = await client.penalize(message.guild.id, member.user.id, "VOICE-MUTE", true, message.author.id, reason, true, Date.now() + time);
            message.react(green)
            message.reply(`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle **sesli kanallarda** susturuldu! \`(Ceza ID: #${penal.id})\``)
            if (settings.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle **sesli kanallarda** susturuldunuz!`).catch(() => {});
        
            const log = embed
            client.channels.cache.find(x => x.name == "vmute_log").send({ embeds: [embed.setDescription(`
${member.toString()} Adlı Kişiye Ses Mutesi Atıldı
        
${Mute} Mute Atan Kişi : ${message.author} (\`${message.author.id}\`)
${revusome} Ceza Süresi: \`15 Dakkika\`
${kirmiziok} Ses Mute atılma tarihi: \`${şuanki}\`
${kirmiziok} Ses Mute bitiş tarihi: \`${sonraki}\`
${kirmiziok} Ceza Sebebi: \`${reason}\`
        
        
        `)] })
  msg.edit({ embeds: [row] })}
  interaction.message.delete()	             
  if(interaction.values[0] == "vmute5") {
               await interaction.deferUpdate();
            
               member.roles.add(conf.voiceMute);
               if (member.voice.channelID && !member.voice.serverMute) {
                 member.voice.setMute(true);
                 member.roles.add(conf.voiceMute);
               }
               
               const reason = `Kadın Üyelere Sarkmak`
           
               const time = 1000 * 60 * 20;
               const cıkaralım = time + Date.parse(new Date());
               const şuanki = moment(Date.parse(new Date())).format("LLL");
               const sonraki = moment(cıkaralım).format("LLL");
              
               await button.reply.defer()
           
               const penal = await client.penalize(message.guild.id, member.user.id, "VOICE-MUTE", true, message.author.id, reason, true, Date.now() + time);
               message.react(green)
               message.reply(`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle **sesli kanallarda** susturuldu! \`(Ceza ID: #${penal.id})\``)
               if (settings.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle **sesli kanallarda** susturuldunuz!`).catch(() => {});
           
        const log = embed
        client.channels.cache.find(x => x.name == "vmute_log").send({ embeds: [embed.setDescription(`
${member.toString()} Adlı Kişiye Ses Mutesi Atıldı
           
${Mute} Mute Atan Kişi : ${message.author} (\`${message.author.id}\`)
${revusome} Ceza Süresi: \`20 Dakkika\`
${kirmiziok} Ses Mute atılma tarihi: \`${şuanki}\`
${kirmiziok} Ses Mute bitiş tarihi: \`${sonraki}\`
${kirmiziok} Ceza Sebebi: \`${reason}\`
           
           
`)] })
  msg.edit({ embeds: [row] })}
  interaction.message.delete()	                         
  })
  
  }
  }    