const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageActionRow} = require('discord.js')
const cores = require('../../../cores.json')

module.exports = {

name: 'ajuda',
description: 'Exibe meu painel de ajuda.',
type: ApplicationCommandType.ChatInput,

run: async (client, interaction, args) => {

    let embed = new EmbedBuilder()
    .setThumbnail(client.user.displayAvatarURL())
    .setTitle(`Ajuda do ${client.user.username}`)
    .setDescription(`Olá, sou um bot de Slash Commands, então meu prefixo é \`/\`
    
    👑 | **Comandos da Gerência:**
    \`anuncio\` \`lock\` \`unlock\` \`clear\`
    
    🛡️ | **Comandos de Moderação:**
    \`punir\` \`despunir\`

    📌 | **Comandos Úteis:**
    \`userinfo\` \`ajuda\` \`ping\` \`serverinfo\`
    
`)
    .setColor(cores.Cores.Padrão)

interaction.reply({ embeds: [embed]})
}
}