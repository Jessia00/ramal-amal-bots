const { Client, Message, MessageEmbed, MessageButton, MessageActionRow, MessageAttachment } = require("discord.js");
const Canvas = require('canvas')
const { genEmbed } = require("../../../../Global/Init/Embed");

module.exports = {
    Isim: "ship",
    Komut: ["shippe","love","sanal8"],
    Kullanim: "ship @sehira/ID",
    Aciklama: "Bir üyenin coin bilgisini görüntüler.",
    Kategori: "diğer",
    Extend: true,
    
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
        
        let person = message.mentions.users.first() || client.guilds.cache.get(sistem.SERVER.ID).members.cache.get(args[0]) 
        if (!person || message.author.id === person.id) {
            person = message.guild.members.cache
           .filter(m => m.id !== message.author.id && !roller.kayıtsızRolleri.some(x => m.roles.cache.get(x))) 
           .random();
           if(roller.erkekRolleri.some(x => message.member.roles.cache.has(x))) person = message.guild.members.cache
           .filter(m => m.id !== message.author.id && !roller.kayıtsızRolleri.some(x => m.roles.cache.get(x)) && roller.kadınRolleri.some(x => m.roles.cache.get(x))) 
           .random();
           if(roller.kadınRolleri.some(x => message.member.roles.cache.has(x))) person = message.guild.members.cache
           .filter(m => m.id !== message.author.id && !roller.kayıtsızRolleri.some(x => m.roles.cache.get(x)) && roller.erkekRolleri.some(x => m.roles.cache.get(x))) 
           .random();
           
        }
        person = message.guild.members.cache.get(person.id)
        const love = Math.random() * 100;
        const loveIndex = Math.floor(love / 10);
        const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);
        let emoticon;
        if (love > 60) {
            emoticon = ('https://cdn.glitch.com/00963c7e-8e86-4a55-8d85-36add9e330d7%2Femoji_2.png?v=1593651528429'); 
        } else if (love >= 40) {
            emoticon = ('https://cdn.glitch.com/00963c7e-8e86-4a55-8d85-36add9e330d7%2Femoji_3-1.png?v=1593652255529'); 
        } else {
            emoticon = ('https://cdn.glitch.com/00963c7e-8e86-4a55-8d85-36add9e330d7%2Femoji_1.png?v=1593651511900'); 
        }
        const canvas = Canvas.createCanvas(384, 128);
        const ctx = canvas.getContext('2d');
        const emotes = await Canvas.loadImage(emoticon);
        const avatar1 = await Canvas.loadImage(message.member.displayAvatarURL({ format: "png" }));
        const avatar2 = await Canvas.loadImage(person.displayAvatarURL({ format: "png" }));
        ctx.beginPath();
        ctx.moveTo(0 + Number(10), 0);
        ctx.lineTo(0 + 384 - Number(10), 0);
        ctx.quadraticCurveTo(0 + 384, 0, 0 + 384, 0 + Number(10));
        ctx.lineTo(0 + 384, 0 + 128 - Number(10));
        ctx.quadraticCurveTo(
        0 + 384,
        0 + 128,
        0 + 384 - Number(10),
        0 + 128
        );
        ctx.lineTo(0 + Number(10), 0 + 128);
        ctx.quadraticCurveTo(0, 0 + 128, 0, 0 + 128 - Number(10));
        ctx.lineTo(0, 0 + Number(10));
        ctx.quadraticCurveTo(0, 0, 0 + Number(10), 0);
        ctx.closePath();
        ctx.clip();
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, 384, 128);
        let background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/946751524028162118/947678638315298866/open-the-door-android-iphone-desktop-hd-backgrounds-wallpapers-1080p-4khd-wallpapers-desktop-background-android-iphone-1080p-4k-pqrfj.png");
        ctx.drawImage(background, 0, 0, 384, 129);
        ctx.drawImage(emotes, 160, 30, 64, 64);
        ctx.drawImage(avatar1, 20, 20, 96, 96);
        ctx.drawImage(avatar2, 270, 20, 96, 96);
        const img = new MessageAttachment(canvas.toBuffer(), 'ship.png')
        const embed = new genEmbed()
            .setColor("RED")
            .addField(`☁ **${person.displayName}** seni **${message.member.displayName}** Çok Mu Seviyor?`,
            `💟 ${Math.floor(love)}%\n\n${loveLevel}`);

        message.channel.send({content: `Λ L ☉ R Λ`,embeds: [embed.setImage("attachment://ship.png")], files: [img]});
 
        
    }
};

