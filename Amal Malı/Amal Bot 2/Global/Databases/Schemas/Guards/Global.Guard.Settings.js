const mongoose = require("mongoose");

const schema = mongoose.model('Guard', new mongoose.Schema({
    guildID: String,
    guildProtection: {type: Boolean, default: true},

    // Dokunulmaz
    unManageable: {type: Array, default: ["1031098368405016596","1031098542414118922"]},
    
    // İzinler
    fullAccess: {type: Array, default: ["1031098368405016596","1031098542414118922"]},
    guildAccess: {type: Array, default: ["1031098368405016596","1031098542414118922"]},
    emojiAccess: {type: Array, default: ["1031098368405016596","1031098542414118922"]},
    rolesAcess: {type: Array, default: ["1031098368405016596","1031098542414118922"]},
    botAccess: {type: Array, default: ["1031098368405016596","1031098542414118922"]},
    channelsAccess: {type: Array, default: ["1031098368405016596","1031098542414118922"]},
    memberAccess: {type: Array, default: ["1031098368405016596","1031098542414118922"]},
    
    auditLimit: {type: Number, default: 19},
    auditInLimitTime: {type: String, default: "2m"},

}));

module.exports = schema;