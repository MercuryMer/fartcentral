import 'fs';
import 'path';
import { config } from "./config";
import { Client, Collection, Events, GatewayIntentBits, EmbedBuilder, PermissionsBitField, ColorResolvable } from 'discord.js';

import { colorize } from './modules/colorize';
import { RGBToHex, HexToRGB } from './modules/hexer';

import { commands } from './commands';
import { deployCommands } from './deploy-commands';
import { deployCommandsNow } from './deploy-commands-now';

const prefix = '.s'

const client = new Client({
    intents: GatewayIntentBits.Guilds | GatewayIntentBits.GuildMessages | GatewayIntentBits.GuildMessages | GatewayIntentBits.MessageContent
});


client.on('ready', (c) => {
    console.log(`Logged in as ${c.user.username}!`);
});

client.on("guildCreate", async (guild) => {
  await deployCommands({ guildId: guild.id });
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }
  const { commandName } = interaction;
  if (commands[commandName as keyof typeof commands]) {
    try {
      await commands[commandName as keyof typeof commands].execute(interaction);
    } catch (error) {
      console.log(error)
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } finally {
        console.log(
        colorize.bgGreen(
        `[${interaction.guild?.name}]: ${interaction.user.tag} ran:${commandName}`))
    }
  }
});

const owner = '446603589994151937'

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (message.author.id !== owner) {
        message.react('❌');
        return;
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift()?.toLowerCase();
    if (command === 'cmd-restart') {
        await deployCommandsNow();
        message.react('✅');
    } else if (command === 'stupid') {
        const user = message.mentions.users.first();
        const lastMessage = message.channel.messages.cache.filter(m => m.author.id === user?.id).last();
        if (!user) {
            message.delete();
            return;
        }
        lastMessage?.reply('https://tenor.com/view/could-you-repeat-that-goku-goku-ultra-instinct-goku-stare-repeat-that-gif-24821033');
    }
});

// login and if error return
client.login(config.DISCORD_TOKEN).catch((e) => {
    console.error(e);
    process.exit(1);
});
