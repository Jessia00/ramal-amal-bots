const {Collection} = require('discord.js');
const Stats = require('../../../../Global/Databases/Schemas/Plugins/Client.Users.Stats');
const Upstaff = require('../../../../Global/Databases/Schemas/Plugins/Client.Users.Staffs');
const Tasks = require('../../../../Global/Databases/Schemas/Plugins/Client.Users.Tasks');
const { genEmbed } = require('../../../../Global/Init/Embed');
const moment = require('moment')
/**
 * @param { Client } ready
 */

module.exports = async () => {

  let LeaderBoard = await client.guilds.cache.get(sistem.SERVER.ID).channels.cache.get(kanallar.sıralamaKanalı).send("Ses Sıralaması Yükleniyor...")
  let LeaderBoardiki = await client.guilds.cache.get(sistem.SERVER.ID).channels.cache.get(kanallar.sıralamaKanalı).send("Mesaj Sıralaması Yükleniyor...")
  if(ayarlar && ayarlar.sıralamaKanalı) checkingLeader()
  setInterval(() => {
    if(ayarlar && ayarlar.sıralamaKanalı) checkingLeader()
  }, 600000);

  async  function checkingLeader() {  
    const data = await Stats.find({guildID: sistem.SERVER.ID})
    const sureCevir = (duration) => {  
        let arr = []
        if (duration / 3600000 > 1) {
          let val = parseInt(duration / 3600000)
          let durationn = parseInt((duration - (val * 3600000)) / 60000)
          arr.push(`${val} saat`)
          arr.push(`${durationn} dk.`)
        } else {
          let durationn = parseInt(duration / 60000)
          arr.push(`${durationn} dk.`)
        }
        return arr.join(", ") };
    const voiceUsers = data.sort((uye1, uye2) => {
        let uye2Toplam2 = 0;
        if(uye2.voiceStats) uye2.voiceStats.forEach(x => uye2Toplam2 += x);
        let uye1Toplam2 = 0;
        if(uye1.voiceStats) uye1.voiceStats.forEach(x => uye1Toplam2 += x);
        return uye2Toplam2-uye1Toplam2;
    }).slice(0, 20).map((m, index) => {
        let uyeToplam2 = 0;
        if(m.voiceStats) m.voiceStats.forEach(x => uyeToplam2 += x);
        return `\` ${index + 1} \` <@${m.userID}> \`${sureCevir(uyeToplam2)}\``;
    }).join('\n');
    let messageUsers = data.sort((uye1, uye2) => {
        let uye2Toplam = 0;
        if(uye2.voiceStats) uye2.chatStats.forEach(x => uye2Toplam += x);
        let uye1Toplam = 0;
        if(uye1.voiceStats) uye1.chatStats.forEach(x => uye1Toplam += x);
        return uye2Toplam-uye1Toplam;
    }).slice(0, 20).map((m, index) => {
        let uyeToplam = 0;
        if(m.voiceStats) m.chatStats.forEach(x => uyeToplam += x);
        return `\` ${index + 1} \` <@${m.userID}> \`${Number(uyeToplam)} mesaj\``;
    }).join('\n');
    const voiceList = (`${voiceUsers.length > 0 ? voiceUsers : "Veri Bulunmuyor."}`)
    const messageList = (`${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`)
    let MessageEdit = new genEmbed()
    MessageEdit.setColor("WHITE")
    MessageEdit.setAuthor(client.guilds.cache.get(sistem.SERVER.ID).name, client.guilds.cache.get(sistem.SERVER.ID).iconURL({dynamic:true}))
    MessageEdit.setFooter(`Güncellenme Tarihi: ${tarihsel(Date.now())}`)
    LeaderBoard.edit({content: null,embeds: [MessageEdit.setDescription(`:tada: Aşağı da \`${client.guilds.cache.get(sistem.SERVER.ID).name}\` sunucusunun genel ses sıralaması listelenmektedir.\n\n${voiceList}` )]})
    LeaderBoardiki.edit({content: null,embeds: [MessageEdit.setDescription(`:tada: Aşağı da \`${client.guilds.cache.get(sistem.SERVER.ID).name}\` sunucusunun genel mesaj sıralaması listelenmektedir.\n\n${messageList}` )]})
    
  }
 
};

module.exports.config = {
    Event: "ready"
}