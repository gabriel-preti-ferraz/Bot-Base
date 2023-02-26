const { TextInputStyle } = require(`discord.js`)
const { InteractionType } = require(`discord.js`)
const Discord = require(`discord.js`)
const cores = require('../../../cores.json')

module.exports = {
    name: `anuncio`,
    description: `Criar anúncio com um modal`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "chat",
            description: "Mencione um canal.",
            type: Discord.ApplicationCommandOptionType.Channel,
            required: true,
        },
    ],
    run: async(client, interaction) => {

      if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages))
        return interaction.reply({
            content: `**❌ | ${interaction.user}, Você precisa da permissão \`Gerenciar Mensagens\` para usar este comando!**`,
            ephemeral: true,
        })

        const modal = new Discord.ModalBuilder()
        .setCustomId(`Embed`)
        .setTitle(`Criar Embed`)
        const TítuloEmbed = new Discord.TextInputBuilder()
        .setCustomId(`TítuloEmbed`)
        .setLabel(`Título do Anúncio`)
        .setPlaceholder(`Insira o título do anúncio.`)
        .setStyle(TextInputStyle.Short)
        const DescriçãoEmbed = new Discord.TextInputBuilder()
        .setCustomId(`DescriçãoEmbed`)
        .setLabel(`Descrição`)
        .setPlaceholder(`Insira a descrição do Anúncio`)
        .setStyle(TextInputStyle.Paragraph)

        const PrimeiraActionRow = new Discord.ActionRowBuilder().addComponents(TítuloEmbed);
        const SegundaActionRow = new Discord.ActionRowBuilder().addComponents(DescriçãoEmbed);

        let chat = interaction.options.getChannel("chat")

        modal.addComponents(PrimeiraActionRow, SegundaActionRow)

        await interaction.showModal(modal);

        client.once(`interactionCreate`, async interaction => {
        if (!interaction.isModalSubmit()) return;

        if (interaction.customId === `Embed`) {

        const DescriçãoEmbed = interaction.fields.getTextInputValue(`DescriçãoEmbed`);
        const TítuloEmbed = interaction.fields.getTextInputValue(`TítuloEmbed`);

        let embedModal1 = new Discord.EmbedBuilder()
        .setColor(cores.Cores.Padrão)
        .setTitle(`${TítuloEmbed}`)
        .setDescription(`${DescriçãoEmbed}`)
        .setThumbnail(client.user.displayAvatarURL())
        
        
        interaction.reply({
            content: `**✅ Anúncio Submetido com sucesso.**`, ephemeral: true
        })
        
       
        chat.send({
           embeds: [embedModal1]
        }).catch( (e) => {
            interaction.reply({ content: `Algo deu errado, por favor tente novamente...`,ephemeral: true })
        })

    }

});


    }
}