import { Controller, Get, Post } from '@nestjs/common';

@Controller('api/workspaces')
export class WorkspacesController {
  @Get()
  getMyWorkspaces() {}

  @Post()
  createWorkspace() {}

  @Get(':url/members')
  getWorkspaceMembers() {}

  @Post(':url/members')
  createWorkspaceMembers() {}

  @Get(':url/members/:id')
  getWorkspaceMember() {}
}
