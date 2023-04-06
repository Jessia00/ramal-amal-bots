const { Ramalcim } = require('../../../../Helpers/Schemas')
class Control extends Command {
    constructor(client) {
        super(client, {
            name: "komutlar",
            aliases: ["help","commands","yardım"],
            cooldown: 30
        });
    }
    async run(client, message, args, embed) {
        const ramal = await Ramalcim.findOne({ guildID: message.guild.id })
        const row = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId('kullanıcı').setLabel("Kullanıcı").setStyle('SECONDARY'), new Discord.MessageButton().setCustomId('register').setLabel("Register").setStyle('SECONDARY'), new Discord.MessageButton().setCustomId('istatistik').setLabel("İstatistik").setStyle('SECONDARY'),new Discord.MessageButton().setCustomId('moderasyon').setLabel("Moderasyon").setStyle('SECONDARY'),new Discord.MessageButton().setCustomId('market').setLabel("Market").setStyle('SECONDARY'));
        let ysay = await message.channel.send({ embeds: [embed.setDescription(`${emojis.star} **${message.guild.name}**, __Bot komutlarını incelemek için aşağıdaki butonları kullan!__`)], components: [row] })
        var filter = (button) => button.user.id === message.author.id;
        const collector = ysay.createMessageComponentCollector({ filter, time: 30000 })
        collector.on('collect', async (button, user) => {
            if (button.customId === "kullanıcı") {
                await button.reply({ content: `\`.afk\`\n\`.avatar\`\n\`.bilgi\`\n\`.booster\`\n\`.çek\`\n\`.git\`\n\`.say\`\n\`.url\`\n\`.komutlar\`\n`, ephemeral: true })
            }
            if (button.customId === "register") {
                await button.reply({ content: `\`.teyitlerim\`\n\`.erkek\`\n\`.kadın\`\n\`.isim\`\n\`.isimler\`\n\`.kayıtsız\`\n`, ephemeral: true })
            }
            if (button.customId === "istatistik") {
                await button.reply({ content: `\`.stat\`\n\`.davetlerim\`\n\`.topinvites\`\n\`.topstat\`\n`, ephemeral: true })
            }
            if (button.customId === "moderasyon") {
                await button.reply({ content: `\`.görev\`\n\`.senkronize\`\n\`.rank\`\n\`.taglısay\`\n\`.tagaldır\`\n\`.görevlerim\`\n\`.toptaglı\`\n\`.yetkim\`\n\`.sil\`\n\`.denetim\`\n\`.herkeserolver\`\n\`.inviter\`\n\`.menü\`\n\`.rolbilgi\`\n\`.özelkomut\`\n\`.control\`\n\`.giveaway\`\n\`.rol\`\n\`.rollog\`\n\`.snipe\`\n\`.nerede\`\n\`.ysay\`\n\`.ban\`\n\`.mute\`\n\`.jail\`\n\`.cezabilgi\`\n\`.sicil\`\n\`.unban\`\n\`.unjail\`\n\`.unmute\`\n\`.vmute\`\n\`.unvmute\`\n`, ephemeral: true })
            }
            if (button.customId === "market") {
                await button.reply({ content: `\`.coin\`\n\`.coinekle\`\n\`.bahis\`\n\`.daily\`\n\`.gönder\`\n\`.slot\`\n\`.market\`\n`, ephemeral: true })
            }
        })
    }
}

module.exports = Control