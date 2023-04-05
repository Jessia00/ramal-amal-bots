const conf = require("../../configs/sunucuayar.json")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
module.exports = {
  conf: {
    aliases: ["kilites","lockss"],
    name: "kilite",
    help: "kilite"
  },

  run: async (client, message, args, embed, prefix) => {
    if (!message.member.permissions.has("MANAGE_CHANNELS")) return;

    const row = new MessageActionRow()
  .addComponents(

  new MessageButton()
  .setCustomId("kilitle")
  .setLabel("Kilit")
  .setStyle("SUCCESS")
  .setEmoji("915754671728132126"),

  new MessageButton()
  .setCustomId("red")
  .setLabel("iptal")
  .setStyle("DANGER")
  .setEmoji("920412153712889877"),
  );

  let ramal = new MessageEmbed()
.setDescription(`Kanal Kilitemek İçin Butona Basman Yeterli.`)

 let msg = await message.channel.send({ embeds: [ramal], components : [row] })
 
 var filter = (button) => button.user.id === message.author.id;
 let collector = await msg.createMessageComponentCollector({ filter, time: 50000 })

 collector.on("collect", async (button) => {
    if(button.customId === "kilitle") {
      await button.deferUpdate();
    
      let everyone = message.guild.roles.cache.find(r => r.name === "@everyone");
      message.channel.permissionOverwrites.edit(everyone.id, {
          SEND_MESSAGES: false
      }).then(async() => {
          message.react("🔒")
          await message.reply({ content:"Kanal başarıyla kilitlendi."})
        })
    }
      msg.edit({ embeds: [ramal], components: [row] })
      

      
      

      

    })

}}