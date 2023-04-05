const moment = require("moment");
moment.locale("tr");
const penals = require("../../schemas/penals");
const serverSettings =require('../../models/sunucuayar')
const { MessageEmbed, Client, Message, MessageActionRow, MessageSelectMenu } = require("discord.js");
const settings = require("../../configs/settings.json")
const { red, green, Revuu} = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["unkarantina"],
    name: "unkarantina",
    help: "uncezali"
  },

  run: async (client, message,  args, embed) => {

    if (!message.guild) return;
    let conf = await serverSettings.findOne({
      guildID: message.guild.id
  });

    if (!message.member.permissions.has(8n) && !conf.jailHammer.some(x => message.member.roles.cache.has(x))) 
    {
    message.react(red)
    message.channel.send({ content:"Yeterli yetkin bulunmuyor!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) {
    message.react(red)
    message.channel.send({ content:"Bir üye belirtmelisin!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if (!conf.jailRole.some(x => member.roles.cache.has(x))) 
    {
    message.react(red)
    message.channel.send({ content:"Bu üye jailde değil!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if (!message.member.permissions.has(8n) && member.roles.highest.position >= message.member.roles.highest.position) 
    {
    message.react(red)
    message.channel.send({ content:"Kendinle aynı yetkide ya da daha yetkili olan birinin jailini kaldıramazsın!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if (!member.manageable) {
    message.react(red)  
    message.channel.send({ content:"Bu üyeyi jailden çıkaramıyorum!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }

    const row = new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setPlaceholder('Kullanıcı ceza kaldırma paneli')
          .setCustomId('kurulumselect')
          .addOptions([
          { 
              label: "Karantinadan Çıkart",
              description: "otomotik kayıtsıza düşer",
              value: "unjail1",
              emoji: "1️⃣"
  
          },
          { 
            label: "Reklamdan Çıkart",
            description: "otomotik kayıtsıza düşer",
            value: "unjail2",
            emoji: "2️⃣"
  
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
      embed.setDescription(`${member.toString()} isimli kullanıcıyı jail-reklam çıkartmak için menüden seçiniz. <t:${Math.floor(Date.now() / 1000)}:R>`)
            
    let msg = await message.channel.send({ components: [row], embeds: [embed] })
            message.react(`${client.emojis.cache.find(x => x.name === "green")}`);
             msg.awaitMessageComponent({ filter: (component) => component.user.id === message.author.id, componentType: 'SELECT_MENU',}).then(async (interaction) => {
             if(interaction.values[0] == "unjail1") {
            await interaction.deferUpdate();
  
            if (!conf.jailRole.some(x => member.roles.cache.get(x)))
    {
    message.react(red)
    message.channel.send( "Bu üye jailde değil!").then(x=>x.delete({timeout:5000})) 
    return }

    member.roles.set(conf.unregRoles);
    const data = await penals.findOne({ userID: member.user.id, guildID: message.guild.id, $or: [{ type: "JAIL" }, { type: "TEMP-JAIL" }], active: true });
    if (data) {
      data.active = false;
      await data.save();
    }
    message.react(green)
    message.reply(`${green} ${member.toString()} üyesinin jaili ${message.author} tarafından kaldırıldı!`)
    if (settings.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, jailiniz kaldırıldı!`).catch(() => {});

    const log = embed
    client.channels.cache.find(x => x.name == "jail_log").send({ embeds: [embed.setDescription(`
      ${member.toString()} Adlı Kişinin Jaili Kaldırıldı
      
${Revuu} Jaili Kaldıran Kişi : ${message.author} (\`${message.author.id}\`)
          
`)] });
  msg.edit({ embeds: [row] })}
  interaction.message.delete()	
  
             if(interaction.values[0] == "mute2") {
               await interaction.deferUpdate();
            
               if (!conf.reklamRole.some(x => member.roles.cache.get(x)))
               {
               message.react(red)
               message.channel.send( "Bu üye jailde değil!").then(x=>x.delete({timeout:5000})) 
               return }
              
               member.roles.set(conf.unregRoles);
               const data = await penals.findOne({ userID: member.user.id, guildID: message.guild.id, $or: [{ type: "REKLAM" }, { type: "TEMP-REKLAM" }], active: true });
               if (data) {
                 data.active = false;
                 await data.save();
               }
               message.react(green)
               message.reply(`${green} ${member.toString()} üyesinin Reklami ${message.author} tarafından kaldırıldı!`)
               if (settings.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, reklaminiz kaldırıldı!`).catch(() => {});
           
               const log = embed
    client.channels.cache.find(x => x.name == "jail_log").send({ embeds: [embed.setDescription(`
      ${member.toString()} Adlı Kişinin Reklami Kaldırıldı
                 
${Revuu} Reklami Kaldıran Kişi : ${message.author} (\`${message.author.id}\`)
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
  client.channels.cache.find(x => x.name == "yasaklı-iş-çeviriyo").send({ embeds: [embed.setDescription(`
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
  client.channels.cache.find(x => x.name == "yasaklı-iş-çeviriyo").send({ embeds: [embed.setDescription(`
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
  client.channels.cache.find(x => x.name == "yasaklı-iş-çeviriyo").send({ embeds: [embed.setDescription(`
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