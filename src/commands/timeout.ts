import {
  CommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits,
} from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("times user out")
    .addUserOption((option) =>
      option.setName("user").setDescription("the user to timeout").setRequired(true)
    )
    .addIntegerOption((option) =>
      option.setName("time").setDescription("the time to timeout the user").setRequired(true)
    )

    .addStringOption((option) =>
      option.setName("reason").setDescription("the reason for the timeout")
    ),
  async execute(interaction: any) {
    const user = interaction.options.getUser("user");
    const time = interaction.options.getInteger("time");
    const reason = interaction.options.getString("reason");

    if (!interaction.guild) return;
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageRoles)) {
      interaction.reply("https://i.imgur.com/YhZvhXL.gif");
      return;
    }
    if (
      !interaction.guild.me.permissions.has(PermissionFlagsBits.ManageRoles)
    ) {
      interaction.reply("i do not have permission to timeout members");
      return;
    }
    const m = interaction.guild.members.cache.get(user.id);
    
    if (m) {
      m.roles.add("time out role id")
        .then(() => {
          interaction.reply(`${user.tag} has been timed out for ${time} minutes`);
          setTimeout(() => {
            m.roles.remove("time out role id")
          }, time * 60000);
        })
        .catch((error: any) => {
          interaction.reply(`there was an error trying to timeout ${user.tag}`);
        });
    } else {
      interaction.reply(
        `why are you tryna timeout someone who isn't in the server?`
      );
    }
  }
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
