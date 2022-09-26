import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelChats } from 'src/entities/ChannelChats';
import { ChannelMembers } from 'src/entities/ChannelMembers';
import { Channels } from 'src/entities/Channels';
import { Users } from 'src/entities/Users';
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
import { Workspaces } from 'src/entities/Workspaces';
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

    if (!channel) throw new NotFoundException('채널이 없습니다.');

    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .innerJoin('user.Workspaces', 'workspace', 'workspace.url = :url', {
        url,
      })
      .getOne();

    if (!user) throw new NotFoundException('사용자가 없습니다.');

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

  async getChannelUnreadsCount(url, name, after) {
    const channel = await this.channelsRepository
      .createQueryBuilder('channel')
      .innerJoin('channel.Workspace', 'workspace', 'workspace.url = :url', {
        url,
      })
      .where('channel.name = :name', { name })
      .getOne();

    return await this.channelChatsRepository.count({
      // query builder로 만들어보기
      where: {
        ChannelId: channel.id,
        createdAt: MoreThan(new Date(after)),
      },
    });

    // 맞는지 테스트 해보기
    // await this.channelChatsRepository
    //   .createQueryBuilder('channelChats')
    //   .select('COUNT(*)')
    //   .where('channelChat.id = :id', { id: channel.id })
    //   .where('DATE(:after) < channelChat.createdAt', { after });
  }
}
