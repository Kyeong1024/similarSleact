import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { CreateChannelDto } from 'src/common/dto/create-channel.dto';
import { Users } from 'src/entities/Users';
import { ChannelsService } from './channels.service';

@ApiTags('CHANNEL')
@Controller('api/workspaces')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Get(':url/channels')
  async getWorkspaceChannels(@Param('url') url: string, @User() user: Users) {
    return await this.channelsService.getWorkspaceChannels(url, user.id);
  }

  @Get(':url/channels/:name')
  async getWorkspaceChannel(
    @Param('url') url: string,
    @Param('name') name: string,
  ) {
    return await this.channelsService.getWorkspaceChannels(url, name);
  }

  @Post(':url/channels')
  async createWorkspaceChannels(
    @Param('url') url: string,
    @Body() body: CreateChannelDto,
    @User() user,
  ) {
    return await this.channelsService.createWorkspaceChannels(
      url,
      body.name,
      user.id,
    );
  }

  @Get(':url/channels/:name/members')
  async getWorkspaceChannelMembers(
    @Param('url') url: string,
    @Param('name') name: string,
  ) {
    return await this.channelsService.getWorkspaceChannelMembers(url, name);
  }

  @Post(':url/channels/:name/members')
  async createWorkspaceChannelMembers(
    @Param('url') url: string,
    @Param('name') name: string,
    @Body('email') email: string,
  ) {
    return await this.channelsService.createWorkspaceChannelMembers(
      url,
      name,
      email,
    );
  }

  @Get(':url/channels/:name/chats')
  async getWorkspaceChannelChats(
    @Param('url') url: string,
    @Param('name') name: string,
    @Query('perPage', ParseIntPipe) perPage: number,
    @Query('page', ParseIntPipe) page: number,
  ) {
    return await this.channelsService.getWorkspaceChannelChats(
      url,
      name,
      perPage,
      page,
    );
  }

  @Post(':url/channels/:name/chats')
  async createWorkspaceChannelChats(
    @Param('url') url: string,
    @Param('name') name: string,
    @Body('content') content: string,
    @User() user: Users,
  ) {
    return this.channelsService.createWorkspaceChannelChats({
      url,
      name,
      content,
      myId: user.id,
    });
  }

  @Get(':url/channels/:name/unreads')
  async getUnreads(
    @Param('url') url: string,
    @Param('name') name: string,
    @Query('after', ParseIntPipe) after: number,
  ) {
    return await this.channelsService.getChannelUnreadsCount(url, name, after);
  }
}
