const Discord = require("discord.js");
const { MessageEmbed, Message } = require('discord.js')
const config =require('../../models/sunucuayar')
const settings = require('../../configs/settings.json')

const { max } = require("moment");
module.exports = {
    conf: {
      aliases: ["kur", "setup","config"],
      name: "kur",
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
\`\`\`SUNUCU AYARLARI\`\`\`
**tag:** (${ayar.tag ? ayar.tag : "\`YOK\`"})
\`\`\`SUNUCU HAMMER AYARLARI\`\`\`
**teyitciRolleri:** (${ayar.teyitciRolleri.length > 0 ? `${ayar.teyitciRolleri.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**staffs:** (${ayar.staffs.length > 0 ? `${ayar.staffs.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**warnHammer:** (${ayar.warnHammer.length > 0 ? `${ayar.warnHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**banHammer:** (${ayar.banHammer.length > 0 ? `${ayar.banHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**jailHammer:** (${ayar.jailHammer.length > 0 ? `${ayar.jailHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**VipHammer:** (${ayar.VipHammer.length > 0 ? `${ayar.VipHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**cmuteHammer:** (${ayar.cmuteHammer.length > 0 ? `${ayar.cmuteHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**vmuteHammer:** (${ayar.vmuteHammer.length > 0 ? `${ayar.vmuteHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
\`\`\`SUNUCU ROLLERI AYARLARI\`\`\`
**erkekRolleri:** (${ayar.erkekRolleri.length > 0 ? `${ayar.erkekRolleri.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**kizRolleri:** (${ayar.kizRolleri.length > 0 ? `${ayar.kizRolleri.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**vipRole:** (${ayar.vipRole.length > 0 ? `${ayar.vipRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**boosterRolu:** (${ayar.boosterRolu.length > 0 ? `${ayar.boosterRolu.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**unregRoles:** (${ayar.unregRoles.length > 0 ? `${ayar.unregRoles.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
\`\`\`SUNUCU CEZA AYARLARI\`\`\`
**jailRole:** (${ayar.jailRole.length > 0 ? `${ayar.jailRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**VkCezalı:** (${ayar.VkCezalı.length > 0 ? `${ayar.VkCezalı.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**DcCezalı:** (${ayar.DcCezalı.length > 0 ? `${ayar.DcCezalı.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**chatMute:** (${ayar.chatMute.length > 0 ? `${ayar.chatMute.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**voiceMute:** (${ayar.voiceMute.length > 0 ? `${ayar.voiceMute.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**fakeAccRole:** (${ayar.fakeAccRole.length > 0 ? `${ayar.fakeAccRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**reklamRole:** (${ayar.reklamRole.length > 0 ? `${ayar.reklamRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**yasaklıtagRole:** (${ayar.yasaklıtagRole.length > 0 ? `${ayar.yasaklıtagRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**uyariRole:** (${ayar.uyariRole.length > 0 ? `${ayar.uyariRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**katildiRole:** (${ayar.katildiRole.length > 0 ? `${ayar.katildiRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**mazaretliRole:** (${ayar.mazaretliRole.length > 0 ? `${ayar.mazaretliRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**enAltYetkiliRole:** (${ayar.enAltYetkiliRole.length > 0 ? `${ayar.enAltYetkiliRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
`)
            message.channel.send({ embeds: [embed] })
        }

        
        let pusha = await config.findOne({guildID: message.guild.id})

        if(!choose) {
            let ayar = await config.findOne({guildID: message.guild.id})
            message.channel.send(new Discord.MessageEmbed()
            .setTitle(`Ayarlar`, message.author.avatarURL({dynamic: true}))
            .addField(`
\`\`\`OWNER SETTINGS\`\`\``, `

**guildowner:** (${ayar.guildowner.length > 0 ? `${ayar.guildowner.map(x => `<@${x}>`).join(",")}` : "\`YOK\`"})
**rolverici:** (${ayar.rolverici.length > 0 ? `${ayar.rolverici.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**sahipRolu:** (${ayar.sahipRolu.length > 0 ? `${ayar.sahipRolu.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})

**ceo:** (${ayar.ceo.length > 0 ? `${ayar.ceo.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})

`)

.addField(`
\`\`\`KORUMA SETTINGS\`\`\``, `


**ceo:** (${ayar.ceo.length > 0 ? `${ayar.ceo.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**owner:** (${ayar.owner.length > 0 ? `${ayar.owner.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**yıldız** (${ayar.yıldız.length > 0 ? `${ayar.yıldız.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
`)

           .addField(`
\`\`\`FAMİLY SETTINGS\`\`\``, `

**tag:** (${ayar.tag ? ayar.tag : "\`YOK\`"}) 
**ikinciTag:** (${ayar.ikinciTag ? ayar.ikinciTag : "\`YOK\`"})
**ekipRolu:** (${ayar.ekipRolu.length > 0 ? `${ayar.ekipRolu.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
`)
.addField(`
\`\`\`YETKİLİ SETTINGS\`\`\``, `

`)
.addField(`
\`\`\`SUNUCU SETTINGS\`\`\``, `


**çekilis:** (${ayar.çekilis.length > 0 ? `${ayar.çekilis.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**etkinlik:** (${ayar.etkinlik.length > 0 ? `${ayar.etkinlik.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**film:** (${ayar.film.length > 0 ? `${ayar.film.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})

`)

.addField(`
\`\`\`CEZA SETTINGS\`\`\``, `

`)

.addField(`
\`\`\`TOPLANTİ SETTINGS\`\`\``, `

**uyariRole:** (${ayar.uyariRole.length > 0 ? `${ayar.uyariRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**katildiRole:** (${ayar.katildiRole.length > 0 ? `${ayar.katildiRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**mazaretliRole:** (${ayar.mazaretliRole.length > 0 ? `${ayar.mazaretliRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
**enAltYetkiliRole:** (${ayar.enAltYetkiliRole.length > 0 ? `${ayar.enAltYetkiliRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
`)

           .setColor('RANDOM')
            .setThumbnail(message.guild.iconURL({dynamic: true})))
        }

        let ramal = await config.findOne({guildID: message.guild.id})

        if (["guildowner"].some(x => x === choose)) {
            let rol;
            if (message.mentions.users.size >= 1) {
                rol = message.mentions.users.map(r => r.id);
            } else {
                if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucunun ownerlarını belirtmelisin`, message.author, message.channel))
                rol = args.splice(0, 1).map(id => message.guild.users.cache.get(id)).filter(r => r != undefined);
            }
            ramal.guildowner = rol, ramal.save(), message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucunun ownerları başarıyla ${rol.map(x => `<@${x}>`)} olarak ayarlandı`, message.author, message.channel))
        };

        if(["rolverici"].some(x => x === choose)) {
            let rol;
            if (message.mentions.roles.size >= 1) {
                rol = message.mentions.roles.map(r => r.id);
            } else {
                if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu rolverici komut yetkili rolünü belirtmelisin`, message.author, message.channel))
                rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
            }
            ramal.rolverici = rol, await ramal.save() 
            message.reply(`Başarılı bir şekilde \`RolVerici\` rolü config dosyasına ${rol.map(x => `<@&${x}>`)} olarak ayarlandı!`)
        }

        if(["sahiprolu"].some(x => x === choose)) {
            let rol;
            if (message.mentions.roles.size >= 1) {
                rol = message.mentions.roles.map(r => r.id);
            } else {
                if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu SahipRolü rolünü belirtmelisin`, message.author, message.channel))
                rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
            }
            ramal.sahipRolu = rol, await ramal.save() 
            message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu SahipRolü rolünü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
        }


        if (["tag"].some(x => x === choose)) {
            let select = args[1];
            if (!select) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucunun tagını belirtmelisin`, message.author, message.channel))
            ramal.tag = select, ramal.save(), message.reply(`Başarılı bir şekilde \`Tag\` rolü config dosyasına ${select} olarak ayarlandı!`)
        };

        if (["ikinciTag","tag2"].some(x => x === choose)) {
            let select = args[1];
            if (!select) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucunun ikinci tagını belirtmelisin`, message.author, message.channel))
            ramal.ikinciTag = select, ramal.save(), message.reply(`Başarılı bir şekilde \`Ikinci Tag\` rolü config dosyasına ${select} olarak ayarlandı!`)
        };

        if(["ekiprolu","team"].some(x => x === choose)) {
            let rol;
            if (message.mentions.roles.size >= 1) {
                rol = message.mentions.roles.map(r => r.id);
            } else {
                if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu ekip rolünü belirtmelisin`, message.author, message.channel))
                rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
            }
            ramal.ekipRolu = rol, await ramal.save() 
            message.reply(`Başarılı bir şekilde \`Family\` rolü config dosyasına ${rol.map(x => `<@&${x}>`)} olarak ayarlandı!`)
        }
    
        if(["staffs"].some(x => x === choose)) {
            let rol;
            if (message.mentions.roles.size >= 1) {
                rol = message.mentions.roles.map(r => r.id);
            } else {
                if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu staffs komut yetkili rolünü belirtmelisin`, message.author, message.channel))
                rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
            }
            ramal.staffs = rol, await ramal.save() 
            message.reply(`Başarılı bir şekilde \`Staffs\` rolü config dosyasına ${rol.map(x => `<@&${x}>`)} olarak ayarlandı!`)
        }
        
        if(["teyitciRolleri","registerian"].some(x => x === choose)) {
            let rol;
            if (message.mentions.roles.size >= 1) {
                rol = message.mentions.roles.map(r => r.id);
            } else {
                if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu staffs komut yetkili rolünü belirtmelisin`, message.author, message.channel))
                rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
            }
            ramal.teyitciRolleri = rol, await ramal.save() 
            message.reply(`Başarılı bir şekilde \`Register Hammer\` rolü config dosyasına ${rol.map(x => `<@&${x}>`)} olarak ayarlandı!`)
        }

        if(["warnhammer"].some(x => x === choose)) {
            let rol;
            if (message.mentions.roles.size >= 1) {
                rol = message.mentions.roles.map(r => r.id);
            } else {
                if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu warnHammer komut yetkili rolünü belirtmelisin`, message.author, message.channel))
                rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
            }
            ramal.warnHammer = rol, await ramal.save() 
            message.reply(`Başarılı bir şekilde \`Warn Hammer\` rolü config dosyasına ${rol.map(x => `<@&${x}>`)} olarak ayarlandı!`)
        }

        if(["banhammer"].some(x => x === choose)) {
            let rol;
            if (message.mentions.roles.size >= 1) {
                rol = message.mentions.roles.map(r => r.id);
            } else {
                if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu banHammer komut yetkili rolünü belirtmelisin`, message.author, message.channel))
                rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
            }
            ramal.banHammer = rol, await ramal.save() 
            message.reply(`Başarılı bir şekilde \`Ban Hammer\` rolü config dosyasına ${rol.map(x => `<@&${x}>`)} olarak ayarlandı!`)
        }

        if(["jailhammer"].some(x => x === choose)) {
            let rol;
            if (message.mentions.roles.size >= 1) {
                rol = message.mentions.roles.map(r => r.id);
            } else {
                if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu jailHammer komut yetkili rolünü belirtmelisin`, message.author, message.channel))
                rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
            }
            ramal.jailHammer = rol, await ramal.save() 
            message.reply(`Başarılı bir şekilde \`Jail Hammer\` rolü config dosyasına ${rol.map(x => `<@&${x}>`)} olarak ayarlandı!`)
        }

        if(["viphammer"].some(x => x === choose)) {
            let rol;
            if (message.mentions.roles.size >= 1) {
                rol = message.mentions.roles.map(r => r.id);
            } else {
                if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu VipHammer komut yetkili rolünü belirtmelisin`, message.author, message.channel))
                rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
            }
            ramal.VipHammer = rol, await ramal.save() 
            message.reply(`Başarılı bir şekilde \`Vip Hammer\` rolü config dosyasına ${rol.map(x => `<@&${x}>`)} olarak ayarlandı!`)
        }

        if(["cmutehammer","mutehammer"].some(x => x === choose)) {
            let rol;
            if (message.mentions.roles.size >= 1) {
                rol = message.mentions.roles.map(r => r.id);
            } else {
                if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu cmuteHammer komut yetkili rolünü belirtmelisin`, message.author, message.channel))
                rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
            }
            ramal.cmuteHammer = rol, await ramal.save() 
            message.reply(`Başarılı bir şekilde \`Mute Hammer\` rolü config dosyasına ${rol.map(x => `<@&${x}>`)} olarak ayarlandı!`)
        }

        if(["vmutehammer"].some(x => x === choose)) {
            let rol;
            if (message.mentions.roles.size >= 1) {
                rol = message.mentions.roles.map(r => r.id);
            } else {
                if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu vmuteHammer komut yetkili rolünü belirtmelisin`, message.author, message.channel))
                rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
            }
            ramal.vmuteHammer = rol, await ramal.save() 
            message.reply(`Başarılı bir şekilde \`Voice Mute Hammer\` rolü config dosyasına ${rol.map(x => `<@&${x}>`)} olarak ayarlandı!`)
        }

    if(["erkekRolleri","man"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu erkek rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
    ramal.erkekRolleri = rol, await ramal.save() 
    message.reply(`Başarılı bir şekilde \`Erkek\` rolü config dosyasına ${rol.map(x => `<@&${x}>`)} olarak ayarlandı!`)
}

if(["kizRolleri","woman"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu kadın rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
    ramal.kizRolleri = rol, await ramal.save() 
    message.reply(`Başarılı bir şekilde \`Kadın\` rolü config dosyasına ${rol.map(x => `<@&${x}>`)} olarak ayarlandı!`)
}

if(["vipRole","vip"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu vipRole rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     ramal.vipRole = rol, await ramal.save() 
     message.reply(`Başarılı bir şekilde \`Vip\` rolü config dosyasına ${rol.map(x => `<@&${x}>`)} olarak ayarlandı!`)
}

if(["boosterRolu","booster"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu Booster rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     ramal.boosterRolu = rol, await ramal.save() 
     message.reply(`Başarılı bir şekilde \`Booster\` rolü config dosyasına ${rol.map(x => `<@&${x}>`)} olarak ayarlandı!`)
}

if(["unregRoles","unregister"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu kayıtsız rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     ramal.unregRoles = rol, await ramal.save() 
     message.reply(`Başarılı bir şekilde \`Kayıtsız\` rolü config dosyasına ${rol.map(x => `<@&${x}>`)} olarak ayarlandı!`)
}

if(["çekilis","cekilis"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu çekilis rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     ramal.çekilis = rol, await ramal.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu çekilis rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}


if(["etkinlik"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu etkinlik rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     ramal.etkinlik = rol, await ramal.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu etkinlik rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["film"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu film rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     ramal.film = rol, await ramal.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu film rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["jailRole","jail"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu jailRole rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     ramal.jailRole = rol, await ramal.save() 
     message.reply(`Başarılı bir şekilde \`Cezalı\` rolü config dosyasına ${rol.map(x => `<@&${x}>`)} olarak ayarlandı!`)
}

if(["VkCezalı"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu VkCezalı rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     ramal.VkCezalı = rol, await ramal.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu VkCezalı rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["DcCezalı"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu DcCezalı rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     ramal.DcCezalı = rol, await ramal.save() 
     message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu DcCezalı rolü başarıyla ${rol.map(x => `<@&${x}>`)} olarak ayarlandı`, message.author, message.channel))
}

if(["chatMute","mute"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu chatMute rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     ramal.chatMute = rol, await ramal.save() 
     message.reply(`Başarılı bir şekilde \`Chat Muted\` rolü config dosyasına ${rol.map(x => `<@&${x}>`)} olarak ayarlandı!`)
}

if(["voiceMute","vmute"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu voiceMute rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     ramal.voiceMute = rol, await ramal.save() 
     message.reply(`Başarılı bir şekilde \`Voice Muted\` rolü config dosyasına ${rol.map(x => `<@&${x}>`)} olarak ayarlandı!`)
}

if(["fakeAccRole","supheli"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu fakeAccRole rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     ramal.fakeAccRole = rol, await ramal.save() 
     message.reply(`Başarılı bir şekilde \`Şüpheli Hesap\` rolü config dosyasına ${rol.map(x => `<@&${x}>`)} olarak ayarlandı!`)
}

if(["reklamRole"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu reklamRole rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     ramal.reklamRole = rol, await ramal.save() 
     message.reply(`Başarılı bir şekilde \`Reklam\` rolü config dosyasına ${rol.map(x => `<@&${x}>`)} olarak ayarlandı!`)
}

if(["yasaklıtagRole"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu yasaklıtagRole rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     ramal.yasaklıtagRole = rol, await ramal.save() 
     message.reply(`Başarılı bir şekilde \`Yasaklı Tag\` rolü config dosyasına ${rol.map(x => `<@&${x}>`)} olarak ayarlandı!`)
}

if(["uyariRole"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu uyariRole rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     ramal.uyariRole = rol, await ramal.save() 
     message.reply(`Başarılı bir şekilde \`Uyarı\` rolü config dosyasına ${rol.map(x => `<@&${x}>`)} olarak ayarlandı!`)
}

if(["katildiRole"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu katildiRole rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     ramal.katildiRole = rol, await ramal.save() 
     message.reply(`Başarılı bir şekilde \`Katıldı\` rolü config dosyasına ${rol.map(x => `<@&${x}>`)} olarak ayarlandı!`)
}

if(["mazaretliRole"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu mazaretliRole rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     ramal.mazaretliRole = rol, await ramal.save() 
     message.reply(`Başarılı bir şekilde \`Mazaretli\` rolü config dosyasına ${rol.map(x => `<@&${x}>`)} olarak ayarlandı!`)
}

if(["enAltYetkiliRole"].some(x => x === choose)) {
    let rol;
    if (message.mentions.roles.size >= 1) {
        rol = message.mentions.roles.map(r => r.id);
    } else {
        if (!rol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sunucu enAltYetkiliRole rolünü belirtmelisin`, message.author, message.channel))
        rol = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
     ramal.enAltYetkiliRole = rol, await ramal.save() 
     message.reply(`Başarılı bir şekilde \`EnAltYetki\` rolü config dosyasına ${rol.map(x => `<@&${x}>`)} olarak ayarlandı!`)
}



      
    }
}

