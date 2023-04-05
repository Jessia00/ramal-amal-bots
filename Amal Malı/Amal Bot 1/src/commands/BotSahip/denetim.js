const Discord = require('discord.js');
const { green, kirmiziok } = require("../../configs/emojis.json")

module.exports = {
  conf: {
    aliases: ["denetims"],
    name: "denetims",
    owner: true,
  },

  run: async (client, message, args) => {

    if (!args[0] || !args[0].toLowerCase() === "rol" && !args[0].toLowerCase() === "kanal") return message.channel.send(`Lütfen \`rol/kanal\` olmak üzere geçerli bir eylem belirtiniz`)
    if (args[0].toLowerCase() === "rol") {
      const audit = await message.guild.fetchAuditLogs({ type: 'ROLE_DELETE' }).then(a => a.entries)
      const denetim = audit.filter(e => Date.now() - e.createdTimestamp < 1000 * 60 * 60).map(e => `${green} Rol İsim: **${e.changes.filter(e => e.key === 'name').map(e => e.old)}**\n${green} Rol ID: \`${e.target.id}\`\n\n`)
      if (!denetim.length) return message.channel.send(`Son 1 saat de silinmiş herhangi bir rol bulunamadı!`)

       message.channel.send(`${denetim}`)

    } else if (args[0].toLowerCase() === "kanal") {
      const audit = await message.guild.fetchAuditLogs({ type: 'CHANNEL_DELETE' }).then(a => a.entries)

      const denetim = audit.filter(e => Date.now() - e.createdTimestamp < 1000 * 60 * 60).map(e => `Kanal İsim: (**${e.changes.filter(e => e.key === 'name').map(e => e.old)}**)\n${green} Kanal ID: \`${e.target.id}\`\n\n`)
      if (!denetim.length) return message.channel.send(`Son 1 saat de silinmiş herhangi bir kanal bulunamadı!`)
        
        message.channel.send(`${denetim}`)

    }
}
}