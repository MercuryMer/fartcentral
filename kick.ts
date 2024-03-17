import {
  CommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits,
} from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicks a user from the server.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to kick")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("The reason for the kick")
    ),
  async execute(interaction: any) {
    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason");
    if (!interaction.guild) return;
    if (!interaction.member.permissions.has(PermissionFlagsBits.KickMembers)) {
      interaction.reply("https://i.imgur.com/YhZvhXL.gif");
      return;
    }
    if (
      !interaction.guild.me.permissions.has(PermissionFlagsBits.KickMembers)
    ) {
      interaction.reply("i do not have permission to kick members");
      return;
    }
    const m = interaction.guild.members.cache.get(user.id);
    switch(true) {
      case m&& m.roles.highest.comparePositionTo(interaction.guild.me.roles.highest) >= 0:
        interaction.reply(`I can't kick ${user.tag} because their role is higher than mine.`);
      return;

      case m&& m.roles.highest.comparePositionTo(interaction.guild.me.roles.highest) >= 0:
        interaction.reply(`You cannot kick a user that is higher than your role.`);
      return;

      case m.kickable:
        m.kick(reason)
          .then(() => {
            interaction.reply(`${user.tag} has been kicked`);
          })
          .catch((error: any) => {
            interaction.reply(`there was an error trying to kick ${user.tag}`);
          });
      return;
    }
    if (m) {
      if (m.roles.highest.comparePositionTo(interaction.guild.me.roles.highest) >= 0) {
        interaction.reply(`You cannot kick a user that is higher than your role.`);
        return;
      }
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
