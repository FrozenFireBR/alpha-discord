const Discord = require('discord.js')
const AlphaError = require('../errors/create.js')

module.exports = class Client extends Discord.Client {
  constructor (options) {
    super({
      intents: options.intents,
      partials: ['USER', 'CHANNEL', 'MESSAGE', 'GUILD_MEMBER', 'REACTION']
    })

    if (!options) throw new AlphaError('The value token must not be empty', { method: 'new Client', status: 405 })
    if (!options.token) throw new AlphaError('The value token must not be empty', { method: 'new Client', status: 405 })
    if (!options.prefix) throw new AlphaError('The value prefix must not be empty', { method: 'new Client', status: 405 })

    this.token = options.token
    this.prefix = options.prefix

    super.login(this.token)
    require('./React.js')
    require('./Emojis.js')
    require('./Collector.js')
  }

  createThread ({
    message,
    name,
    duration = 1440
  }) {
    if (!message) throw new AlphaError('No message was provided', { method: 'createThread', status: 404 })
    if (!name) throw new AlphaError('No name was provided', { method: 'createThread', status: 404 })

    this.api.channels(message.channel.id).messages(message.id).threads.post({
      data: {
        name: name,
        auto_archive_duration: duration,
        type: 'GUILD_TEXT'
      }
    })
  }
}
