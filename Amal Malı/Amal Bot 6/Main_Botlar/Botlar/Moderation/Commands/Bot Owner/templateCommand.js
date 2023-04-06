const { Ramalcim } = require('../../../../Helpers/Schemas')
class Test extends Command {
    constructor(client) {
        super(client, {
            name: "test",
            aliases: ["test"],
            ramal: true,
            Founder: true
        });
    }
    async run(client, message, args, embed) {
    
    }
}

module.exports = Test


