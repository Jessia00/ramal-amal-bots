const { Client, Message, MessageButton, MessageEmbed, MessageAttachment, MessageActionRow } = require("discord.js");
const Coins = require('../../../../Global/Databases/Schemas/Coins');
const Canvas =require("canvas")
module.exports = {
    Isim: "coin",
    Komut: ["currently","coinlerim","para","param", "c"],
    Kullanim: "coin <@sehira/ID>",
    Aciklama: "",
    Kategori: "eco",
    Extend: true,
    
   /**
   * @param {Client} client 
   */
  onLoad: function (client) {

  },

   /**
   * @param {Client} client
   * @param {Message} message
   * @param {Array<String|Number>} args
   * @returns {Promise<void>}
   */


  onRequest: async function (client, message, args) {    
        if(!coinConf.sistem) return;
if(!kanallar.coinChat.some(x => message.channel.id == x) && !ayarlar.staff.find(x => x.id == message.member.id)) return message.channel.send(`${message.guild.emojiGöster(emojiler.Iptal)} Sadece ${kanallar.coinChat.map(x => message.guild.channels.cache.get(x)).join(",")} kanalların da oynayabilirsin.`).then(x => setTimeout(() => {
    x.delete()
    }, 3500));
    let kullanici = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
    let uye = message.guild.members.cache.get(kullanici.id);
    let Coin = await Coins.findById(uye.id)
    let Hesap = await Coins.findById({_id: message.member.id}) 
    // canvas
    let canvas = Canvas.createCanvas(1080, 400),
        
        ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(0 + Number(30), 0);
    ctx.lineTo(0 + 1080 - Number(30), 0);
    ctx.quadraticCurveTo(0 + 1080, 0, 0 + 1080, 0 + Number(30));
    ctx.lineTo(0 + 1080, 0 + 400 - Number(30));
    ctx.quadraticCurveTo(
    0 + 1080,
    0 + 400,
    0 + 1080 - Number(30),
    0 + 400
    );
    ctx.lineTo(0 + Number(30), 0 + 400);
    ctx.quadraticCurveTo(0, 0 + 400, 0, 0 + 400 - Number(30));
    ctx.lineTo(0, 0 + Number(30));
    ctx.quadraticCurveTo(0, 0, 0 + Number(30), 0);
    ctx.closePath();
    ctx.clip();
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 1080, 400);
    //client.guilds.cache.get(sistem.SERVER.ID).banner ? client.guilds.cache.get(sistem.SERVER.ID).banner ? client.guilds.cache.get(sistem.SERVER.ID).bannerURL({dynamic: true, format: "png"})
    let background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/946751524028162118/947678638315298866/open-the-door-android-iphone-desktop-hd-backgrounds-wallpapers-1080p-4khd-wallpapers-desktop-background-android-iphone-1080p-4k-pqrfj.png");
    ctx.drawImage(background, 0, 0, 1080, 400);
    ctx.restore();
    ctx.fillStyle = "#000000";
    ctx.globalAlpha = 0.5;
    ctx.fillRect(50, 25, 980, 350);
    ctx.globalAlpha = 1;
    ctx.stroke();
        let gold = await Canvas.loadImage("https://cdn.discordapp.com/emojis/911728572534751243.gif?size=96")
        let coin = await Canvas.loadImage("https://cdn.discordapp.com/emojis/911728579849646120.png?size=44")
        ctx.drawImage(gold, canvas.width - 750, 260, 85, 75);
        ctx.drawImage(coin, canvas.width - 740, 200, 75, 65);
      // Draw title
      ctx.font = "30px Arial";
      ctx.strokeStyle = "#e7d02e";
      ctx.lineWidth = 3;
      ctx.fillStyle = "#ffffff";
        

      ctx.fillStyle = "#000000"; 
      ctx.lineWidth = 3;
      ctx.fillStyle = "#e7d02e";
      ctx.font = applyText(canvas, uye.user.tag + " UYESININ HESABI", 40, 600, "Arial");
      ctx.fillText(uye.user.tag + " UYESININ HESABI", canvas.width - 740, canvas.height - 230);




    // Draw title
    ctx.font = "30px Arial";
    ctx.strokeStyle = "#e7d02e";
    ctx.lineWidth = 3;
    ctx.strokeText(Coin ? Coin.Coin : 0 + " "+ ayarlar.serverName + " PARASI", canvas.width - 650, 240);
    ctx.fillStyle = "#ffffff";
     ctx.fillText(Coin ? Coin.Coin : 0 + " "+ ayarlar.serverName + " PARASI", canvas.width - 650, 240);

    // Draw title
    ctx.font = "70px Bold";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 8;
    ctx.strokeText(ayarlar.serverName, canvas.width - 650, canvas.height - 300);
    ctx.fillStyle = "#e7d02e";
    ctx.fillText(ayarlar.serverName, canvas.width - 650, canvas.height - 300);

    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#e7d02e";
    ctx.arc(193, 200, 130, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.closePath();
    ctx.clip();
    const avatar = await Canvas.loadImage(uye.user.avatar ? uye.user.avatarURL({dynamic: true , format: "png"}) : "https://cdn.discordapp.com/attachments/915702481776963615/928900758135509022/dd83hdp-ef7fc5cd-ac92-4ad1-adfc-8e2e933ce256.png");
    ctx.drawImage(avatar, 58, 70, 270, 270);
    const attachment = new MessageAttachment(canvas.toBuffer(), 'sehira_economy.png');
    // canvas son
    let marketButton = new MessageButton()
    .setCustomId(`market`)
    .setLabel(`Market`)
    .setEmoji("948674883200630874")
    .setStyle('SECONDARY')
    let envanterButton = new MessageButton()
    .setCustomId(`envanter`)
    .setLabel(`Satın Aldıklarım`)
    .setEmoji("948677620290166886")
    .setStyle('SECONDARY')
  
    let profilOptions = new MessageActionRow().addComponents(
        marketButton,
        envanterButton,
        new MessageButton()
    .setCustomId(`günlük`)
    .setLabel(`Günlüğünü Al`)
    .setEmoji("948680304174960662")
    .setStyle('SUCCESS')    
    );
    if(Hesap && Hesap.GunlukCoin) {
        let yeniGün = Hesap.GunlukCoin + (1*24*60*60*1000);
        if (Date.now() < yeniGün) {
            profilOptions.components[2].setLabel(`${kalanzaman(yeniGün)}`)
            profilOptions.components[2].setStyle("SECONDARY")
            profilOptions.components[2].setDisabled(true)
        }
    }
    let msg = await message.channel.send({content: `💳 | ${uye}, **${ayarlar.serverName}** Parası ve Altın hesabın aşağıda gösterilmektedir.`, components: [profilOptions], files: [attachment]}).catch(err => {})
    

  const filter = i => i.user.id == message.member.id 
  const collector = msg.createMessageComponentCollector({ filter, time: 25000, max: 1 });

  collector.on('collect', async i => {
    if (i.customId === `market`) {
      msg.delete().catch(err => {})
       let kom = client.commands.find(x => x.Isim == "mağaza")
                    kom.onRequest(client, message, args)
                    i.deferUpdate()
    }
  })

  collector.on('collect', async i => {
    if (i.customId === `envanter`) {
      msg.delete().catch(err => {})
       let kom = client.commands.find(x => x.Isim == "envanter")
                    kom.onRequest(client, message, args)
                    i.deferUpdate()
    }
  })

  collector.on('collect', async i => {
    if (i.customId === `günlük`) {
      msg.delete().catch(err => {})
       let kom = client.commands.find(x => x.Isim == "günlük")
                    kom.onRequest(client, message, args)
                    i.deferUpdate()
    }
  })
  function applyText(canvas, text, defaultFontSize, width, font){
    const ctx = canvas.getContext("2d");
    do {
        ctx.font = `${(defaultFontSize -= 1)}px ${font}`;
    } while (ctx.measureText(text).width > width);
    return ctx.font;
}
}
};