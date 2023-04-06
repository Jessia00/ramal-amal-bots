const { Ramalcim } = require("../../../../Helpers/Schemas");
class Control extends Command {
  constructor(client) {
    super(client, {
      name: "kontrol",
      aliases: ["control", "tk"],
      cooldown: 30,
    });
  }
  async run(client, message, args, embed) {
    const ramal = await Ramalcim.findOne({ guildID: message.guild.id });
    if (
      !config.Founders.includes(message.author.id) &&
      !config.root.includes(message.author.id) &&
      !ramal.yonetimRoles.some((rol) => message.member.roles.cache.has(rol)) &&
      !message.member.permissions.has("ADMINISTRATOR")
    )
      return message.channel
        .send({
          embeds: [
            embed.setDescription(
              `**UYARI :** Bu komutu kullanabilmek için yeterli yetkiye sahip değilsin!`
            ),
          ],
        })
        .sil(15);
    let tagges = message.guild.members.cache.filter(
      (member) =>
        !member.user.bot &&
        ramal.tags.some(
          (tag) =>
            member.user.username.includes(tag) ||
            member.user.discriminator ==
              ramal.tags.filter((discrim) => !isNaN(discrim))[0]
        ) &&
        !member.roles.cache.has(ramal.tagRol)
    );
    let etk = message.guild.members.cache.filter(
      (member) => !member.roles.cache.has(ramal.etkinlikRole) && !member.user.bot
    ).size;
    let cek = message.guild.members.cache.filter(
      (member) => !member.roles.cache.has(ramal.cekilisRole) && !member.user.bot
    ).size;
    let kayitsiz = message.guild.members.cache.filter(
      (member) =>
        !member.roles.cache.has(ramal.unregisterRole) && !member.user.bot
    ).size;
    const row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setCustomId("etkinlikdagit")
        .setLabel("Etkinlik Rol Dağıt")
        .setStyle("DANGER"),
      new Discord.MessageButton()
        .setCustomId("cekilisdagit")
        .setLabel("Çekiliş Rol Dağıt")
        .setStyle("DANGER"),
      new Discord.MessageButton()
        .setCustomId("tagrol")
        .setLabel("Family Dağıt")
        .setStyle("DANGER"),
      new Discord.MessageButton()
      .setCustomId("kayitsizdagit")
      .setLabel("Kayıtsız Dağıt")
      .setStyle("DANGER")
    );
    let ysay = await message.channel.send({
      embeds: [
        embed.setDescription(
          `${message.author} Sunucunun Kontrol paneline hoş geldiniz!
          
          \` • \` Sunucumuzda **${tagges.size}** adet kullanıcıya taglı permi dağıtılacak!
          \` • \` Sunucumuzda **${etk}** adet kullanıcıya etkinlik/çekiliş katılımcısı permi dağıtılacak!
          \` • \` Sunucumuzda **${kayitsiz}** adet kullanıcıya kayıtsız permi dağıtılacak!`
        ),
      ],
      components: [row],
    });
    var filter = (button) => button.user.id === message.author.id;
    const collector = ysay.createMessageComponentCollector({
      filter,
      time: 30000,
    });
    collector.on("collect", async (button, user) => {
      if (button.customId === "etkinlikdagit") {
        await button.reply({
          content: `${emojis.onay} Etkinlik Katılımcısı rolü olmayan **${etk}** kişiye rol dağıtılıyor.`,
          ephemeral: true,
        });
        button.guild.members.cache
          .filter(
            (member) =>
              !member.roles.cache.has(ramal.etkinlikRole) && !member.user.bot
          )
          .forEach((x) => x.roles.add(ramal.etkinlikRole));
      }
      if (button.customId === "cekilisdagit") {
        await button.reply({
          content: `${emojis.onay} Çekiliş Katılımcısı rolü olmayan **${cek}** kişiye rol dağıtılıyor.`,
          ephemeral: true,
        });
        button.guild.members.cache
          .filter(
            (member) =>
              !member.roles.cache.has(ramal.cekilisRole) && !member.user.bot
          )
          .forEach((x) => x.roles.add(ramal.cekilisRole));
      }
      if (button.customId === "kayitsizdagit"){
        await button.channel.send({content: `${message.author} Sunucunun kayıtsız kullanıcılarının permi dağıtımı başarıyla tamamlandı!`})
        await button.guild.members.cache.filter(s => s.roles.cache.size <= 1).forEach(s => s.roles.add(ramal.unregisterRole).catch(e => {}))
      }
      if (button.customId === "tagrol") {
        button.guild.members.cache
          .filter(
            (member) =>
              (!member.user.bot &&
                ramal.tags.some((tag) => member.user.username.includes(tag))) ||
              (member.user.discriminator ==
                ramal.tags.filter((discrim) => !isNaN(discrim))[0] &&
                !member.roles.cache.has(ramal.tagRol))
          )
          .forEach((x) => x.roles.add(ramal.tagRol));
        await button.reply({
          content: `${emojis.onay} Tagı olup rolü olmayan **${tagges.size}** kişiye rol dağıtılıyor.`,
        });
      }
    });
  }
}

module.exports = Control;
