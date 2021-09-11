const {
  Message,
  Util
} = require('discord.js')
const AlphaError = require('../errors/create.js')

Message.prototype.react = async function (emoji) {
  if (Array.isArray(emoji)) {
    return emoji.forEach(async e => {
      if (emoji.includes(e)) throw new AlphaError('The array of items to react can not contain equal emojis', { method: 'react', status: 402 })
      e = this.client.emojis.resolveIdentifier(e)
      await this.client.api
        .channels(this.channel.id)
        .messages(this.id)
        .reactions(e, '@me')
        .put()
      return this.client.actions.MessageReactionAdd.handle({
        user: this.client.user,
        channel: this.channel,
        message: this,
        emoji: Util.parseEmoji(e)
      }).reaction
    })
  } else {
    emoji = this.client.emojis.resolveIdentifier(emoji)
    await this.client.api
      .channels(this.channel.id)
      .messages(this.id)
      .reactions(emoji, '@me')
      .put()
    return this.client.actions.MessageReactionAdd.handle({
      user: this.client.user,
      channel: this.channel,
      message: this,
      emoji: Util.parseEmoji(emoji)
    }).reaction
  }
}
