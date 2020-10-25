require('dotenv').config()

// loads .env into cache

const { Client } = require('discord.js')
const { loadEvents, loadCommands } = require('./loaders')

const client = new Client()

loadCommands(client)
loadEvents(client)

client.login(process.env.TOKEN).then(() => {
    console.log("ready . . .")
})