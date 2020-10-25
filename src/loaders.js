const fs = require('fs')
const path = require('path')
const { Collection } = require('discord.js')

const getFiles = name => fs.readdirSync(path.resolve(__dirname, name))
const getFile = (dir, file) => require(path.resolve(__dirname, dir, file))

// Event Loader
function loadEvents(client) {
    const files = getFiles('events')
    client.events = new Collection()
    for (const file of files) {
        const eventName = file.split('.')[0]
        try {
            const event = getFile('events', file)
            const listener = async (...eventArgs) => await event.bind(client)(...eventArgs)
            client.events.set(eventName, listener)
            client.on(eventName, listener)
            console.log(`Event ${eventName} was loaded.`)
        } catch(e) {
            console.error(`Event ${eventName} failed to load.\n`, e)
        }
    }
}

// Command loader
function loadCommands(client) {
    const files = getFiles('commands')
    client.commands = new Collection()
    for (const file of files) {
        const commandName = file.split('.')[0]
        try {
            const command = getFile('commands', file)
            for (const trigger of command.triggers) {
                client.commands.set(trigger, command)
            }
            console.log(`Command "${commandName}" was loaded with ${command.triggers.length} command triggers.`)
        } catch(e) {
            console.error(`Command ${commandName} failed to load.\n`, e)
        }
    }
}


module.exports = { loadEvents, loadCommands }
