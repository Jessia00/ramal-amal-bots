const { Ramalcim, Penalties } = require('../../../../Helpers/Schemas')
const moment = require("moment"); moment.locale("tr")
class UnVMute extends Command {
    constructor(client) {
        super(client, {
            name: "unvmute",
            aliases: ["sessusturkaldır", "unvmute", "vmutekaldır"],
            cooldown: 60
        });
    }
    async run(client, message, args, embed) {
        const ramal = await Ramalcim.findOne({ guildID: message.guild.id })
        if (!message.member.roles.cache.has(ramal.muteHammer) && !config.Founders.includes(message.author.id) && !config.root.includes(message.author.id) && !ramal.yonetimRoles.some(rol => message.member.roles.cache.has(rol)) && !message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ embeds: [embed.setDescription(`**UYARI :** Bu komutu kullanabilmek için yeterli yetkiye sahip değilsin!`)] }).sil(15)
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]); if (!member) return message.reply({ embeds: [embed.setDescription(`**UYARI : **Bir üye belirtmeyi unuttun!`)] }).sil(10)
        if (!member.roles.cache.has(ramal.vmutedRole)) return message.reply({ embeds: [embed.setDescription(`**UYARI :** Bu kullanıcı zaten susturulmamış!`)]}).sil(10)
        if (!member.voice.channel) return message.reply(`Kullanıcı bir ses kanalında değil!`)
        if (member && !member.manageable) return message.reply({ embeds: [embed.setDescription(`**UYARI : ** Bu kullanıcının susturmasını açamıyorum!`)] }).sil(10)
        if (member && member.voice.channel) member.voice.setMute(false);
        await member.roles.remove(ramal.vmutedRole, `Susturma Kaldırma, Yetkili: ${message.author.id}`)
        const cezaVeri = await Penalties.findOne({ guildID: message.guild.id, userID: member.id, Ceza: "VOICEMUTE", Aktif: true });
        if (cezaVeri) { cezaVeri.Aktif = false; await cezaVeri.save(); }
        const ceza = await client.Penalties(message.guild.id, member.id, "VOICEUNMUTE", true, message.author.id, Date.now()); 
        message.reply({ embeds: [embed.setDescription(`${emojis.cmute} ${member} - ${member.user.username.replace(/\`/g, "")} \`(${member.id})\` kişisinin ses susturması ${message.author} tarafından açıldı! \`(#${ceza.id})\``)] }).sil(50)
        if (ramal.muteLog) client.channels.cache.get(ramal.muteLog).send({ embeds: [embed.setThumbnail(member.avatarURL({ dynamic: true })).setAuthor({ name: member.user.username, iconURL: member.user.avatarURL({ dynamic: true, size: 2048 })} ).setDescription(`${emojis.nokta} **Susturması Kaldırılan Kullanıcı :** ${member} (\`${member.user.username.replace(/\`/g, "")} - ${member.id}\`)\n${emojis.nokta} **Susturmayı Kaldıran Yetkili :** ${message.author} (\`${message.author.tag} - ${message.author.id}\`)\n${emojis.nokta} **Susturma Kaldırılma Zamanı :** \`${moment(Date.now()).format("LLL")}\``).setTitle(`Ses Susturma Kaldırma İşlemi!`).setFooter(`Ceza ID : #${ceza.id}`)] })
    }
}

module.exports = UnVMute