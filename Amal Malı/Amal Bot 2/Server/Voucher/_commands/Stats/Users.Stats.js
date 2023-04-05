const { MessageEmbed, MessageAttachment, MessageActionRow, MessageButton, MessageSelectMenu} = require("discord.js");
const Canvas = require("canvas");
const Stats = require('../../../../Global/Databases/Schemas/Plugins/Client.Users.Stats')
const Upstaff = require('../../../../Global/Databases/Schemas/Plugins/Client.Users.Staffs');
const moment = require('moment');
const { genEmbed } = require("../../../../Global/Init/Embed");
const ms = require('ms')
require('moment-duration-format');
require('moment-timezone');
module.exports = {
    Isim: "stat",
    Komut: ["stat","seslerim","mesajlarım"],
    Kullanim: "stat <@user/ID>",
    Aciklama: "Belirlenen üye veya kendinizin istatistik bilgilerine bakarsınız",
    Kategori: "stat",
    Extend: true,
    
   /**
   * @param {Client} client 
   */
  onLoad: function (client) {
    client.sureCevir = (duration) => {  
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
  },

   /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   */
  
  onRequest: async function (client, message, args) { 
    let embed = new genEmbed()
    let yarramgibi = new genEmbed()
    let kullArray = message.content.split(" ");
    let kullaniciId = kullArray.slice(1);
    let uye = message.mentions.members.first() || message.guild.members.cache.get(kullaniciId[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === kullaniciId.slice(0).join(" ") || x.user.username === kullaniciId[0]) || message.member;
      Stats.findOne({ guildID: message.guild.id, userID: uye.id }, async (err, data) => {
        let Upstaffs = await Upstaff.findOne({_id: uye.id})
        if (!data) return message.reply({content: `${message.guild.emojiGöster(emojiler.Iptal)} \`${message.guild.name}\` sunucuna ait bir istatistik verisi bulunamadı.`, ephemeral: true})
        let haftalikSesToplam = 0;
        let haftalikSesListe = '';
        let gecenHaftaSesListe = '';
        let ikiHaftalikSesToplam = 0;
        let canvasSesListe = ''
        let canvasChatListe = ''
        let gecenMuzikToplam = 0
        let müzikOdalar = '';
        let müzikToplam = 0;
        let public = 0;
        let register = 0;
        if(data.oldVoiceStats) {
          data.oldVoiceStats.forEach(c => ikiHaftalikSesToplam += c);
          data.oldVoiceStats.forEach((value, key) => {
            if(_statSystem.musicRooms.some(x => x === key)) gecenMuzikToplam += value
          });

          data.oldVoiceStats.forEach((value, key) => { 
          if(_statSystem.voiceCategorys.find(x => x.id == key)) {
            let kategori = _statSystem.voiceCategorys.find(x => x.id == key);
            let kategoriismi = kategori.isim 
              gecenHaftaSesListe += `${message.guild.emojiGöster(emojiler.staticon)} ${message.guild.channels.cache.has(key) ? kategoriismi ? kategoriismi : `Diğer Odalar` : '#Silinmiş'}: \`${client.sureCevir(value)}\`\n`
            }
        
          });
          if(gecenMuzikToplam > 0) gecenHaftaSesListe += `${message.guild.emojiGöster(emojiler.staticon)} Müzik Odalar: \`${client.sureCevir(gecenMuzikToplam)}\``
        }
        if(data.voiceStats) {
          data.voiceStats.forEach(c => haftalikSesToplam += c);
          data.voiceStats.forEach((value, key) => {
                if(key == kanallar.publicKategorisi) public += value
          });
          
     

          data.voiceStats.forEach((value, key) => {
            if(_statSystem.musicRooms.some(x => x === key)) müzikToplam += value
          });
          data.voiceStats.forEach((value, key) => { 
          if(_statSystem.voiceCategorys.find(x => x.id == key)) {
            let kategori = _statSystem.voiceCategorys.find(x => x.id == key);
            let kategoriismi = kategori.isim 
               haftalikSesListe += `${message.guild.emojiGöster(emojiler.staticon)} ${message.guild.channels.cache.has(key) ? kategoriismi ? kategoriismi : `Diğer Odalar` : '#Silinmiş'}: \`${client.sureCevir(value)}\`\n`
               canvasSesListe += `${message.guild.channels.cache.has(key) ? kategoriismi ? kategoriismi : `Diğer Odalar` : '#Silinmiş'}: ${client.sureCevir(value)}\n`
                
            }
        
          });
          if(müzikToplam > 0) haftalikSesListe += `${message.guild.emojiGöster(emojiler.staticon)} Müzik Odalar: \`${client.sureCevir(müzikToplam)}\``, canvasSesListe += `Müzik Odalar: ${client.sureCevir(müzikToplam)}`
        }
        let haftalikChatToplam = 0;
        data.chatStats.forEach(c => haftalikChatToplam += c);
        let haftalikChatListe = '';
        data.chatStats.forEach((value, key) => {
        if(_statSystem.chatCategorys.find(x => x.id == key)) {
        let kategori = _statSystem.chatCategorys.find(x => x.id == key);
        let mesajkategoriismi = kategori.isim
        haftalikChatListe += `${message.guild.emojiGöster(emojiler.staticon)} ${message.guild.channels.cache.has(key) ? mesajkategoriismi ? mesajkategoriismi : message.guild.channels.cache.get(key).name : '#Silinmiş'}: \`${value}\`\n`
        canvasChatListe += `${message.guild.emojiGöster(emojiler.staticon)} ${message.guild.channels.cache.has(key) ? mesajkategoriismi ? mesajkategoriismi : message.guild.channels.cache.get(key).name : '#Silinmiş'}: ${value} mesaj\n`  
        }
        });
        
          if(ayarlar && ayarlar.statRozet) {
            let rozetbir = roller.statRozetOne
            let rozetiki = roller.statRozetTwo
            let rozetuc = roller.statRozetThree
            let rozetdort = roller.statRozetFour
            let rozetbes = roller.statRozetFive

  

            let nesils = [
             {id: roller.nesilon, hours: "1s"},
             {id: roller.nesildokuz, hours: "3h"},
             {id: roller.nesilsekiz, hours: "5h"},
             {id: roller.nesilyedi, hours: "8h"},
             {id: roller.nesilaltı, hours: "11h"},
             {id: roller.nesilbeş, hours: "15h"},
             {id: roller.nesildört, hours: "20h"},
             {id: roller.nesilüç, hours: "25h"},
             {id: roller.nesiliki, hours: "30h"},
             {id: roller.nesilbir, hours: "35h"},
            ]

            if(parseInt(ikiHaftalikSesToplam) < ms("3h")) {
              let rolamkçocu = roller.nesilon
              uye.roles.add(rolamkçocu)

              let kalkcakrolamk = []
              let filter = nesils.filter(x => x.id != rolamkçocu).forEach(x => {
                kalkcakrolamk.push(x)
              })

              if(kalkcakrolamk && kalkcakrolamk.length > 0) uye.roles.remove(kalkcakrolamk).catch(err => {})
            } else {
              let _next = nesils.find(x => ms(x.hours) > parseInt(ikiHaftalikSesToplam))
              if(_next && !uye.roles.cache.has(roller.nesilbir)) {
                let _own = nesils[nesils.indexOf(_next) - 1]
                let kaltakorospuçocurolleri = []
                if(_own) nesils.filter(x => x.id != _own.id).map(x => {
                  kaltakorospuçocurolleri.push(x.id)
                })
                if(kaltakorospuçocurolleri.length > 0) uye.roles.remove(kaltakorospuçocurolleri)
                if(_own && message.guild.roles.cache.get(_own.id)) uye.roles.add(_own.id)
              } else {
                let rolcuk = nesils[9].id
                let kaltakorospuçocurolleri = []
                nesils.filter(x => x.id != rolcuk).map(x => {
                  kaltakorospuçocurolleri.push(x.id)
                })
                if(kaltakorospuçocurolleri.length > 0) uye.roles.remove(kaltakorospuçocurolleri)
                uye.roles.add(nesils[9].id)
              }
            }

           
            

        
            if(parseInt(ikiHaftalikSesToplam) < ms("3h"))("<:mid_neslrozz:1018160759596920922> Nesil Durumu", `Şuanda 10. nesildesin. <@&${nesils[1].id}> nesilini elde etmek için ses kanallarıda takılmalısın.`, false)
            
            if(parseInt(ikiHaftalikSesToplam) > ms("3h") && parseInt(ikiHaftalikSesToplam) < ms("5h")) yarramgibi.addField("<:mid_neslrozz:1018160759596920922> Nesil Durumu", `Tebrikler <@&${nesils[1].id}> nesiline sahipsin! Bir sonraki <@&${nesils[2].id}> nesilini elde etmek için ses kanallarıda takılmalısın.`, false)
            
            if(parseInt(ikiHaftalikSesToplam) > ms("5h") && parseInt(ikiHaftalikSesToplam) < ms("8h")) yarramgibi.addField("<:mid_neslrozz:1018160759596920922> Nesil Durumu", `Tebrikler <@&${nesils[2].id}> nesiline sahipsin! Bir sonraki <@&${nesils[3].id}> nesilini elde etmek için ses kanallarıda takılmalısın.`, false)
            
            if(parseInt(ikiHaftalikSesToplam) > ms("8h") && parseInt(ikiHaftalikSesToplam) < ms("11h")) yarramgibi.addField("<:mid_neslrozz:1018160759596920922> Nesil Durumu", `Tebrikler <@&${nesils[3].id}> nesiline sahipsin! Bir sonraki <@&${nesils[4].id}> nesilini elde etmek için ses kanallarıda takılmalısın.`, false)
            
            if(parseInt(ikiHaftalikSesToplam) > ms("11h") && parseInt(ikiHaftalikSesToplam) < ms("15h")) yarramgibi.addField("<:mid_neslrozz:1018160759596920922> Nesil Durumu", `Tebrikler <@&${nesils[4].id}> nesiline sahipsin! Bir sonraki <@&${nesils[5].id}> nesilini elde etmek için ses kanallarıda takılmalısın.`, false)
            
            if(parseInt(ikiHaftalikSesToplam) > ms("15h") && parseInt(ikiHaftalikSesToplam) < ms("20h")) yarramgibi.addField("<:mid_neslrozz:1018160759596920922> Nesil Durumu", `Tebrikler <@&${nesils[5].id}> nesiline sahipsin! Bir sonraki <@&${nesils[6].id}> nesilini elde etmek için ses kanallarıda takılmalısın.`, false)

            if(parseInt(ikiHaftalikSesToplam) > ms("20h") && parseInt(ikiHaftalikSesToplam) < ms("25h")) yarramgibi.addField("<:mid_neslrozz:1018160759596920922> Nesil Durumu", `Tebrikler <@&${nesils[6].id}> nesiline sahipsin! Bir sonraki <@&${nesils[7].id}> nesilini elde etmek için ses kanallarıda takılmalısın.`, false)
            
            if(parseInt(ikiHaftalikSesToplam) > ms("25h") && parseInt(ikiHaftalikSesToplam) < ms("30h")) yarramgibi.addField("<:mid_neslrozz:1018160759596920922> Nesil Durumu", `Tebrikler <@&${nesils[7].id}> nesiline sahipsin! Bir sonraki <@&${nesils[8].id}> nesilini elde etmek için ses kanallarıda takılmalısın.`, false)

            if(parseInt(ikiHaftalikSesToplam) > ms("30h") && parseInt(ikiHaftalikSesToplam) < ms("35h")) yarramgibi.addField("<:mid_neslrozz:1018160759596920922> Nesil Durumu", `Tebrikler <@&${nesils[8].id}> nesiline sahipsin! Bir sonraki <@&${nesils[9].id}> nesilini elde etmek için ses kanallarıda takılmalısın.`, false)
        
            
           
            
            

            if(parseInt(ikiHaftalikSesToplam) > ms("35h")) yarramgibi.addField("<:nesilroz:1018146784834490379> Nesil Durumu", `Tebrikler <@&${nesils[9].id}> nesiline sahipsin! Üstün aktifliğinden dolayı sana teşekkür ederiz. `, false)

            yarramgibi.addField(`Nesil Bilgisi`, `Yeni bir nesil elde etmek için bu hafta yaptığınız aktifliğe uygun şekilde önümüzdeki hafta yeni nesil rolünü alırsınız ve aynı nesilde kalmak için ve daha fazla nesil elde etmek için daha fazla aktiflik içinde bulunursanız düşme imkanınız yoktur fakat aktiflik vermiyorsanız otomatik olarak düşüreleceksiniz.`, false)










            if(parseInt(public) < ms("14h")) {
              uye.roles.remove(rozetbir).catch(err => {})
              uye.roles.remove(rozetiki).catch(err => {})
              uye.roles.remove(rozetuc).catch(err => {})
              uye.roles.remove(rozetdort).catch(err => {})
              uye.roles.remove(rozetbes).catch(err => {})
            }
            if(parseInt(public) < ms("15h")) yarramgibi.addField("<:strozet:1018160757759807508> Rozet Durumu", `Ah güzel dostum henüz bir rozete sahip değilsin. <@&${rozetbir}> rozetini elde etmek için sohbet kanallarıda  \`${getContent(ms("15h") - public)}\` geçirmen gerekiyor.`, false)
            if(parseInt(public) > ms("15h") && parseInt(public) < ms("30h")) yarramgibi.addField("<:strozet:1018160757759807508>  Rozet Durumu", `Tebrikler <@&${rozetbir}> rozetine sahipsin! Bir sonraki <@&${rozetiki}> rozetini elde etmek için sohbet kanallarıda  \`${getContent(ms("30h") - public)}\` geçirmen gerekiyor.`, false)
            if(parseInt(public) > ms("30h") && parseInt(public) < ms("45h")) yarramgibi.addField("<:strozet:1018160757759807508>  Rozet Durumu", `Tebrikler <@&${rozetiki}> rozetine sahipsin! Bir sonraki <@&${rozetuc}> rozetini elde etmek için sohbet kanallarıda  \`${getContent(ms("45h") - public)}\` geçirmen gerekiyor.`, false)
            if(parseInt(public) > ms("45h") && parseInt(public) < ms("60h")) yarramgibi.addField("<:strozet:1018160757759807508>  Rozet Durumu", `Tebrikler <@&${rozetuc}> rozetine sahipsin! Bir sonraki <@&${rozetdort}> rozetini elde etmek için sohbet kanallarıda  \`${getContent(ms("60h") - public)}\` geçirmen gerekiyor.`, false)
            if(parseInt(public) > ms("60h") && parseInt(public) < ms("80h")) yarramgibi.addField("<:strozet:1018160757759807508>  Rozet Durumu", `Tebrikler <@&${rozetdort}> rozetine sahipsin! Bir sonraki <@&${rozetbes}> rozetini elde etmek için sohbet kanallarıda  \`${getContent(ms("80h") - public)}\` geçirmen gerekiyor.`, false)
            if(parseInt(public) > ms("80h")) yarramgibi.addField("<:strozet:1018160757759807508>  Rozet Durumu", `İnanılmazsın! <@&${rozetbes}> rozetine sahipsin! Bu rozeti taşımak sana bir his vermeli!`, false)
            if(parseInt(public) > ms("15h") && parseInt(public) < ms("30h") && !uye.roles.cache.has(rozetbir)) {
              if(parseInt(public) > ms("15h") && parseInt(public) < ms("30h") && !uye.roles.cache.has(rozetbir)) {
                uye.roles.add(rozetbir)
                yarramgibi.addField("✨ Tebrikler, yeni rozet!", `Toplam sohbet odalarında süren 15 saati geçtiği için <@&${rozetbir}> rolünü kazandın! Bir sonraki <@&${rozetiki}> rolünü elde etmek için \`${getContent(ms("30h") - public)}\` geçirmen gerekiyor.`, false)
              }
            }
            if(parseInt(public) > ms("30h") && parseInt(public) < ms("45h") && !uye.roles.cache.has(rozetiki)) {
              if(!uye.roles.cache.has(rozetiki)) {
                uye.roles.remove(rozetbir).catch(err => {})
                uye.roles.add(rozetiki)
                yarramgibi.addField("✨ Tebrikler, yeni rozet!", `Toplam sohbet odalarında süren 30 saati geçtiği için <@&${rozetiki}> rolünü kazandın! Bir sonraki <@&${rozetuc}> rolünü elde etmek için \`${getContent(ms("45h") - public)}\` geçirmen gerekiyor.`, false)
              }
            }
            if(parseInt(public) > ms("45h") && parseInt(public) < ms("60h") && !uye.roles.cache.has(rozetuc)) {
              if(!uye.roles.cache.has(rozetuc)) {
                uye.roles.remove(rozetiki).catch(err => {})
                uye.roles.add(rozetuc)
                yarramgibi.addField("✨ Tebrikler, yeni rozet!", `Toplam sohbet odalarında süren 45 saati geçtiği için <@&${rozetuc}> rolünü kazandın! Bir sonraki <@&${rozetdort}> rolünü elde etmek için \`${getContent(ms("60h") - public)}\` geçirmen gerekiyor.`, false)
              }
            }
            if(parseInt(public) > ms("60h") && parseInt(public) < ms("80h") && !uye.roles.cache.has(rozetdort)) {
              if(!uye.roles.cache.has(rozetdort)) {
                uye.roles.remove(rozetuc).catch(err => {})
                uye.roles.add(rozetdort)
                yarramgibi.addField("✨ Tebrikler, yeni rozet!", `Toplam sohbet odalarında süren 60 saati geçtiği için <@&${rozetdort}> rolünü kazandın! Bir sonraki <@&${rozetbes}> rolünü elde etmek için \`${getContent(ms("80h") - public)}\` geçirmen gerekiyor.`, false)
              }
            }
            if(parseInt(public) > ms("80h") && !uye.roles.cache.has(rozetbes)) {
              if(!uye.roles.cache.has(rozetbes)) {
                uye.roles.remove(rozetdort).catch(err => {})
                uye.roles.add(rozetbes)
                yarramgibi.addField("✨ Tebrikler, yeni rozet!", `Toplam sohbet odalarında süren 80 saati geçtiği için <@&${rozetbes}> rolünü kazandın! Üstün aktifliğinden dolayı sana teşekkür ederiz.`, false)
              }
            }
          }
        
        if(ayarlar && !ayarlar.statRozet) embed.setThumbnail(uye.user.avatarURL({dynamic: true, size: 2048}))
        if(Upstaffs && Upstaffs.Görev) embed.setFooter(uye.user.tag + ` ${Upstaffs.Görev} Görev Puanı Bulunmakta!`, uye.user.avatarURL({dynamic: true, size: 2048}))
        if(args[0] == "kart") {
          const applyText = (canvas, text) => {
            const ctx = canvas.getContext('2d');
        
            let fontSize = 70;
        
            do {
                ctx.font = `${fontSize -= 10}px sans-serif`;
            } while (ctx.measureText(text).width > canvas.width - 300);
        
            return ctx.font;
        };
        const canvas = Canvas.createCanvas(670, 630);
            const ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.moveTo(0 + Number(30), 0);
            ctx.lineTo(0 + 670 - Number(30), 0);
            ctx.quadraticCurveTo(0 + 670, 0, 0 + 670, 0 + Number(30));
            ctx.lineTo(0 + 670, 0 + 630 - Number(30));
            ctx.quadraticCurveTo(
            0 + 670,
            0 + 630,
            0 + 670 - Number(30),
            0 + 630
            );
            ctx.lineTo(0 + Number(30), 0 + 630);
            ctx.quadraticCurveTo(0, 0 + 630, 0, 0 + 630 - Number(30));
            ctx.lineTo(0, 0 + Number(30));
            ctx.quadraticCurveTo(0, 0, 0 + Number(30), 0);
            ctx.closePath();
            ctx.clip();
            const background = await Canvas.loadImage("https://pbs.twimg.com/ext_tw_video_thumb/1412375853967757314/pu/img/rbpfJo63APiPJGKi.jpg");  
          ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        
          ctx.font ='35px bebas neue',
            ctx.fillStyle = '#ffffff';
            let isimchecker = uye.user.tag
            let size = isimchecker.length
            let i = 0
              if(size < 4) i = 2.99
              if(size > 4) i = 2.99
              if(size > 9) i = 3.20
              if(size > 12) i = 3.40
              if(size > 15) i = 3.60 
            ctx.fillText(`${uye.user.tag}`, canvas.width / i, canvas.height / 3);
          
          ctx.font ='23px bebas neue',
          ctx.fillStyle = '#ffffff';
          ctx.fillText(`${Upstaffs ? `   ${Upstaffs.Görev} Görev Puanı Bulunmakta` : "Daha önce görev puanı bulunamadı"}`, canvas.width / 4.95 , canvas.height / 2.46);
  
          ctx.font ='23px bebas neue',
          ctx.fillStyle = '#ffffff';
          ctx.fillText(`Toplam Ses Bilgisi: ${client.sureCevir(haftalikSesToplam)}\n${canvasSesListe}`, canvas.width / 11, canvas.height / 2.05);
        
              const avatar = await Canvas.loadImage(uye.user.displayAvatarURL({ format: 'png' }));
         ctx.save();
            roundedImage(ctx, 250, 20, 150, 150, 25);
            ctx.clip();
          ctx.drawImage(avatar, 250, 20, 150, 150);
          ctx.closePath();
        
          // Clip off the region you drew on
          ctx.clip();
        
          function roundedImage(ctx, x, y, width, height, radius) {
          ctx.beginPath();
          ctx.moveTo(x + radius, y);
          ctx.lineTo(x + width - radius, y);
          ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
          ctx.lineTo(x + width, y + height - radius);
          ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
          ctx.lineTo(x + radius, y + height);
          ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
          ctx.lineTo(x, y + radius);
          ctx.quadraticCurveTo(x, y, x + radius, y);
          ctx.closePath();
        }
          
          const attachment = new MessageAttachment(canvas.toBuffer(), 'seyfo.png');
          message.react(message.guild.emojiGöster(emojiler.Onay))
          return message.reply({ content: `:tada: Aşağıda ${message.member.id == uye.id ? `**${message.guild.name}** sunucusuna ait sesli sohbet bilgi kartın görüntüleniyor.` : `${uye} isimli üyenin **${message.guild.name}** sunucusuna ait sesli sohbet bilgi kartı görüntüleniyor.`}`, files: [attachment]})
        } 
        let page = 0
        let Row = new MessageActionRow().addComponents(
        new MessageSelectMenu()
        .setCustomId("veric123123123312ik")
        .setPlaceholder(`${uye.user.tag} üyesinin detaylarını listele`)
        .setOptions([
          {label: "Bu haftanın verileri", value: "buhafta", emoji: {id: "998234546023706744"}},
          {label: "Geçen haftanın verileri", value: "geçenhafta", emoji: {id: "998234546023706744"}},
          {label: "Nesil ve rozet verileri", value: "nesilrozet", emoji: {id: "998234546023706744"}},
          {label: `${uye.user.tag}'ın profilini görüntüle`, value: "profil", emoji: {id: "994718367455924274"}},
      
,        ])

                    
        )

        let load = await message.reply({content: `Şuan da veriler işlenmekte. ${uye.user.tag} üyesinin verileri için lütfen bekleyin...`})

        let pages = [
          embed.setAuthor("İSTATİSİK")
          .setDescription(`Aşağıda ${uye} (${uye.roles.highest}) üyesinin bu hafta yaptığı istatistik bilgilerinin detayları belirtilmektedir.`)
          .addField(`Haftalık Ses Bilgileri`,`Toplam: \`${client.sureCevir(haftalikSesToplam)}\`
${haftalikSesListe ? haftalikSesListe ? haftalikSesListe : haftalikSesListe : `Ses istatistiği bulunamadı.`}`, ayarlar.statRozet )                        
  .addField(`Haftalık Mesaj Bilgileri`,`Toplam: \`${haftalikChatToplam}\`
${haftalikChatListe ? haftalikChatListe ? haftalikChatListe : haftalikChatListe : `Mesaj istatistiği bulunamadı.`}`, ayarlar.statRozet),
          new genEmbed().setAuthor("İSTATİSİK")
          .setDescription(`Aşağıda ${uye} (${uye.roles.highest}) üyesinin geçen hafta yaptığı istatistik bilgilerinin detayları belirtilmektedir.`)
          .addField(`Ses Bilgileri`,`Toplam: \`${client.sureCevir(ikiHaftalikSesToplam)}\`
${gecenHaftaSesListe ? gecenHaftaSesListe ? gecenHaftaSesListe : gecenHaftaSesListe : `Ses istatistiği bulunamadı.`}`, ayarlar.statRozet ),
          yarramgibi
          .setAuthor("NESİL SİSTEMİ")
          .setDescription(`Aşağıda ${uye} (${uye.roles.highest}) üyesinin sunucusunda bulunan nesil ve rozet bilgileri aşağıda belirlenmiştir.`)
          .setFooter('Aşağıda bulunan düğmeler aracılıyla geçen haftaki ve bu haftaki istatistik verilerini görüntüleyebilirsin.')

        ]
          

        await load.edit({components: [Row], content: null, embeds: [pages[page]]});
          var filter = (i) => i.user.id == message.author.id
          let collector = load.createMessageComponentCollector({filter: filter, time: 120000})
          collector.on('end', async (i) => {
            load.delete().catch(err => {})
            
          })
          collector.on('collect', async (i) => {
            if(i.values[0] == "profil") {
                let kom = client.commands.find(x => x.Isim == "profil")
                if(kom) kom.onRequest(client, message, args)
                load.delete().catch(err => {})
            }
            if(i.values[0] == "buhafta") {
              page = 0
              await load.edit({components: [Row], content: null, embeds: [pages[0]]})
              i.deferUpdate().catch(err => {})
            }
            if(i.values[0]  == "geçenhafta") {

              await load.edit({components: [Row], content: null, embeds: [pages[1]]})
                i.deferUpdate().catch(err => {})
            }
            if(i.values[0]  == "nesilrozet") {
              await load.edit({components: [Row], content: null, embeds: [pages[2]]})
              i.deferUpdate().catch(err => {})
            }

          })
       });
  }
};

function capitalizeIt(str) {
  if (str && typeof (str) === "string") {
    str = str.split(" ");
    for (var i = 0, x = str.length; i < x; i++) {
      if (str[i]) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
      }
    }
    return str.join(" ");
  } else {
    return str;
  }
}
function getContent(duration) {
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
  return arr.join(", ")
}