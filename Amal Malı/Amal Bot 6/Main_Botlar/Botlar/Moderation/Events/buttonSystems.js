const { Ramalcim } = require('../../../Helpers/Schemas')
class ButtonSystem {
  Event = "interactionCreate"
  async run(interaction, args) {
    try {
        const ramal = await Ramalcim.findOne({ guildID: config.guildID })

        if (interaction.customId === "etkinlikrol") { if (interaction.member.roles.cache.has(ramal.etkinlikRole)) { interaction.member.roles.remove(ramal.etkinlikRole); interaction.reply({ content: `Tebrikler ${interaction.member}! Üzerinizden <@&${ramal.etkinlikRole}> rolü alındı!`, ephemeral: true }) } else { interaction.member.roles.add(ramal.etkinlikRole); interaction.reply({ content: `Tebrikler ${interaction.member}! Üzerinize <@&${ramal.etkinlikRole}> rolü verildi!`, ephemeral: true }) } }
    
        if (interaction.customId === "cekilisrol") { if (interaction.member.roles.cache.has(ramal.cekilisRole)) { interaction.member.roles.remove(ramal.cekilisRole); interaction.reply({ content: `Tebrikler ${interaction.member}! Üzerinizden <@&${ramal.cekilisRole}> rolü alındı!`, ephemeral: true }) } else { interaction.member.roles.add(ramal.cekilisRole); interaction.reply({ content: `Tebrikler ${interaction.member}! Üzerinize <@&${ramal.cekilisRole}> rolü verildi!`, ephemeral: true }) } }
    
    
    } catch (e) {
        client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + e)
    }
}
}

module.exports = ButtonSystem