class Command {
    constructor(client, {
        name = null,
        aliases = [],
        description = [],
        category = null,
        ramal = false,
        Founder = false,
        enabled = true,
        cooldown = 1,

    }) {
        this.client = client;
        this.config = {
            ramal,
            Founder,
            enabled,
        };
        this.info = {
            name,
            aliases,
            category,
            description,
            cooldown
        };
    }
    async run() {

    }
}
module.exports = Command;