const coin = require("../../schemas/coin");
const moment = require("moment");
const ceza = require("../../schemas/ceza");
const cezapuan = require("../../schemas/cezapuan")
const jailLimit = new Map();
const ms = require("ms")
moment.locale("tr");
const settings = require("../../configs/settings.json")
const { MessageEmbed, Client, Message, MessageActionRow, MessageSelectMenu } = require("discord.js");
const serverSettings =require('../../models/sunucuayar')
const { red, green, Revuu, kirmiziok } = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["cezali","karantina"],
    name: "karantina",
    help: "cezali"
  },

  run: async (client, message, args, embed) => {

    if (!message.guild) return;
    let conf = await serverSettings.findOne({
      guildID: message.guild.id
  });

    if (!message.member.permissions.has(8n) && !conf.jailHammer.some(x => message.member.roles.cache.has(x))) 
    {
    message.react(red)
    message.channel.send({ content :"Yeterli yetkin bulunmuyor!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) { message.channel.send({ content :"Bir üye belirtmelisin!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    message.react(red) 
    return }
    if (conf.jailRole.some(x => member.roles.cache.has(x))) { message.channel.send({ content :"Bu üye zaten jailde!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    message.react(red) 
    return }
    const reason = args.slice(1).join(" ") || "Belirtilmedi!";
    if (message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(embed.setDescription("Kendinle aynı yetkide ya da daha yetkili olan birini jailleyemezsin!"));
    if (!member.manageable) return message.channel.send({ content :"Bu üyeyi jailleyemiyorum!"});
    if (settings.jaillimit > 0 && jailLimit.has(message.author.id) && jailLimit.get(message.author.id) == settings.jaillimit) 
    {
    message.react(red)
    message.channel.send({ content :"Saatlik jail sınırına ulaştın!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { JailAmount: 1 } }, {upsert: true});
    await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
    await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 20 } }, { upsert: true });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
    client.channels.cache.find(x => x.name == "cezapuan_log").send({ content :`${member} üyesi \`jail cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});

    const row = new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setPlaceholder('Kullanıcının Jail Atılma Sebebi?')
          .setCustomId('kurulumselect')
          .addOptions([
          { 
              label: "Cinsellik, taciz ve ağır hakaret - 7 gün",
              description: "7 gün",
              value: "jail1",
              emoji: "1️⃣"
  
          },
          { 
            label: "Sunucu kurallarına uyum sağlamamak - 3 gün",
            description: "3 gün",
            value: "jail2",
            emoji: "2️⃣"
  
          },
            { 
            label: "Sesli/Mesajlı/Ekran P. DM Taciz - 5 gün",
            description: "5 gün",
            value: "jail3",
            emoji: "3️⃣"
  
          },
          { 
            label: "4 Dini, Irki ve Siyasi değerlere Hakaret - 30 gün",
            description: "30 gün",
            value: "jail4",
            emoji: "4️⃣"
  
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
      embed.setDescription(`${member.toString()} isimli kullanıcının jail sebebinizi menüden seçiniz. <t:${Math.floor(Date.now() / 1000)}:R>`)
            
    let msg = await message.channel.send({ components: [row], embeds: [embed] })
            message.react(`${client.emojis.cache.find(x => x.name === "green")}`);
             msg.awaitMessageComponent({ filter: (component) => component.user.id === message.author.id, componentType: 'SELECT_MENU',}).then(async (interaction) => {
             if(interaction.values[0] == "jail1") {
            await interaction.deferUpdate();
  
            member.roles.set(conf.jailRole);
            message.react(green)
            
            const reason = `Cinsellik, taciz ve ağır hakaret`
        
            const time = 1000*60*60*24*7 ;
            const cıkaralım = time + Date.parse(new Date());
            const şuanki = moment(Date.parse(new Date())).format("LLL");
            const sonraki = moment(cıkaralım).format("LLL");
  
                
    const penal = await client.penalize(message.guild.id, member.user.id, "JAIL", true, message.author.id, time);
    message.reply(`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle jaillendi! \`(Ceza ID: #${penal.id})\``)
    message.react(green)
    if (settings.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle jaillendiniz.`).catch(() => {});
    
 
    const log = embed
    client.channels.cache.find(x => x.name == "jail_log").send({ embeds: [embed.setDescription(`
${member.toString()} Adlı Kişiye Jail Atıldı

${Revuu} Jail Atan Kişi : ${message.author} (\`${message.author.id}\`)
${kirmiziok} Ceza Süresi: \`7 Gün\`
${kirmiziok} Ceza atılma tarihi: \`${şuanki}\`
${kirmiziok} Ceza bitiş tarihi: \`${sonraki}\`
${kirmiziok} Ceza Sebebi: \`${reason}\`


      
  
  
  
  `)] });
  msg.edit({ embeds: [row] })}
  interaction.message.delete()	
  
             if(interaction.values[0] == "jail2") {
               await interaction.deferUpdate();
            
               member.roles.set(conf.jailRole);
               message.react(green)
               
               const reason = `Sunucu kurallarına uyum sağlamamak`
           
               const time = 1000*60*60*24*3 ;
               const cıkaralım = time + Date.parse(new Date());
               const şuanki = moment(Date.parse(new Date())).format("LLL");
               const sonraki = moment(cıkaralım).format("LLL");
              
           
               const penal = await client.penalize(message.guild.id, member.user.id, "JAIL", true, message.author.id, time);
               message.reply(`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle jaillendi! \`(Ceza ID: #${penal.id})\``)
               message.react(green)
               if (settings.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle jaillendiniz.`).catch(() => {});
               
            
               const log = embed
    client.channels.cache.find(x => x.name == "jail_log").send({ embeds: [embed.setDescription(`
${member.toString()} Adlı Kişiye Jail Atıldı
           
${Revuu} Jail Atan Kişi : ${message.author} (\`${message.author.id}\`)
${revusome} Ceza Süresi: \`3 Gün\`
${kirmiziok} Ceza atılma tarihi: \`${şuanki}\`
${kirmiziok} Ceza bitiş tarihi: \`${sonraki}\`
${kirmiziok} Ceza Sebebi: \`${reason}\`
           
           
           `)] });
  msg.edit({ embeds: [row] })}
  interaction.message.delete()	
  
  if(interaction.values[0] == "jail3") {
               await interaction.deferUpdate();
            
               member.roles.set(conf.jailRole);
               message.react(green)
               
               const reason = `Sesli/Mesajlı/Ekran P. DM Taciz`
           
               const time = 1000*60*60*24*5 ;
               const cıkaralım = time + Date.parse(new Date());
               const şuanki = moment(Date.parse(new Date())).format("LLL");
               const sonraki = moment(cıkaralım).format("LLL");
              
           
               const penal = await client.penalize(message.guild.id, member.user.id, "JAIL", true, message.author.id, time);
               message.reply(`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle jaillendi! \`(Ceza ID: #${penal.id})\``)
               message.react(green)
               if (settings.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle jaillendiniz.`).catch(() => {});
               
            
               const log = embed
    client.channels.cache.find(x => x.name == "jail_log").send({ embeds: [embed.setDescription(`
${member.toString()} Adlı Kişiye Jail Atıldı
           
${Revuu} Jail Atan Kişi : ${message.author} (\`${message.author.id}\`)
${revusome} Ceza Süresi: \`5 Gün\`
${kirmiziok} Ceza atılma tarihi: \`${şuanki}\`
${kirmiziok} Ceza bitiş tarihi: \`${sonraki}\`
${kirmiziok} Ceza Sebebi: \`${reason}\`
           
           
           `)] });
  msg.edit({ embeds: [row] })}
  interaction.message.delete()	             
  if(interaction.values[0] == "jail4") {
               await interaction.deferUpdate();
            
               member.roles.set(conf.jailRole);
               message.react(green)
               
               const reason = `Dini, Irki ve Siyasi değerlere Hakaret`
           
               const time = 1000*60*60*24*30 ;
               const cıkaralım = time + Date.parse(new Date());
               const şuanki = moment(Date.parse(new Date())).format("LLL");
               const sonraki = moment(cıkaralım).format("LLL");
              
           
               const penal = await client.penalize(message.guild.id, member.user.id, "JAIL", true, message.author.id, time);
               message.reply(`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle jaillendi! \`(Ceza ID: #${penal.id})\``)
               message.react(green)
               if (settings.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle jaillendiniz.`).catch(() => {});
               
            
               const log = embed
    client.channels.cache.find(x => x.name == "jail_log").send({ embeds: [embed.setDescription(`
${member.toString()} Adlı Kişiye Jail Atıldı
           
${Revuu} Jail Atan Kişi : ${message.author} (\`${message.author.id}\`)
${revusome} Ceza Süresi: \`30 Gün\`
${kirmiziok} Ceza atılma tarihi: \`${şuanki}\`
${kirmiziok} Ceza bitiş tarihi: \`${sonraki}\`
${kirmiziok} Ceza Sebebi: \`${reason}\`
           
           
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