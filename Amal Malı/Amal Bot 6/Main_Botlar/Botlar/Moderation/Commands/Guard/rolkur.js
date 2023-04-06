const { Ramalcim, roleBackup } = require("../../../../Helpers/Schemas")
const {rolKur} = require("../../../../Helpers/BackupFunction")
class rolkur extends Command {
    constructor(client) {
        super(client, {
            name: "rolkur",
            aliases: ["rokurulum","rolkur"],
            Founder: true,
        });
    }
    async run(client, message, args, embed) {
        const ramal = await Ramalcim.findOne({ guildID: message.guild.id })
        if (!args[0] || isNaN(args[0])) return message.reply(`**UYARI :** Bir rol belirtmeyi unuttun!`).sil(5); 
        await roleBackup.findOne({ roleID: args[0] }, async (err, data) => { 
            if (!data) return message.reply(`**UYARI:** Belirtilen rol ID'sine ait veri bulunamadı!`).sil(5); 
            const newRole = await message.guild.roles.create({ 
                name: data.name, 
                color: data.color, 
                hoist: data.hoist, 
                permissions: data.permissions, 
                position: data.position, 
                mentionable: data.mentionable, 
                reason: "Rol Silindiği İçin Tekrar Oluşturuldu!" 
            }); 
            await message.reply({ embeds: [embed.setDescription(`<@&${newRole.id}> (\`${newRole.id}\`) isimli rol oluşturuldu ${emojis.onay}\n\n Rol üyelerine dağıtılmaya ve kanal izinleri eklenmeye başlanıyor.`)] }); rolKur(args[0], newRole); 
            await client.channels.cache.get(ramal.guardLog).send({ embeds: [embed.setDescription(`${message.author} tarafından <@&${newRole.id}> [\`${newRole.id}\`] rolü oluşturdu!`)] }) 
            if (args[0] === ramal.banHammer) { await Ramalcim.findOneAndUpdate({ guildID: config.guildID }, { $set: { banHammer: newRole.id } }, { upsert: true }).exec(); }

            if (args[0] === ramal.jailHammer) { await Ramalcim.findOneAndUpdate({ guildID: config.guildID }, { $set: { jailHammer: newRole.id } }, { upsert: true }).exec(); }
    
            if (args[0] === ramal.muteHammer) { await Ramalcim.findOneAndUpdate({ guildID: config.guildID }, { $set: { muteHammer: newRole.id } }, { upsert: true }).exec(); }
    
            if (args[0] === ramal.vmuteHammer) { await Ramalcim.findOneAndUpdate({ guildID: config.guildID }, { $set: { vmuteHammer: newRole.id } }, { upsert: true }).exec(); }
    
            if (args[0] === ramal.clownhammer) { await Ramalcim.findOneAndUpdate({ guildID: config.guildID }, { $set: { clownHammer: newRole.id } }, { upsert: true }).exec(); }
    
            if (args[0] === ramal.moveHammer) { await Ramalcim.findOneAndUpdate({ guildID: config.guildID }, { $set: { moveHammer: newRole.id } }, { upsert: true }).exec(); }
    
            if (args[0] === ramal.registerHammer) { await Ramalcim.findOneAndUpdate({ guildID: config.guildID }, { $set: { registerHammer: newRole.id } }, { upsert: true }).exec(); }
    
            if (args[0] === ramal.unregisterRole) { await Ramalcim.findOneAndUpdate({ guildID: config.guildID }, { $set: { unregisterRole: newRole.id } }, { upsert: true }).exec(); }
    
            if (args[0] === ramal.tagRol) { await Ramalcim.findOneAndUpdate({ guildID: config.guildID }, { $set: { tagRol: newRole.id } }, { upsert: true }).exec(); }
    
            if (args[0] === ramal.mutedRol) { await Ramalcim.findOneAndUpdate({ guildID: config.guildID }, { $set: { mutedRol: newRole.id } }, { upsert: true }).exec(); }
    
            if (args[0] === ramal.vmutedRol) { await Ramalcim.findOneAndUpdate({ guildID: config.guildID }, { $set: { vmutedRol: newRole.id } }, { upsert: true }).exec();}
    
            if (args[0] === ramal.jailedRole) { await Ramalcim.findOneAndUpdate({ guildID: config.guildID }, { $set: { jailedRole: newRole.id } }, { upsert: true }).exec();}
    
            if (args[0] === ramal.etkinlikRole) { await Ramalcim.findOneAndUpdate({ guildID: config.guildID }, { $set: { etkinlikRole: newRole.id } }, { upsert: true }).exec(); }
    
            if (args[0] === ramal.cekilisRole) { await Ramalcim.findOneAndUpdate({ guildID: config.guildID }, { $set: { cekilisRole: newRole.id } }, { upsert: true }).exec(); }
        
            if (ramal.manRoles.includes(args[0])) { await Ramalcim.findOneAndUpdate({ guildID: config.guildID }, { $pull: { manRoles: role } }, { upsert: true }).exec(); await Ramalcim.findOneAndUpdate({ guildID: config.guildID }, { $push: { manRoles: newRole.id } }, { upsert: true }).exec(); }
    
            if (ramal.womanRoles.includes(args[0])) { await Ramalcim.findOneAndUpdate({ guildID: config.guildID }, { $pull: { womanRoles: role } }, { upsert: true }).exec(); await Ramalcim.findOneAndUpdate({ guildID: config.guildID }, { $push: { womanRoles: newRole.id } }, { upsert: true }).exec(); }
    
            if (ramal.yonetimRoles.includes(args[0])) { await Ramalcim.findOneAndUpdate({ guildID: config.guildID }, { $pull: { yonetimRoles: role } }, { upsert: true }).exec(); await Ramalcim.findOneAndUpdate({ guildID: config.guildID }, { $push: { yonetimRoles: newRole.id } }, { upsert: true }).exec(); }    
        });
        }
};

module.exports = rolkur