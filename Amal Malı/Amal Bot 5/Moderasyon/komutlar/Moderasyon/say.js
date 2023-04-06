const {
    MessageEmbed,
    Discord
    } = require("discord.js");
    const conf = client.ayarlar;
    let mongoose = require("mongoose");
    let sunucuayar = require("../../models/sunucuayar");
    module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
    
    if (message.member.permissions.has(8) || durum) {
    let data = await sunucuayar.findOne({});
    let sunucuTAG = data.TAG;
    let ramalaz1 = await message.guild.members.cache.filter(member => member.user.username.includes(sunucuTAG)).size;
    let ramalaz3 = await message.guild.members.cache.filter(member => member.user.username.includes(data.TAG3)).size;
    let ramalaz4 = await message.guild.members.cache.filter(member => member.user.username.includes(data.TAG4)).size;
    let ramalaz5 = await message.guild.members.cache.filter(member => member.user.username.includes(data.TAG5)).size;
    let ramalaz6 = await message.guild.members.cache.filter(member => member.user.username.includes(data.TAG6)).size;
    let ramalaz7 = await message.guild.members.cache.filter(member => member.user.username.includes(data.TAG7)).size;
    var ramalaz8 = message.guild.members.cache.filter(u => u.user.discriminator.includes(data.ETİKET)).size;


    let ramalazzzz = ramalaz1 + ramalaz3 + ramalaz4 + ramalaz5 + ramalaz6 + ramalaz7 + ramalaz8

    let sesli = message.guild.channels.cache.filter(channel => channel.type == "voice").map(channel => channel.members.filter(member => !member.user.bot).size).reduce((a, b) => a + b);
    let bot = message.guild.channels.cache.filter(channel => channel.type == "voice").map(channel => channel.members.filter(member => member.user.bot).size).reduce((a, b) => a + b);
    let embed = new MessageEmbed()
    .setColor("BLACK")
    .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .setFooter(`ramalask ❤️`, message.guild.iconURL({ dynamic: true })).setTimestamp().setColor("RANDOM")
    .setDescription(`${client.emojis.cache.find(x => x.name === "ramal_sessay")} Şu anda toplam **${sesli}** (**+${bot} bot**) kişi seslide.
    ${client.emojis.cache.find(x => x.name === "ramal_usersay")} Sunucuda **${message.guild.memberCount}** adet üye var (**${message.guild.members.cache.filter(member => member.presence.status !== "offline").size}** Aktif)
    ${client.emojis.cache.find(x => x.name === "ramal_tagsay")} Toplamda **${ramalazzzz}** kişi tagımızı alarak bizi desteklemiş.
    ${client.emojis.cache.find(x => x.name === "ramal_boostsay")} Toplamda **${message.guild.premiumSubscriptionCount}** adet boost basılmış! ve Sunucu **${message.guild.premiumTier}** seviye`);
    message.channel.send(embed)
    }
    }
    exports.conf = {
    aliases: ["sunucusay", "serversay", "Say"]
    };
    exports.help = {
    name: 'say'
    };
    