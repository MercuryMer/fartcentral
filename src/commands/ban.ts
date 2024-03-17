import {
  CommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits,
} from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("bans a user from the server.")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to ban").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("The reason for the ban")
    ),
  async execute(interaction: any) {
    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason");
    if (!interaction.guild) return;
    if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) {
      interaction.reply("https://i.imgur.com/YhZvhXL.gif");
      return;
    }
    if (!interaction.guild.me.permissions.has(PermissionFlagsBits.BanMembers)) {
      interaction.reply("i do not have permission to ban members");
      return;
    }
    const m = interaction.guild.members.cache.get(user.id);
    if (m) {
      m.ban({ reason: reason })
        .then(() => {
          interaction.reply(`${user.tag} has been banned`);
        })
        .catch((error: any) => {
          interaction.reply(`there was an error trying to ban ${user.tag}`);
        });
    } else {
      interaction.reply(
        `why are you tryna ban someone who isn't in the server? **('i cant ban someone who isnt in the server')**`
      );
    }
  },
};

export function execute(
  interaction:
    | import("discord.js").ChatInputCommandInteraction<
        import("discord.js").CacheType
      >
    | import("discord.js").MessageContextMenuCommandInteraction<
        import("discord.js").CacheType
      >
    | import("discord.js").UserContextMenuCommandInteraction<
        import("discord.js").CacheType
      >
) {
  throw new Error(`Function not implemented. in ${__filename}`);
}
