class Command {

    constructor({
                    name,
                    triggers,
                    dev_only,
                    permissions,
                    bot_permissions
                }, run = function(message, args) { return 'command.incomplete' }) {

        this.run = run

        this.name = name
        this.dev_only = dev_only || false
        this.triggers = [ name, ...triggers ] || [ name ]

        this.permissions = permissions || []
        this.bot_permissions = bot_permissions || []
    }

    static getArgs(message, usedPrefix) {
        const { content } = message
        const prefixLength = usedPrefix.length || process.env.PREFIX.length || 1
        const args = content.slice(prefixLength).trim().split(/ +/g)
        const command = args.shift().toLowerCase()
        return { args, command }
    }

    static isUsingPrefix(message, usedPrefix, isMentioningBot = false) {
        const { content } = message
        return !(
            !isMentioningBot && // If the author of the message is mentioning the bot, the below condition is ignored
            content.toLowerCase().trim().indexOf(usedPrefix.toLowerCase().trim()) !== 0 // If the beginning of the string IS NOT the same as the prefix being used
        )
    }

    /**
     * Returns an error message string if not allowed
     * Returns true if allowed
     * @param message {Message}
     * @param command {Command}
     * @returns {boolean|string}
     */
    static isAllowed(message, command) {

        const { member, guild, channel } = message



        /// DEVELOPER
        if (process.env.DEVELOPERS.includes(member.id)) {
            return true
        }
        if (command.dev_only && !process.env.DEVELOPERS.includes(member.id)) {
            return 'This command is for developers only.'
        }

        if(command.permissions[0] && command.permissions.some(p => !member.hasPermission(p))){
            return true
        }

        if(command.bot_permissions[0] && command.bot_permissions.some(p => !message.guild.me.hasPermission(p))){
            return "I think I'm missing some permissions. Please make sure I have the following permissions in this server: \n" + command.bot_permissions.map(l => l.join("\n"))
        }

        if(!command.permissions[0] && !command.dev_only){
            return true
        }

        else return "I don't think you have permission to do this."

    }

}


module.exports = Command
