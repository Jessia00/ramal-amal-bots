const { Ramalcim, Penalties, Users, coin } = require('../../../../Helpers/Schemas')
class Man extends Command {
    constructor(client) {
        super(client, {
            name: "erkek",
            aliases: ["man", "e", "erk"],
            cooldown: 15
        });
    }
    async run(client, message, args, embed) {
        try {
            const ramal = await Ramalcim.findOne({ guildID: message.guild.id })
            if (message.channel.id !== ramal.welcomeChannel) return message.reply(`**UYARI:** Bu komutu yalnızca <#${ramal.welcomeChannel}> kanalında kullanabilirsin!`).sil(10)
            if (!message.member.roles.cache.has(ramal.registerHammer) && !config.Founders.includes(message.author.id) && !config.root.includes(message.author.id) && !ramal.yonetimRoles.some(rol => message.member.roles.cache.has(rol)) && !message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ embeds: [embed.setDescription(`**UYARI :** Bu komutu kullanabilmek için yeterli yetkiye sahip değilsin!`)] }).sil(15)
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            args = args.filter(a => a !== "" && a !== " ").splice(1); let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase() + arg.slice(1)).join(" "); let yaş = args.filter(arg => !isNaN(arg))[0]
            if (!member) return message.channel.send(`Kayıt yapabilmem için bir kullanıcı belirtmelisin **Örnek :** \`.e @Ramal/ID İsim | Yaş\``).sil(10);
            if (member.roles.cache.has(ramal.cezalıRol) && member.roles.cache.has(ramal.bannedTagRole)) return message.channel.send(`**Bu üye cezalı olduğu için işlemi gerçekleştiremedim!`).sil(10)
            if (ramal.manRoles.some(role => member.roles.cache.has(role)) || ramal.womanRoles.some(role => member.roles.cache.has(role))) return message.channel.send(`Bu üye zaten sunucumuzda kayıtlı!`).sil(10)
            if (ramal.tagliAlim === true && !member.user.username.includes(ramal.tag) && !member.roles.cache.has(ramal.vipRol) && !member.roles.cache.has(ramal.boosterRol)) return message.channel.send(`Sunucumuz şuanda taglı alımda olduğu için işlemi gerçekleştiremiyorum!`).setFooter(`Üyeyi VIP olarak kaydetmek için : .vip | Developed by Ramal.`).sil(50)
            if (member.user.bot) return message.channel.send(`Bot kayıt yapamazsın!`).sil(10)
            if (!member.manageable) return message.channel.send(`Bu üyeyi kayıt etmek için yetkim yetersiz!`).sil(10)
            if (!isim) return message.channel.send(`Kayıt edilecek kişi için bir isim belirtmelisin!`).sil(10)
            if (!yaş) return message.channel.send(`Kayıt edilecek kişi için bir yaş belirtmelisin!`).sil(10)
            let setName;
            setName = `${ramal.tags.some(tag => member.user.username.includes(tag)) || member.user.discriminator == ramal.tags.filter(t => t.startsWith("#")) ? ramal.isimsembol : (ramal.isimsemboliki ? ramal.isimsemboliki : ramal.isimsembol)} ${isim} | ${yaş}`
            if (setName.length > 32) return message.channel.send(`Discord API sınırına ulaşıldı!`).sil(10)
            const cezapuanData = await Penalties.findOne({ guildID: message.guild.id, userID: member.user.id });
            await member.setNickname(`${setName}`, `Erkek Kayıt, Yetkili: ${message.author.id}`); await member.roles.remove([ramal.unregisterRole]); await member.roles.add(ramal.manRoles)
            message.channel.send({ embeds: [embed.setTimestamp().setFooter(`Üyenin Ceza Puanı : ${cezapuanData ? cezapuanData.cezapuan : 0}`).setDescription(`${member} adlı kullanıcı Sunucumuzda **__Erkek__** olarak kayıt edildi!`)] }).sil(30); if (message) message.react(emojis.onay)
            await Users.findOneAndUpdate({ userID: message.author.id }, { $inc: { TeyitNo: 1 } }, { upsert: true }).exec(); await Users.findOneAndUpdate({ userID: message.author.id }, { $push: { Teyitler: { userID: member.id, rol: ramal.manRoles[0], date: Date.now(), Gender: "Erkek" } } }, { upsert: true }); await Users.findOneAndUpdate({ userID: member.id }, { $push: { Names: { userID: message.author.id, Name: `${setName}`, rol: ramal.manRoles[0], islem: "Kayıt" } } }, { upsert: true }); await Users.findOneAndUpdate({ userID: member.id }, { $set: { Teyitci: { userID: message.author.id, Cinsiyet: ramal.manRoles[0], date: Date.now() } } }, { upsert: true }); if (ramal.coinSystem === true) await coin.findOneAndUpdate({ guildID: member.guild.id, userID: message.author.id }, { $inc: { coin: config.registerCoin } }, { upsert: true }); message.member.updateTask(message.guild.id, "kayıt", 1, message.channel);
            const row = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId('hosgeldin').setLabel("Selam Vermek İçin El Salla!").setEmoji("927619326868082781").setStyle('SECONDARY'),);
            let hosgeldinmsg = await client.channels.cache.get(ramal.genelChat).send({ content: `${member} aramıza hoş geldin!` }).sil(20)
            var filter = (button) => button.user.id !== member.id; const collector = hosgeldinmsg.createMessageComponentCollector({ filter, time: 10000 })
            collector.on('collect', async (button, user) => { if (button.customId === "hosgeldin") { button.reply({ content: `Selamın başarılı bir şekilde iletildi! ${emojis.onay}`, ephemeral: true }); button.channel.send(`${member} \`${button.user.username}\` kişisi tarafından selamlandın!`).sil(10) } collector.on("end", async (collected, reason) => { if (hosgeldinmsg) hosgeldinmsg.delete(); }); })
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = Man