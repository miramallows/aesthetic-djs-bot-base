const Command = require('../class/Command')
const { MessageEmbed } = require('discord.js')


module.exports = async function (message) {

    const { client, author, content, channel } = message
    const { commands } = client

    if (author.bot) { return }

    const regularMention = content.startsWith(`<@${client.user.id}>`)
    const isMentioningBot = (regularMention || content.startsWith(`<@!${client.user.id}>`))
    const mentionString = regularMention ? `<@${client.user.id}>` : `<@!${client.user.id}>`
    const usedPrefix = isMentioningBot ? mentionString : process.env.PREFIX

    const { args, command } = Command.getArgs(message, usedPrefix)

    if (!Command.isUsingPrefix(message, usedPrefix, isMentioningBot)) { return }

    const found = commands.get(command)
    if (found) {

        const possibleError = Command.isAllowed(message, found)
        if (possibleError !== true) {
            return channel.send(possibleError)
                .catch(() => {
                    author.send(possibleError)
                        .catch(() => {})
                })
        }

        let msg, result
        if (found.run instanceof global.Promise) {
            result = await found.run.bind(client)(message, args)
        } else {
            result = found.run.bind(client)(message, args)
        }

        if (result instanceof global.Promise) {
            result = await result
        }

        if (['string', 'object'].includes(typeof result) || result instanceof MessageEmbed) {

            if (Array.isArray(result)) {
                msg = result[0]
                result = result[1]
            }

            if (typeof result === 'object' && !result.embed) {
                result = { embed: result }
            }

            if (typeof result === 'string') {
                msg = {
                    embed: {
                        color: process.env.BASE_EMBED_COLOR,
                        description: result
                    }
                }
                result = undefined
            }

            try {
                await channel.send(msg, result)
            } catch ( err ) {
                const dateNow = new Date().getTime()
                console.log(dateNow + "\n" + err)
                return channel.send("`" + dateNow + "` | I'm not sure why, but I ran into an error. Please contact developers for more details ^-^")
            }
        }
    }


}
