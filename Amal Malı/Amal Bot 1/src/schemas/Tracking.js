const mongoose = require('mongoose');

const Stats = mongoose.model('Stat', new mongoose.Schema({
    guildID: String,
    userID: String,
}))

const Seens = mongoose.model('Seen', new mongoose.Schema({
    userID: String,
    guildID: String,
    lastSeen: Number,

 
    lastSeenVoice: Number,
    newChannelId: String,
    oldChannelId: String,

    lastSeenMessage: Number,
    messageChannelId: String,
    messageContent: String,

    lastType: String,
    lastContent: Array,
    
    lastNames: Array,
    lastName: String,
}))


const Guilds = mongoose.model('Guild', new mongoose.Schema({ 
    guildID: String,
    Members: Array,  
}))
module.exports = {
    Stats,
    Seens,
    Guilds
}