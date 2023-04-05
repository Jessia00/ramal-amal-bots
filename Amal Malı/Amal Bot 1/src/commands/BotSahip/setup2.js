const Discord = require("discord.js");
const { MessageEmbed, Message } = require('discord.js')
const config =require('../../models/sunucuayar')
const settings = require('../../configs/settings.json')

const { max } = require("moment");
module.exports = {
    conf: {
      aliases: ["kur2", "setup2","config2"],
      name: "kur2",
    },

    run: async (client, message, args, embed, prefix) => {
        if(!settings.owners.includes(message.author.id)) return
        let choose = args[0]

        if(choose === "help") {
            let komutlarEmbed = new Discord.MessageEmbed()
            .setColor("5302b0")
            .setAuthor(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true })})
            .setFooter("© Developed By Ramal")
            .setTimestamp() // Meriaz ADAMDIR 
            .setDescription(`
\`\`\`SUNUCU AYARLARI\`\`\`
Ramal \`(.setup ramal <@ramal>)\`
Sunucu owner \`(.setup guildowner <@user>)\` 
Sunucu Tag \`(.setup tag <serverTAG>)\`
Sunucu Untag \`(.setup tag2 <serverTAG>)\`
Sunucu link \`(.setup link <Sunucu urlsi>)\`
\`\`\`KANAL AYARLARI\`\`\`
Genel Sohbet \`(.setup chat <#Kanal/ID>)\`
Teyit Kanalı \`(.setup register <#Kanal/ID>)\`
Register Log \`(.setup registerlog <#Kanal/ID>)\`
Bot Ses \`(.setup botvoicechannel <#Kanal/ID>)\`
Rolyönet Log \`(.setup rolyonetlog <#Kanal/ID>)\`
Komut Engeli \`(.setup komutengellog <#Kanal/ID>)\`
Tag Log (+) Kanalı \`(.setup tagllog <#Kanal/ID>)\`
Tag Log2 (-) Kanalı \`(.setup tagllog2 <#Kanal/ID>)\`
Yetkili (-) Kanalı \`(.setup authleavelog <#Kanal/ID>)\`
Voicemute Log \`(.setup voicemutelog <#Kanal/ID>)\`
Sağtıkcezakaldırma Log \`(.setup sagtikcezakaldirma <#Kanal/ID>)\`
BannedTag Log \`(.setup bannedtaglog <#Kanal/ID>)\`
Register Parent \`(.setup registerparent <#Kanal/ID>)\`
Public Parent \`(.setup publicparent <#Kanal/ID>)\`
Ban Log \`(.setup banlog <#Kanal/ID>)\`
Jail Log \`(.setup jaillog <#Kanal/ID>)\`
CezaPuan Log Kanalı \`(.setup cezapuan <#Kanal/ID>)\`
Chatmute Log Kanalı \`(.setup chatmutelog <#Kanal/ID>)\`
UnBan Log Kanalı \`(.setup unbanlog <#Kanal/ID>)\`
Rol Log Kanalı \`(.setup rollog <#Kanal/ID>)\`
StreamCezalı Log Kanalı \`(.setup streamcezalilog <#Kanal/ID>)\`
Stream Kanalı \`(.setup streamchannels <#Kanal/ID>)\`
Afk Ses Kanalı \`(.setup afkroom <#Kanal/ID>)\`
\`\`\`ROl AYARLARI\`\`\`
Kayıtsız Rolü \`(.setup unregister <#Rol/ID>)\`
Kadın Rolleri \`(.setup woman <#Rol/ID>)\`
Erkek Rolleri \`(.setup man <#Rol/ID>)\`
Vip Rolü \`(.setup vip <#Rol/ID>)\`
Booster Rolü \`(.setup booster <#Rol/ID>)\`
YasaklıTag Rolü \`(.setup yasaklıtagrolü <#Rol/ID>)\`
ŞüpheliHesapRolü \`(.setup şüphelirolü <#Rol/ID>)\`
Taglı Rolü \`(.setup team <#Rol/ID>)\`
ChatMuted Rolü \`(.setup chatmuterole <#Rol/ID>)\`
Karantina Rolü \`(.setup karantinarole <#Rol/ID>)\`
Reklamcı Rolü \`(.setup adsrole <#Rol/ID>)\`
1.Uyarı Rolü \`(.setup warnroleone <#Rol/ID>)\`
2.Uyarı Rolü \`(.setup warnroletwo <#Rol/ID>)\`  
3.Uyarı Rolü \`(.setup warnrolethree <#Rol/ID>)\`                      
Katıldı Rol \`(.setup joinmeetrole <#Rol/ID>)\`     
StreamCezalı Rol \`(.setup streampunitiverole <#Rol/ID>)\` 
\`\`\`PERM AYARLARI\`\`\`
Register Hammer \`(.setup registerhammer <#Rol/ID>)\` 
EnÜstYetkili \`(.setup ustyetkili <#Rol/ID>)\` 
BotKomut Rol \`(.setup botcommandrole <#Rol/ID>)\`
Transport Rol \`(.setup moveauth <#Rol/ID>)\`
Jail Hammer \`(.setup jailhammer <#Rol/ID>)\`
Ban Hammer \`(.setup banhammer <#Rol/ID>)\`
Mute Hammer \`(.setup mutehammer <#Rol/ID>)\`
RolManageAuth \`(.setup rolemanageauth <#Rol/ID>)\`
VMute Hammer \`(.setup vmutehammer <#Rol/ID>)\`
Yönetim Rolleri \`(.setup yonetimrol <#Rol/ID>)\`
`)//9
message.channel.send({ embeds: [komutlarEmbed] })
                }

        if(!choose) {
            let ayar = await config.findOne({guildID: message.guild.id})
            let embed = new Discord.MessageEmbed()
            .setColor("#020202")
            .setAuthor(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setFooter("© Developed By Ramal")
            .setTimestamp() // Ramal ADAMDIR 
.setDescription(`
\`\`\`SUNUCU REGİSTER LOG\`\`\`
**teyitKanali:** (${ayar.teyitKanali.length ? `<#${ayar.teyitKanali}>` : "\`YOK\`"})
**invLogChannel:** (${ayar.invLogChannel.length ? `<#${ayar.invLogChannel}>` : "\`YOK\`"})
\`\`\`SUNUCU CEZA LOG\`\`\`
**cezapuanlog:** (${ayar.cezapuanlog.length ? `<#${ayar.cezapuanlog}>` : "\`YOK\`"})
**transportlog:** (${ayar.transportlog.length ? `<#${ayar.transportlog}>` : "\`YOK\`"})
**jailLogChannel:** (${ayar.jailLogChannel.length ? `<#${ayar.jailLogChannel}>` : "\`YOK\`"})
**banLogChannel:** (${ayar.banLogChannel.length ? `<#${ayar.banLogChannel}>` : "\`YOK\`"})
**warnLogChannel:** (${ayar.warnLogChannel.length ? `<#${ayar.warnLogChannel}>` : "\`YOK\`"})
**reklamLogChannel:** (${ayar.reklamLogChannel.length ? `<#${ayar.reklamLogChannel}>` : "\`YOK\`"})
**cmuteLogChannel:** (${ayar.cmuteLogChannel.length ? `<#${ayar.cmuteLogChannel}>` : "\`YOK\`"})
**vmuteLogChannel:** (${ayar.vmuteLogChannel.length ? `<#${ayar.vmuteLogChannel}>` : "\`YOK\`"})
**ekipLogChannel:** (${ayar.ekipLogChannel.length ? `<#${ayar.ekipLogChannel}>` : "\`YOK\`"})
**yetkiLog:** (${ayar.yetkiLog.length ? `<#${ayar.yetkiLog}>` : "\`YOK\`"})
**marketLog:** (${ayar.marketLog.length ? `<#${ayar.marketLog}>` : "\`YOK\`"})
`)
            message.channel.send({ embeds: [embed] })
        }

        let ramal = await config.findOne({guildID: settings.guildID})


        if(["publicParents"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`SunucuPublicParent belirtmelisin`, message.author, message.channel))
            ramal.publicParents  = log.id, await ramal.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu PublicParent başarıyla ${log} olarak ayarlandı`, message.author, message.channel))
        };

        if(["privateParents"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu privateParents belirtmelisin`, message.author, message.channel))
            ramal.privateParents = log.id, await ramal.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu privateParents başarıyla ${log} olarak ayarlandı`, message.author, message.channel))
        };

        if(["aloneParents"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu aloneParents belirtmelisin`, message.author, message.channel))
            ramal.aloneParents = log.id, await ramal.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu aloneParents başarıyla ${log} olarak ayarlandı`, message.author, message.channel))
        };

        if(["funParents"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu funParents belirtmelisin`, message.author, message.channel))
            ramal.funParents = log.id, await ramal.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu funParents başarıyla ${log} olarak ayarlandı`, message.author, message.channel))
        };

        if(["registerParents",].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu registerParents belirtmelisin`, message.author, message.channel))
            ramal.registerParents = log.id, await ramal.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu registerParents başarıyla ${log} olarak ayarlandı`, message.author, message.channel))
        };

        if(["chatChannel","chat"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu chatChannel belirtmelisin`, message.author, message.channel))
            ramal.chatChannel = log.id, await ramal.save(), message.reply(`Başarılı bir şekilde \`Genel Sohbet\` Kanalını config dosyasına ${log} olarak ayarlandı!`)
        };

        if(["kurallar"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu kurallar belirtmelisin`, message.author, message.channel))
            ramal.kurallar = log.id, await ramal.save(), message.reply(`Başarılı bir şekilde \`Kurallar\` Kanalını config dosyasına ${log} olarak ayarlandı!`)
        };

        if(["cezapuanlog"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu cezapuanlog belirtmelisin`, message.author, message.channel))
            ramal.cezapuanlog = log.id, await ramal.save(), message.reply(`Başarılı bir şekilde \`Cezapuan Log\` Kanalını config dosyasına ${log} olarak ayarlandı!`)
        };

        if(["transportlog"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu transportlog belirtmelisin`, message.author, message.channel))
            ramal.transportlog = log.id, await ramal.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu transportlog başarıyla ${log} olarak ayarlandı`, message.author, message.channel))
        };

        if(["jailLogChannel","jaillog"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu jailLogChannel belirtmelisin`, message.author, message.channel))
            ramal.jailLogChannel = log.id, await ramal.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu jailLogChannel başarıyla ${log} olarak ayarlandı`, message.author, message.channel))
        };

        if(["banLogChannel","banlog"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu banLogChannel belirtmelisin`, message.author, message.channel))
            ramal.banLogChannel = log.id, await ramal.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu banLogChannel başarıyla ${log} olarak ayarlandı`, message.author, message.channel))
        };

        if(["warnLogChannel","warnlog"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu warnLogChannel belirtmelisin`, message.author, message.channel))
            ramal.warnLogChannel = log.id, await ramal.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu warnLogChannel başarıyla ${log} olarak ayarlandı`, message.author, message.channel))
        };

        if(["reklamLogChannel"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu reklamLogChannel belirtmelisin`, message.author, message.channel))
            ramal.reklamLogChannel = log.id, await ramal.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu reklamLogChannel başarıyla ${log} olarak ayarlandı`, message.author, message.channel))
        };

        if(["cmuteLogChannel","mutelog"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu cmuteLogChannel belirtmelisin`, message.author, message.channel))
            ramal.cmuteLogChannel = log.id, await ramal.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu cmuteLogChannel başarıyla ${log} olarak ayarlandı`, message.author, message.channel))
        };

        if(["vmuteLogChannel","vmutelog"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu vmuteLogChannel belirtmelisin`, message.author, message.channel))
            ramal.vmuteLogChannel = log.id, await ramal.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu vmuteLogChannel başarıyla ${log} olarak ayarlandı`, message.author, message.channel))
        };

        if(["invLogChannel","invite"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu invLogChannel belirtmelisin`, message.author, message.channel))
            ramal.invLogChannel = log.id, await ramal.save(), message.reply(`Başarılı bir şekilde \`Invie Log\` Kanalı config dosyasına ${log} olarak ayarlandı!`)
        };

        if(["teyitKanali","register"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu teyitKanali belirtmelisin`, message.author, message.channel))
            ramal.teyitKanali = log.id, await ramal.save(), message.reply(`Başarılı bir şekilde \`TeyitKanali\` rolü config dosyasına ${log} olarak ayarlandı!`)
        };

        if(["ekipLogChannel","taglog"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu ekipLogChannel belirtmelisin`, message.author, message.channel))
            ramal.ekipLogChannel = log.id, await ramal.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu ekipLogChannel başarıyla ${log} olarak ayarlandı`, message.author, message.channel))
        };

        if(["yetkiLog"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu yetkiLog belirtmelisin`, message.author, message.channel))
            ramal.yetkiLog = log.id, await ramal.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu yetkiLog başarıyla ${log} olarak ayarlandı`, message.author, message.channel))
        };


        if(["marketLog"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu marketLog belirtmelisin`, message.author, message.channel))
            ramal.marketLog = log.id, await ramal.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu marketLog başarıyla ${log} olarak ayarlandı`, message.author, message.channel))
        };


        if(["toplantiSesChannel"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu toplantiSesChannel belirtmelisin`, message.author, message.channel))
            ramal.toplantiSesChannel = log.id, await ramal.save(),
            message.reply(`Başarılı bir şekilde \`Toplantı Ses\` Kanalı config dosyasına ${log} olarak ayarlandı!`)
        };

        if(["mazaretliLogChannel"].some(x => x === choose)) {
            let log = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!log) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu mazaretliLogChannel belirtmelisin`, message.author, message.channel))
            ramal.mazaretliLogChannel = log.id, await ramal.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu mazaretliLogChannel başarıyla ${log} olarak ayarlandı`, message.author, message.channel))
        };





      
    }
}
