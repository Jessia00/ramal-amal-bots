const mongoose = require('mongoose')

const schema = mongoose.model('Guild', new mongoose.Schema({
    _id: String,
    guildID: String,
    Date: {type: Date, default: Date.now()},
    Ayarlar: {type: Object, default: {
        staff: ["962417173043753022"]
    }},
        
    talentPerms: Object,
}));

module.exports = schema;