import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelMembers } from 'src/entities/ChannelMembers';
import { Channels } from 'src/entities/Channels';
import { Users } from 'src/entities/Users';
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
import { Workspaces } from 'src/entities/Workspaces';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class WorkspacesService {
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
    private dataSource: DataSource,
  ) {}

  async findMyWorkSpaces(myId: number) {
    return await this.workspacesRepository.findOne({
      where: {
        WorkspaceMembers: [{ UserId: myId }],
      },
    });
  }

  async createWorkSpace(name: string, url: string, myId: number) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const workspace = new Workspaces();
      workspace.name = name;
      workspace.url = url;
      workspace.OwnerId = myId;
      const returned = await queryRunner.manager
        .getRepository(Workspaces)
        .save(workspace);

      const workspaceMember = new WorkspaceMembers();
      workspaceMember.WorkspaceId = returned.id;
      workspaceMember.UserId = myId;
      // await this.workspaceMembersRepository.save(workspaceMember);

      const channel = new Channels();
      channel.name = '일반';
      channel.WorkspaceId = returned.id;
      // const channelReturned = await this.channelsRepository.save(channel);

      const [, channelReturned] = await Promise.all([
        queryRunner.manager
          .getRepository(WorkspaceMembers)
          .save(workspaceMember),
        queryRunner.manager.getRepository(Channels).save(channel),
      ]);

      const channelMember = new ChannelMembers();
      channelMember.ChannelId = channelReturned.id;
      channelMember.UserId = myId;
      await queryRunner.manager
        .getRepository(ChannelMembers)
        .save(channelMember);

      await queryRunner.commitTransaction();

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async getWorkspaceMembers(url: string) {
    // 참고 https://typeorm.io/select-query-builder#join-without-selection
    this.usersRepository
      .createQueryBuilder('user')
      .innerJoin('user.WorkspaceMembers', 'member')
      .innerJoin('member.Workspace', 'workspace', 'workspace.url = :url', {
        url,
      })
      .getMany();
  }

  async createWorkspaceMembers(url, email) {
    const workspace = await this.workspacesRepository.findOne({
      where: { url },
      join: {
        alias: 'workspace',
        innerJoinAndSelect: {
          channels: 'workspace.Channels',
        },
      },
    });
    // 위와 같음
    // this.workspacesRepository.createQueryBuilder('workspace').innerJoinAndSelect('workspace.Channels', 'channels').getOne();

    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) return null;

    const workspaceMember = new WorkspaceMembers();
    workspaceMember.WorkspaceId = workspace.id;
    workspaceMember.UserId = user.id;
    await this.workspaceMembersRepository.save(workspaceMember);

    const channelMember = new ChannelMembers();
    channelMember.ChannelId = workspace.Channels.find(
      (v) => (v.name = '일반'),
    ).id;
    channelMember.UserId = user.id;
    await this.channelMembersRepository.save(channelMember);
    //이것도 transaction 적용해보기
  }

  async getWorkspaceMember(url, id) {
    return await this.usersRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .innerJoin('user.Workspaces', 'workspaces', 'workspaces.url = :url', {
        url,
      })
      .getOne();
  }
}
