const { Message } = require("discord.js");
const { Upstaff } =require('../../../../Global/Plugins/Staff/_index');
const Stats = require("../../../../Global/Databases/Schemas/Plugins/Client.Users.Stats");
const veriler = new Map();
const verileriki = new Map();

 /**
 * @param {Message} message 
 */


client.on("messageCreate", async (message) => {
    if (message.author.bot || !message.guild || message.webhookID || message.channel.type === "dm" || sistem.botSettings.Prefixs.some(x => message.content.startsWith(x))) return;
    Stats.findOne({ guildID: message.guild.id, userID: message.author.id }, (err, data) => {
        let kanalID = message.channel.parentId || message.channel.id;
        if (!data) {
            let voiceMap = new Map();
            let chatMap = new Map();
            let voiceCameraMap = new Map();
            let voiceStreamingMap = new Map();
            chatMap.set(kanalID, 1);
            let newMember = new Stats({
                guildID: message.guild.id,
                userID: message.author.id,
                voiceStats: voiceMap,
                taskVoiceStats: voiceMap,
                upstaffVoiceStats: voiceMap,
                voiceCameraStats: voiceCameraMap,
                voiceStreamingStats:  voiceStreamingMap,     
                totalVoiceStats: 0,
                chatStats: chatMap,
                upstaffChatStats: chatMap,
                totalChatStats: 1,
                oldVoiceStats: new Map()
            });
            newMember.save() 
        } else {
            let lastData = data.chatStats.get(kanalID) || 0;
            let lastStaffData = data.upstaffChatStats.get(kanalID) || 0;
            data.chatStats.set(kanalID, Number(lastData)+1);
            if(_statSystem.system && _statSystem.staffs.some(x => message.member.roles.cache.has(x.rol))) data.upstaffChatStats.set(kanalID, Number(lastStaffData)+1);
            data.totalChatStats++;
            data.save();
    };
  }); 
})
