import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelChats } from 'src/entities/ChannelChats';
import { ChannelMembers } from 'src/entities/ChannelMembers';
import { Channels } from 'src/entities/Channels';
import { Users } from 'src/entities/Users';
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
import { Workspaces } from 'src/entities/Workspaces';
import { EventsGateway } from 'src/events/events.gateway';
import { DataSource, MoreThan, Repository } from 'typeorm';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(Workspaces)
    private workspacesRepository: Repository<Workspaces>,
    @InjectRepository(WorkspaceMembers)
    private workspaceMembersRepository: Repository<WorkspaceMembers>,
    @InjectRepository(Channels)
    private channelsRepository: Repository<Channels>,
    @InjectRepository(ChannelMembers)
    private channelMembersRepository: Repository<ChannelMembers>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(ChannelChats)
    private channelChatsRepository: Repository<ChannelChats>,
    private dataSource: DataSource,
    private readonly eventGateway: EventsGateway,
  ) {}

  async getWorkspaceChannels(url, myId) {
    return this.channelsRepository
      .createQueryBuilder('channels')
      .innerJoinAndSelect(
        'channels.ChannelMembers',
        'channelMembers',
        'channelMembers.userId = :myId',
        { myId },
      )
      .innerJoinAndSelect(
        'channels.Workspace',
        'workspace',
        'workspace.url = :url',
        { url },
      )
      .getMany();
  }

  async getWorkspaceChannel(url, name) {
    return this.channelsRepository
      .createQueryBuilder('channel')
      .innerJoin('channel.Workspace', 'workspace', 'workspace.url = :url', {
        url,
      })
      .where('channel.name = :name', { name })
      .getOne();
  }

  async createWorkspaceChannels(url, name, myId) {
    const workspace = await this.workspacesRepository.findOne({
      where: { url },
    });

    const channel = new Channels();
    channel.WorkspaceId = workspace.id;
    channel.name = name;
    const channelReturned = await this.channelsRepository.save(channel);

    const channelMember = new ChannelMembers();
    channelMember.ChannelId = channelReturned.id;
    channelMember.UserId = myId;
    await this.channelMembersRepository.save(channelMember);
  }

  async getWorkspaceChannelMembers(url, name) {
    return await this.usersRepository
      .createQueryBuilder('user')
      .innerJoin('user.Channels', 'channels', 'channels.name = :name', {
        name,
      })
      .innerJoin('channels.Workspace', 'workspace', 'workspace.url = :url', {
        url,
      })
      .getMany();
  }

  async createWorkspaceChannelMembers(url, name, email) {
    const channel = await this.channelsRepository
      .createQueryBuilder('channel')
      .innerJoin('channel.Workspace', 'workspace', 'workspace.url = :url', {
        url,
      })
      .where('channel.name = :name', { name })
      .getOne();

    if (!channel) throw new NotFoundException('????????? ????????????.');

    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .innerJoin('user.Workspaces', 'workspace', 'workspace.url = :url', {
        url,
      })
      .getOne();

    if (!user) throw new NotFoundException('???????????? ????????????.');

    const channelMember = new ChannelMembers();
    channelMember.ChannelId = channel.id;
    channelMember.UserId = user.id;
    await this.channelMembersRepository.save(channelMember);
  }

  async getWorkspaceChannelChats(url, name, perPage, page) {
    return await this.channelChatsRepository
      .createQueryBuilder('channelChats')
      .innerJoin('channelChats.Channels', 'channel', 'channel.name = :name', {
        name,
      })
      .innerJoin('channel.Workspace', 'workspace', 'workspace.url = :url', {
        url,
      })
      .innerJoinAndSelect('channelChats.user', 'user')
      .orderBy('channelChats.createdAt', 'DESC')
      .take(perPage)
      .skip((page - 1) * perPage)
      .getMany();
  }

  async createWorkspaceChannelChats({ url, name, content, myId }) {
    const channel = await this.channelsRepository
      .createQueryBuilder('channel')
      .innerJoin('channel.Workspace', 'workspace', 'workspace.url = :url', {
        url,
      })
      .where('channel.name = :name', { name })
      .getOne();

    const chats = new ChannelChats();
    chats.content = content;
    chats.UserId = myId;
    chats.ChannelId = channel.id;
    const savedChat = await this.channelChatsRepository.save(chats);
    // ?????? findone??? ??????.
    // savedChat.User = user; -> ?????? myId ?????? user??? ???????????????.
    // savedChat.Channel = channel;

    const chatWithUser = await this.channelChatsRepository.findOne({
      where: { id: savedChat.id },
      relations: ['User', 'Channel'],
    });

    this.eventGateway.server
      .to(`/ws-${url}-${channel.id}`)
      .emit('message', chatWithUser);
  }

  async createWorkspaceChannelImages({ url, name, myId, files }) {
    const channel = await this.channelChatsRepository
      .createQueryBuilder('channel')
      .innerJoin('channel.Workspace', 'workspace', 'workspace.url = :url', {
        url,
      })
      .where('channel.name = :name', { name })
      .getOne();

    for (const file of files) {
      const chat = new ChannelChats();
      chat.ChannelId = channel.id;
      chat.content = file.path;
      chat.UserId = myId;

      const savedChat = await this.channelChatsRepository.save(chat);
      const chatWithUser = await this.channelChatsRepository.findOne({
        where: { id: savedChat.id },
        relations: ['User', 'Channel'],
      });

      this.eventGateway.server
        .to(`/ws-${url}-${chatWithUser.ChannelId}`)
        .emit('message', chatWithUser);
    }
  }

  async getChannelUnreadsCount(url, name, after) {
    const channel = await this.channelsRepository
      .createQueryBuilder('channel')
      .innerJoin('channel.Workspace', 'workspace', 'workspace.url = :url', {
        url,
      })
      .where('channel.name = :name', { name })
      .getOne();

    return await this.channelChatsRepository.count({
      // query builder??? ???????????????
      where: {
        ChannelId: channel.id,
        createdAt: MoreThan(new Date(after)),
      },
    });

    // ????????? ????????? ?????????
    // await this.channelChatsRepository
    //   .createQueryBuilder('channelChats')
    //   .select('COUNT(*)')
    //   .where('channelChat.id = :id', { id: channel.id })
    //   .where('DATE(:after) < channelChat.createdAt', { after });
  }
}
