# aesthetic-djs-bot-base
A simple and aesthetic Discord Bot base that uses discord.js.

A very simple framework designed to give friendly and easy to trace back errors. Comes with a simple and easy to use command class. The only dependency is discord.js.

### requirements
- `git` command line // or any way for you to clone the repository
- `node` version 12+

### intents
- you can add intents under client options; for more information please check discord.js' docs.
- you will need intents after oct 7, 2020.

### first time set up
1. clone the repo using `git clone https://github.com/miramallows/aesthetic-djs-bot-base/` in your designated project folder through command line.
2. run `cd aesthetic-djs-bot-base` to get into the folder
3. in your files, make sure to create a `.env` file. refer to `.env.example` for example of what it should look like. all sections should be filled in.

### starting up the bot
once you've set it up the first time, each time afterwards, the steps are the same:
1. locate the directory
2. run `node .`
3. profit.

### adding commands
this bot is a simple command handler base. this means you'll have to write most functionalities or features which you want your bot to have.
you can refer to existing commands to see what options exist in the command class. all options are not required except `name` and the function you'd like it to run (if there's no function attached to a command, it'll respond `command.incomplete`.)

| option | type | example | description |
| ------ | ---- | ------- | ----------------------------------------------------------------------- |
| `name` | string | `"ping"` | the "common name" of the command. |
| `triggers` | array (optional - defaults to none) | `[ "pong", "p" ]` | the aliases of a command. | 
| `dev_only` | boolean (optional - defaults to false) | `true` | whether the command is dev only; whitelist users by id in `.env`. |
| `permissions` | array (optional - defaults to none) | `[ "MANAGE_GUILD", "MANAGE_MESSAGES" ]` | a list of permissions the user must have in the guild to run that command. |
| `bot_permissions` | array (optional - defaults to none) | `[ "KICK_MEMBERS" ]` | a list of permissions the bot must have in the guild to run that command. if not, reminds them to provide such a permission. | 
