const { MessageEmbed, Discord } = require("discord.js");
const conf = client.ayarlar;
const sunucuayar = require("../../models/sunucuayar");
module.exports.run = async (client, message, args, durum, kanal) => {
	if (!message.guild) return;
    
        let data = await sunucuayar.findOne({guildID: message.guild.id})
        message.channel.send(`**İsim Tagı :** \`${data.TAG} - ${data.TAG3} - ${data.TAG4} - ${data.TAG5} - ${data.TAG6} - ${data.TAG7}\`\n**Etiket Tagı :** \`#${data.ETİKET}\``);
}
exports.conf = {aliases: ["tag"]}
exports.help = {name: 'Tag'}
