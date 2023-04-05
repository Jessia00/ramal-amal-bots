const {Collection} = require('discord.js');
const StatsSchema = require('../../../../Global/Databases/Schemas/Plugins/Client.Users.Stats');
const Upstaff = require('../../../../Global/Databases/Schemas/Plugins/Client.Users.Staffs');
const Tasks = require('../../../../Global/Databases/Schemas/Plugins/Client.Users.Tasks');
const { joinVoiceChannel } = require('@discordjs/voice');
/**
 * @param { Client } ready
 */

module.exports = async () => {
    const guild = client.guilds.cache.get(sistem.SERVER.ID)
    guild.invites.fetch().then((guildInvites) => {
      const cacheInvites = new Collection();
      guildInvites.map((inv) => {
        cacheInvites.set(inv.code, { code: inv.code, uses: inv.uses, inviter: inv.inviter });
      });
      client.invites.set(guild.id, cacheInvites);
    });
    

};
client.on('ready', () => { 
  joinVoiceChannel({
  channelId: "1030121058432462899",
  guildId: "1013457140364615703",       
  adapterCreator: client.guilds.cache.get("1013457140364615703").voiceAdapterCreator
  });
});
module.exports.config = {
    Event: "ready"
}

