import {
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
    if (m) {
      m.kick(reason)
        .then(() => {
          interaction.reply(`${user.tag} has been kicked`);
        })
        .catch(() => {
          interaction.reply(`there was an error trying to kick ${user.tag}`);
        });
    } else {
      interaction.reply(
        `why are you tryna kick someone who isn't in the server?`
      );
    }
  },
};

export function execute() {
  throw new Error(`Function not implemented. in ${__filename}`);
}
