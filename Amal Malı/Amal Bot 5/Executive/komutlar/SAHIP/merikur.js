const disbut = require("discord-buttons");
module.exports.run = async (client, message, args, durum, kanal) => {

let meriazkk = new disbut.MessageButton().setStyle('gray').setLabel('Sunucuyu baştan aşşağı entegre etmek için tıkla!').setID('meriazk').setEmoji('968174248784982046')


message.channel.send(`${client.emojis.cache.find(x => x.name === "ramal_yildiz")} Selam \`OWNER\` arkadaş yada \`Meriaz\` alttaki butonu basarak sunucuyu entegre edebilirsin.
`

, {
    buttons: [meriazkk]
})



}

client.on('clickButton', async (button) => {
   
    if (button.id === 'meriazkk') {
      button.reply.send(`${client.emojis.cache.find(x => x.name === "ramal_tik2")} Meriaz sunucu başarıyla entegre edildi kuruluma başlıyabilirsin kolay gelsin...
      `
 )
  
    }
   
    });
exports.conf = {
    aliases: []
}
exports.help = {
    name: 'merieverentegre'
}
