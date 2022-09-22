import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CHANNEL')
@Controller('api/workspaces')
export class ChannelsController {
  @Get(':url/channels')
  getWorkspaceChannels() {
    console.log('getChannel');
  }

  @Get(':url/channels/:name')
  getWorkspaceChannel() {}

  @Post(':url/channels')
  createWorkspaceChannels() {}

  @Get(':url/channels/:name/members')
  getWorkspaceChannelMembers() {}

  @Post(':url/channels/:name/members')
  createWorkspaceMembers() {}

  @Get(':url/channels/:name/chats')
  getWorkspaceChannelChats() {}

  @Post(':url/channels/:name/chats')
  createWorkspaceChannelChats() {}
}
