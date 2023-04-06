const disbut = require("discord-buttons");
const { MessageEmbed } = require("discord.js");
const RandevuRegister = require("../../models/Register")
module.exports.run = async  (client, message, args, durum, kanal) => {

let name = args[0].toUpperCase();
if(!name) return message.reply("Lütfem İsminizi Yazınız")
let age = args[1];
if(!age) return message.channel.send("Lütfen Yaşınızı Belirtiniz");
let burc = args[2].toUpperCase();
if(!burc) return message.channel.send("Lütfen Burcunuzu Belirtiniz");
let instagram = args[3];
if (!instagram) return message.channel.send(`Lütfen İnstagram Adresinizi Belirtiniz (Link Koymayınız Sadece İnstagram Adınız Yok ise yok yazabilirsiniz)`)
let aboutme = args[4];
if (!aboutme) return message.channel.send(`Kendiniz Hakkında Kısa ve Öz Bigli Veriniz!`)

let embed = new MessageEmbed().setColor("RANDOM").setFooter(`ramalask ❤️ ${message.guild.name}`)
.setDescription(`${message.author} adlı üyenin Randevu sistemindeki kayıt bilgileri aşağıda yer almaktadır!`)
.addField("**İsim**", `\`\`\`fix\n${name}\`\`\``, true)
.addField("**Yaş**", `\`\`\`fix\n${age}\`\`\``, true)
.addField("**Burç**", `\`\`\`fix\n${burc}\`\`\``, true)
.addField(`Hakkında`, `\`\`\`diff\n- ${aboutme}\`\`\``)
.addField(`Sosyal Medya Hesabı:`,`\`\`\`diff\n+ ${instagram}\`\`\``)  

message.channel.send(embed)

const myinfo = new RandevuRegister({
    guildID: message.guild.id,
    user: message.author.id,
    name: name,
    age: age,
    about: aboutme,
    burç: burc,
    instagram: instagram,
  })
  myinfo.save().catch(e => console.error(e))

}
exports.conf = {
    aliases: ["busex"]
}
exports.help = {
    name: 'sex'
}