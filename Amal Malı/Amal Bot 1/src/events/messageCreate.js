const {MessageActionRow, MessageEmbed, MessageButton} = require("discord.js")
const coin = require("../schemas/coin")
const conf = require("../configs/sunucuayar.json")

var messageSize = 0;
 module.exports = async (message) => {
  
    if (message.author.bot) return;
    if(message.channel.id != conf.chat ) return;
    messageSize++
    if(messageSize > 250)
    {
     messageSize = 0;

    const buton = await new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setCustomId("basulanbas")
        .setLabel("Tıkla Ve Kazan!")
        .setStyle("DANGER")
        .setEmoji(":bellhop:")
    )
    let randompara = Math.floor(Math.random() * (400 - 20)) + 200;
    await message.channel.send({content:`Aşağıda bulunan butona ilk basan **${randompara}** Coin Kazanıcak!`, components:[buton]}).then(x=>{
        const collector = x.createMessageComponentCollector({ time: 90000 })
        collector.on('collect', async (button, user) => {
  
            if (button.customId === "basulanbas") {
                 x.delete()
                await coin.findOneAndUpdate({ guildID: message.guild.id, userID: message.member.id }, { $inc: { coin: randompara } }, { upsert: true });
                await message.channel.send({content: `${button.member}, **Tıkla Kazan** Etkinliğinden **${randompara}** Coin Kazandın!`})
            }
        })
        collector.on("end", async (collected, reason) => {
            if (reason === "time") {
              if (x) await x.delete()
            }
    })
    })
    }
  }