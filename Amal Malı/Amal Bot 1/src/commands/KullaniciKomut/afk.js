const afk = require("../../schemas/afk");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { green, red} = require("../../configs/emojis.json")
module.exports = {
    conf: {
      aliases: ["afk"],
      name: "afk",
      help: "afk"
    },
  
run: async (client, message, args, embed, prefix) => {
  
  const row = new MessageActionRow()
  .addComponents(

  new MessageButton()
  .setCustomId("afkgec")
  .setLabel("AFK")
  .setStyle("SUCCESS")
  .setEmoji("915754671728132126"),

  new MessageButton()
  .setCustomId("red")
  .setLabel("iptal")
  .setStyle("DANGER")
  .setEmoji("920412153712889877"),
  );

  let ramal = new MessageEmbed()
.setDescription(`\`AFK\` moduna geçiş yapmak için istekde bulundun emin misin?`)

 let msg = await message.channel.send({ embeds: [ramal], components : [row] })
 
 var filter = (button) => button.user.id === message.author.id;
 let collector = await msg.createMessageComponentCollector({ filter, time: 50000 })

       collector.on("collect", async (button) => {
        if(button.customId === "afkgec") {
          await button.deferUpdate();
        
          if (message.member.displayName.includes("[AFK]")) return
          const reason = args.join(" ") || "Belirtilmedi!";
          await afk.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $set: { reason, date: Date.now() } }, { upsert: true });          
          if (message.member.manageable) message.member.setNickname(`[AFK] ${message.member.displayName}`);
          }
          message.channel.send(`Başarıyla afk moduna girdiniz! Bir şey yazana kadar [AFK] kalacaksınız.`)
          msg.edit({ embeds: [ramal], components: [row] })

          


            })

          }}