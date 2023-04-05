const { Client, Collection, GuildMember, Guild, MessageEmbed, TextChannel } = require('discord.js');
const Coins = require("../Databases/Schemas/Coins")
/*
* Sunucu içerisinde bulunan prototypelar
* İşe yarayanlar kıpss 
*/

Guild.prototype.rolBul = function(content) {
    let rol = this.roles.cache.find(r => r.name === content) || this.roles.cache.find(r => r.id === content)
    if(!rol) return client.logger.log(`${content} rolünü ${this.name} sunucusun da aradım fakat bulamadım.`,"error");
    return rol;
}

Guild.prototype.kanalBul = function(content) {
    let kanal = this.channels.cache.find(k => k.name === content) || this.channels.cache.find(k => k.id === content)
    if(!kanal) return client.logger.log(`${content} kanalını ${this.name} sunucusun da aradım fakat bulamadım.`,"error");
    return kanal;

}

Guild.prototype.emojiGöster = function(content) {
    let emoji = this.emojis.cache.find(e => e.name === content) || this.emojis.cache.find(e => e.id === content) 
    if(!emoji) {
        if(this.client.emojis.cache.find(e => e.id === content) || this.client.emojis.cache.find(e => e.name === content)) {
            let emojicik = this.client.emojis.cache.find(e => e.id === content) || this.client.emojis.cache.find(e => e.name === content)
            if(!emojicik) return '#EmojiBulunamadı';
            if(emojicik.animated) return `<a:${emojicik.name}:${emojicik.id}>`;
            return `<:${emojicik.name}:${emojicik.id}>`;
        }
    }
    return emoji;
}

GuildMember.prototype.coinAdd = async function (Miktar) {
    await Coins.updateOne({_id: this.user.id}, { $inc: {"Coin": Miktar}}, {upsert: true}).exec();
}

Collection.prototype.array = function () {
    return [...this.values()]
  }