import { Body, Controller, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Request } from 'express';
import { Authorize } from 'src/decorators/authorize.decorator';
import { CreateWorkplaceCommand } from 'src/modules/workplace/commands/create-workplace.command';
import { InviteMemberCommand } from 'src/modules/workplace/commands/invite-member.command';
import { UpdateWorkplaceCommand } from 'src/modules/workplace/commands/update-workplace.command';
import { GetWorkplaceMemberQuery } from 'src/modules/workplace/queries/get-workplace-member.query';
import { GetWorkplaceQuery } from 'src/modules/workplace/queries/get-workplace.query';

@Controller('workplaces')
export class WorkplaceController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Authorize('admin')
  @Get()
  getWorkplaces(@Query() query: GetWorkplaceQuery) {
    return this.queryBus.execute(query);
  }

  @Authorize('admin')
  @Get(':id/members')
  getWorkplaceMembers(@Query() query: GetWorkplaceMemberQuery, @Param('id') id: number) {
    query.workplaceId = id;
    return this.queryBus.execute(query);
  }

  @Authorize('admin')
  @Post()
  createWorkplace(@Body() command: CreateWorkplaceCommand, @Req() request: Request) {
    command.createdBy = request.user!.id;
    return this.commandBus.execute(command);
  }

  @Authorize('admin')
  @Put(':id')
  updateWorkplace(@Body() command: UpdateWorkplaceCommand, @Param('id') id: number) {
    command.id = id;
    return this.commandBus.execute(command);
  }

  @Authorize('admin')
  @Post(':id/members/:memberId')
  inviteMember(@Param('id') id: number, @Param('memberId') memberId: string) {
    return this.commandBus.execute(new InviteMemberCommand(id, memberId));
  }
}
