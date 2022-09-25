import { Module } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { WorkspacesController } from './workspaces.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Channels } from 'src/entities/Channels';
import { Workspaces } from 'src/entities/Workspaces';
import { ChannelMembers } from 'src/entities/ChannelMembers';
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      Channels,
      ChannelMembers,
      Workspaces,
      WorkspaceMembers,
    ]),
  ],
  providers: [WorkspacesService],
  controllers: [WorkspacesController],
})
export class WorkspacesModule {}
