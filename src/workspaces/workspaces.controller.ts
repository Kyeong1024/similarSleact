import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { createWorkspaceDto } from 'src/common/dto/create-workspace.dto';
import { Users } from 'src/entities/Users';
import { WorkspacesService } from './workspaces.service';

@Controller('api/workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Get()
  async getMyWorkspaces(@User() user: Users) {
    return await this.workspacesService.findMyWorkSpaces(user.id);
  }

  @Post()
  async createWorkspace(@User() user: Users, @Body() body: createWorkspaceDto) {
    return await this.workspacesService.createWorkSpace(
      body.workpace,
      body.url,
      user.id,
    );
  }

  @Get(':url/members')
  getWorkspaceMembers(@Param('url') url: string) {
    return this.workspacesService.getWorkspaceMembers(url);
  }

  @Post(':url/members')
  async createWorkspaceMembers(
    @Param('url') url: string,
    @Body('email') email: string,
  ) {
    return await this.workspacesService.createWorkspaceMembers(url, email);
  }

  @Get(':url/members/:id')
  async getWorkspaceMember(
    @Param('url') url: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.workspacesService.getWorkspaceMember(url, id);
  }
}
