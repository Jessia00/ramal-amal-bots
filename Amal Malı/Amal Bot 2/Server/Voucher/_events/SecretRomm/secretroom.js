const { Message, MessageEmbed } = require("discord.js");
const Users = require('../../../../Global/Databases/Schemas/Client.Users');
const GUILDS_SETTINGS = require('../../../../Global/Databases/Schemas/Global.Guild.Settings');
const Settings = require('../../../../Global/Databases/Schemas/Global.Guild.Settings');
const { genEmbed } = require("../../../../Global/Init/Embed");
const commandBlocks = require('../../../../Global/Databases/Schemas/Others/Users.Command.Blocks');
const ms = require('ms');
const spamCommandCount = new Map()

 /**
 * @param {Message} message 
 */

module.exports = async (message) => { 
    client.on('voiceStateUpdate', (oldMember, newMember) => {
        // todo create channel
        if (newMember.voiceChannel != null && newMember.voiceChannel.name.startsWith('Özel Oda Oluştur')) {
            newMember.guild.createChannel(`║👤 ${newMember.displayName}`, {
                type: 'voice',
                parent: newMember.voiceChannel.parent,
                permissions: ['']
           }).then(cloneChannel => {
            newMember.setVoiceChannel(cloneChannel)
            cloneChannel.setUserLimit()
          })
        }
        
        // ! leave
        if (oldMember.voiceChannel != undefined) {
            if (oldMember.voiceChannel.name.startsWith('║👤 ')) {
                if (oldMember.voiceChannel.members.size == 0) {
                    oldMember.voiceChannel.delete()
                }
                else { // change name
                    let matchMember = oldMember.voiceChannel.members.find(x => `║👤 ${x.displayName}` == oldMember.voiceChannel.name);
                    if (matchMember == null) {
                        oldMember.voiceChannel.setName(`║👤 ${oldMember.voiceChannel.members.random().displayName}`)
                    }
                }
            }
        }
    });


   



};

module.exports.config = {
    Event: "secretroom"
};