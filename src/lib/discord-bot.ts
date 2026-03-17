import {
  Client,
  GatewayIntentBits,
  ChannelType,
  PermissionFlagsBits,
  TextChannel,
} from "discord.js";

let client: Client | null = null;

async function getDiscordClient(): Promise<Client> {
  if (client?.isReady()) return client;

  client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.DirectMessages,
    ],
  });

  await client.login(process.env.DISCORD_BOT_TOKEN);
  return client;
}

// 디스코드 DM 전송
export async function sendDiscordDM(
  discordId: string,
  content: string,
) {
  try {
    const bot = await getDiscordClient();
    const user = await bot.users.fetch(discordId);
    await user.send({ content });
    return true;
  } catch (error) {
    console.error("Discord DM 전송 실패:", error);
    return false;
  }
}

// 파티 전용 디스코드 채널 생성
export async function createPartyChannel(
  partyTitle: string,
  memberDiscordIds: string[],
) {
  try {
    const bot = await getDiscordClient();
    const guildId = process.env.DISCORD_GUILD_ID!;
    const guild = await bot.guilds.fetch(guildId);

    // 채널 생성 (멤버만 접근 가능)
    const channel = await guild.channels.create({
      name: `파티-${partyTitle.slice(0, 20)}`,
      type: ChannelType.GuildText,
      permissionOverwrites: [
        {
          id: guild.id, // @everyone
          deny: [PermissionFlagsBits.ViewChannel],
        },
        ...memberDiscordIds.map((id) => ({
          id,
          allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
          ],
        })),
      ],
    });

    return channel.id;
  } catch (error) {
    console.error("디스코드 채널 생성 실패:", error);
    return null;
  }
}

// 파티 디스코드 채널 삭제
export async function deletePartyChannel(channelId: string) {
  try {
    const bot = await getDiscordClient();
    const channel = await bot.channels.fetch(channelId);
    if (channel) await channel.delete();
    return true;
  } catch (error) {
    console.error("디스코드 채널 삭제 실패:", error);
    return false;
  }
}

// 디스코드 채널에 멘션 메시지 전송
export async function sendChannelMention(
  channelId: string,
  discordId: string,
  content: string,
) {
  try {
    const bot = await getDiscordClient();
    const channel = await bot.channels.fetch(channelId);
    if (channel && channel instanceof TextChannel) {
      await channel.send({ content: `<@${discordId}> ${content}` });
      return true;
    }
    return false;
  } catch (error) {
    console.error("디스코드 멘션 전송 실패:", error);
    return false;
  }
}
