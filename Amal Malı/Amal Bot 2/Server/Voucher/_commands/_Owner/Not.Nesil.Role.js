const { Client, Message, MessageEmbed} = require("discord.js");
const { genEmbed } = require("../../../../Global/Init/Embed");

module.exports = {
    Isim: "nesilsiz",
    Komut: ["nesilsizdağıt","nesilsizver"],
    Kullanim: "rolsüzver",
    Aciklama: "",
    Kategori: "kurucu",
    Extend: false,
    
   /**
   * @param {Client} client 
   */
  onLoad: function (client) {

  },

   /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   */

  onRequest: async function (client, message, args) {
    let nesils = [
        roller.nesilbir,
        roller.nesiliki,
        roller.nesilüç,
        roller.nesildört,
        roller.nesilbeş,
        roller.nesilaltı,
        roller.nesilyedi,
        roller.nesilsekiz,
        roller.nesildokuz,
        roller.nesilon
]
let nesilolmayanlar = message.guild.members.cache.filter(x => (roller.erkekRolleri.some(a => x.roles.cache.has(a)) || roller.kadınRolleri.some(a => x.roles.cache.has(a))) && !nesils.some(a => x.roles.cache.has(a)))
if(!roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) return message.react(message.guild.emojiGöster(emojiler.Iptal))
if(nesilolmayanlar.size < 0) return message.reply({content:`Kayıtlı olan tüm üyelerde nesil bulunduğundan işlem iptal edildi.`});
nesilolmayanlar.forEach(uye => {
uye.roles.add(roller.nesilon).catch(err => {})
})
message.channel.send({embeds: [embed.setDescription(`Sunucuda nesil rolü olmayan \`${nesilolmayanlar.size}\` üyeye 10.nesil rolü verilmeye başlandı!`).setFooter(`bu işlem biraz zaman alabilir.`)]}).then(x => {
    setTimeout(() => {
        x.delete()
    }, 7500);
})
message.reply({content: `Başarıyla ${nesilolmayanlar.size} adet üyeye 10. nesil dağıtılmaya başlandı.`})
 

    message.react(message.guild.emojiGöster(emojiler.Onay))
    }
};