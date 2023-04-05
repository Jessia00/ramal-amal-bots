const { green, red } = require("../../configs/emojis.json")
const { Client, Intents, Message, MessageEmbed, MessageActionRow, MessageButton, Collection } = require('discord.js');
module.exports = {
    conf: {
      aliases: ["sil","temizle"],
      name: "sil",
      help: "sil"
    },
  
    run: async (client, message, args, embed) => {
      if (!message.member.permissions.has('MANAGE_MESSAGES')) return;
      const silbuton = new MessageActionRow()
      .addComponents(
          new MessageButton()
              .setCustomId('sil1')
              .setLabel(`5`)                
              .setStyle('DANGER'))
      .addComponents(
          new MessageButton()
              .setCustomId('sil2')
              .setStyle('DANGER')
              .setLabel("15"))
              .addComponents(
                  new MessageButton()
                      .setCustomId('sil3')
                      .setStyle('DANGER')
                      .setLabel("25"))
                      .addComponents(
                          new MessageButton()
                              .setCustomId('sil4')
                              .setStyle('DANGER')
                              .setLabel("100"))

              message.reply({components:[silbuton]})

              const filter = i => i.user.id === message.member.id;
              const collector = message.channel.createMessageComponentCollector({ filter, time: 30000 });
              collector.on('collect', async b => {
                  if (b.isButton()) {
                      if (b.customId === "sil1") {
                          message.channel.bulkDelete(5);
                      }
                      if (b.customId === "sil2") {
                          message.channel.bulkDelete(15);
                      }
                      if (b.customId === "sil3") {
                          message.channel.bulkDelete(25);
                      }
                      if (b.customId === "sil4") {
                          message.channel.bulkDelete(100);
                      }

                      collector.stop()
                      b.message.delete().catch(e => { console.error(e) })


                  }
              })



  }
}
  