const Discord = require("discord.js");
const { MessageEmbed, Message } = require('discord.js')
const config =require('../../models/sunucuayar')
const settings = require('../../configs/settings.json')

const { max } = require("moment");
module.exports = {
    conf: {
      aliases: ["ramall", "kurulums","kurr"],
      name: "ramal",
    },   

    run: async (client, message, args, embed, prefix) => {
        if(!settings.owners.includes(message.author.id)) return
        let choose = args[0]

        const row = new Discord.MessageActionRow()
        .addComponents(new Discord.MessageSelectMenu()
        .setPlaceholder('Kuruluma Başla!')
        .setCustomId('kurulumselect')
        .addOptions([
        { label: "Sunucu Kurulum Bilgilendirme", description: "sunucu kurulum komutları hakkında bilgi almanzı sağlar.", value: "kurulum1" }, 
        { label: "Setup Kurulum Bilgilendirme", description: "Setup kurulum komutları hakkında bilgi almanzı sağlar.", value: "kurulum2" }, 
        { label: "Sunucu Kurulum Liste", description: "Rol kurulum listesindeki kayıtlı verileri gösterir.", value: "kurulum3" }, 
        { label: "Sunucu Kurulum Liste", description: "Kanal kurulum listesindeki kayıtlı verileri gösterir.", value: "kurulum4" }, 
        { label: "Sunucu Kurulum Liste", description: "Kategori kurulum listesindeki kayıtlı verileri gösterir.", value: "kurulum5" }]));

        let kurulum = await message.channel.send({
            components: [row], embeds:
                [embed.setDescription(`${message.guild.name} Sunucusu içerisinde sunucu kurulum komutları hakkında bilgilendirme almak için aşağdaki menüyü kullanabilisiniz`
                )]
        })

        kurulum.awaitMessageComponent({ filter: (component) => component.user.id === message.author.id, componentType: 'SELECT_MENU', }).then(async (interaction) => {

            if (interaction.values[0] == "kurulum1") {
                if (kurulum) kurulum.delete(); await interaction.channel.send({
                    embeds: [embed.setDescription(`\`\`\`Server Bilgileri\`\`\`
                    Guild Owner \`(.config guildowner @User/ID)\`
                    Sunucu Tag \`(.config tag <serverTAG>\`
                    Sunucu Untag \`(.config tag2 <serverTAG>)\`
                    Rol Verici \`(.config rolverici <serverTAG>\`
                    Sunucu Urlsi \`(.config link <serverLINK>)\`
                    \`\`\`Sunucu İçi Kanal Ayarları\`\`\`
                    Genel Sohbet \`(.config chat #Kanal/ID)\`
                    Teyit Kanalı \`(.config register #Kanal/ID)\`
                    İnvite Kanalı \`(.config invite #Kanal/ID)\`
                    Kurallar \`(.config kurallar #Kanal/ID)\`
                    Tag Log \`(.config2 taglog #Kanal/ID)\`
                    Mute Log \`(.config2 mutelog #Kanal/ID)\`
                    Vmute Log \`(.config2 vmutelog #Kanal/ID)\`
                    Jail Log \`(.config2 jaillog #Kanal/ID)\`
                    Warn Log \`(.config2 warnlog #Kanal/ID)\`
                    Reklam Log \`(.config2 reklamlog #Kanal/ID)\`
                    Ban Log \`(.config2 banlog #Kanal/ID)\`
                    Rol Log \`(.config2 rollog #Kanal/ID)\`
                    \`\`\`Sunucu İçi Rol Ayarları\`\`\`
                    Vk Yöneticisi Rolü \`(.config vkyönetici @Rol/ID)\`
                    Kayıtsız Rolleri \`(.config unregister @Rol/ID)\`
                    Erkek Rolleri \`(.config man @Rol/ID)\`
                    Kadın Rolleri \`(.config woman @Rol/ID)\`
                    Taglı Rolü \`(.config team @Rol/ID)\`
                    Booster Rolü \`(.config booster @Rol/ID)\`
                    Cezalı Rolü \`(.config jail @Rol/ID)\`
                    Reklam cezalı Rolü \`(.config reklam @Rol/ID)\`
                    Şüpheli Hesap Rolü \`(.config supheli @Rol/ID)\`
                    Yasaklı Tag Rolü \`(.config bantag @Rol/ID)\`
                    Mute Rolü \`(.config mute @Rol/ID)\`
                    Vmute Rolü \`(.config vmute @Rol/ID)\`
                    Vk Cezalı Rolü \`(.config vkcezalı @Rol/ID)\`
                    Dc Cezalı Rolü \`(.config dccezalı @Rol/ID)\`
                    \`\`\`Sunucu İçi Hammer Rol Ayarları\`\`\`
                    Registerian \`(.config registerian @Rol/ID)\`
                    Mute Hammer \`(.config mutehammer @Rol/ID)\`
                    Vmute Hammer \`(.config vmutehammer @Rol/ID)\`
                    Jail Hammer \`(.config jailhammer @Rol/ID)\`
                    Warn Hammer \`(.config warnhammer @Rol/ID)\`
                    Ban Hammer \`(.config banhammer @Rol/ID)\``)]})}
                   
            if (interaction.values[0] == "kurulum2") {
                if (kurulum) kurulum.delete(); await interaction.channel.send({
                    embeds: [embed.setDescription(`deneme`)]})}

            if (interaction.values[0] == "kurulum3") {
               
                let teyitciRolleri = ramal.teyitciRolleri ? `<@&${ramal.teyitciRolleri}>` : `Yok`;
                let cmuteHammer = ramal.cmuteHammer ? `<@&${ramal.cmuteHammer}>` : `Yok`;
                let vmuteHammer = ramal.vmuteHammer ? `<@&${ramal.vmuteHammer}>` : `Yok`;
                let banHammer = ramal.banHammer ? `<@&${ramal.banHammer}>` : `Yok`;
                let jailHammer = ramal.jailHammer ? `<@&${ramal.jailHammer}>` : `Yok`;
                let warnHammer = ramal.warnHammer ? `<@&${ramal.warnHammer}>` : `Yok`;
                let staffs = ramal.staffs ? `<@&${ramal.staffs}>` : `Yok`;
                let erkekRolleri = ramal.erkekRolleri ? `<@&${ramal.erkekRolleri}>` : `Yok`;
                let kizRolleri = ramal.kizRolleri ? `<@&${ramal.kizRolleri}>` : `Yok`;
                let unregRoles = ramal.unregRoles ? `<@&${ramal.unregRoles}>` : `Yok`;
                let vipRole = ramal.vipRole ? `<@&${ramal.vipRole}>` : `Yok`;
                let boosterRolu = ramal.boosterRolu ? `<@&${ramal.boosterRolu}>` : `Yok`;
                let chatMute = ramal.chatMute ? `<@&${ramal.chatMute}>` : `Yok`;
                let voiceMute = ramal.voiceMute ? `<@&${ramal.voiceMute}>` : `Yok`;
                let jailRole = ramal.jailRole ? `<@&${ramal.jailRole}>` : `Yok`;
                let fakeAccRole = ramal.fakeAccRole ? `<@&${ramal.fakeAccRole}>` : `Yok`;
                let reklamRole = ramal.reklamRole ? `<@&${ramal.reklamRole}>` : `Yok`;
                let yasaklıtagRole = ramal.yasaklıtagRole ? `<@&${ramal.yasaklıtagRole}>` : `Yok`;
                let ekipRolu = ramal.ekipRolu ? `<@&${ramal.ekipRolu}>` : `Yok`;

                if (kurulum) kurulum.delete(); await interaction.channel.send({
                    embeds: [embed.setDescription(`
                    \`\`\`Sunucu Hammer Rolleri\`\`\`Sunucu ID: **${message.guild.id}**\nSunucu İsim: **${message.guild.name}**\nRegister Hammer (${teyitciRolleri})
                    Staffs (${staffs})
                    cMute Hammer (${cmuteHammer})
                    vMute Hammer (${vmuteHammer})
                    Ban Hammer (${banHammer})
                    Jail Hammer (${jailHammer})
                    Warn Hammer (${warnHammer})
                    \`\`\`Sunucu Rolleri\`\`\`Kayıtsız Rolleri (${unregRoles})
                    Erkek Rolleri (${erkekRolleri})
                    Kadın Rolleri (${kizRolleri})
                    Taglı Rolleri (${ekipRolu})
                    Vip Rolleri (${vipRole})
                    Booster Rolleri (${boosterRolu})
                    \`\`\`Sunucu Ceza Rolleri\`\`\`cMute Rolü (${chatMute})
                    vMute Rolü (${voiceMute})
                    Jail Rolü (${jailRole})
                    Şüpheli Rolü (${fakeAccRole})
                    Reklam Rolü (${reklamRole})
                    Yasaklıtag Rolü (${yasaklıtagRole})`)]})}

                    if (interaction.values[0] == "kurulum4") {
                       
                        let jaillog = ramal.jailLog ? `<#${ramal.jailLog}>` : `${emojis.iptal}`;

                        if (kurulum) kurulum.delete(); await interaction.channel.send({
                            embeds: [embed.setDescription(`
                            \`\`\`Sunucu Bilgileri\`\`\`Sunucu ID: **${message.guild.id}**\nSunucu İsim: **${message.guild.name}**\nkayıt Rolleri (${teyitciRolleri}`)]})}
        

                    if (interaction.values[0] == "kurulum5") {
                    
let teyitciRolleri = ramal.teyitciRolleri ? `<@&${ramal.teyitciRolleri}>` : `Yok`;

if (kurulum) kurulum.delete(); await interaction.channel.send({
    embeds: [embed.setDescription(`
    \`\`\`Sunucu Bilgileri\`\`\`Sunucu ID: **${message.guild.id}**\nSunucu İsim: **${message.guild.name}**\nkayıt Rolleri (${teyitciRolleri}`

)]})}})




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
