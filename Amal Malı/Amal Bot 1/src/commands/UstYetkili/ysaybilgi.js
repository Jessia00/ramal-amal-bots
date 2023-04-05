const { MessageEmbed, Client, MessageActionRow, MessageButton,MessageSelectMenu } = require('discord.js');
const serverSettings = require('../../models/sunucuayar')

module.exports = {
    conf: {
      aliases: ["yb"],
      name: "yb",
      help: "yb"
    },
  
    run: async (client, message, args, embed, durum) => {

        if (!message.guild) return;
    let ayar = await serverSettings.findOne({
      guildID: message.guild.id
  });


  if (!message.guild) return;
  if (!message.member.permissions.has(8n)) return message.react(red)

 let adamlar = message.guild.members.cache.filter(admin => admin.roles.cache.has("1062832757652328588")).filter(ses => !ses.voice.channel  && ses.presence && ses.presence.status != "offline")


   const row = new MessageActionRow()
    .addComponents(
      new MessageSelectMenu()
            .setCustomId('yetkilisay')
            .setPlaceholder('Menüden Seçenek Seçiniz!')
            .addOptions([
                { label: 'Yetkili Say', description: 'Sunudaki Seste Olmayan Yetkilileri Listeler', value: '1', emoji: '1033072370593841232' },
                { label: 'Yetkili Dm At', description: 'Sunudaki Seste Olmayan Yetkililere Özelden Mesaj Atar', value: '2', emoji: '1033072859284770836' },
                { label: 'İşlemi İptal Et', description: 'Açılan Menüyü Kapatır', value: '3', emoji: '1033072911210270720' },
            ]),
    );    
      
  

let yy = new MessageEmbed()
.setDescription(`Merhabalar ${message.member.toString()}, aşağıdan yetkilileri bilgilendirmek için menüyü kullanabilirsin!
\` 1 \` __Yetkili Say__
\` 2 \` __Yetkili DM At__
\` 3 \` __İşlemi İptal Et!__   
`)
.setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true }) })

let msg = await message.channel.send({ components: [row], embeds: [yy] })


      var filter = (mal) => mal.user.id === message.author.id;
    let collector =  msg.createMessageComponentCollector({ filter, componentType: 'SELECT_MENU', time: 999999 })
  
collector.on("collect", async (interaction) => {
if(interaction.values[0] === "1") {

    
 interaction.reply(`Sunucumuzda Aktif Olup Seste Olmayan **${adamlar.size}** Yetkili Bulunuyor!\n
\`Yetkililerin Listesi :\`\n${adamlar.map(member => member.toString()).join(`\n`)}`);

        }

if(interaction.values[0] === "2") {

interaction.reply({ content:`**${adamlar.size}** Adet Yetkiliye DM Aracılığı İle Haber Verilmeye Başlandı!`});
      
            let index = 0;
            adamlar.forEach(async member => {

                index += 1;
                await client.wait(index * 1000);
                member.send({ content:`Merhabalar ${member.toString()}! Sunucumuzun Ses Aktifliğini Arttırmak İçin Public Seslere Veya Özel Odalara Geçebilir misin?`}).catch(err => message.channel.send({ content:`${member.toString()} Adlı Yetkiliye DM Aracılığıyla Ulaşamadım,Müsaitsen Public Seslere Veya Özel Odalara Geçebilir misin?`}));
    
                });
        }
if(interaction.values[0] === "3") {
interaction.message.delete()	
message.delete()
   

        }
            
                             
  });
    }
}