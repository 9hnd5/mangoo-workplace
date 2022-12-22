import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Request } from 'express';
import { Authorize } from 'src/decorators/authorize.decorator';
import { CreateWorkplaceCommand } from 'src/modules/workplace/commands/create-workplace.command';
import { InviteMemberCommand } from 'src/modules/workplace/commands/invite-member.command';
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
  @Post()
  createWorkplace(@Body() command: CreateWorkplaceCommand, @Req() request: Request) {
    command.createdBy = request.user!.id;
    return this.commandBus.execute(command);
  }

  @Authorize('admin')
  @Post(':id/members/:memberId')
  inviteMember(@Param('id') id: number, @Param('memberId') memberId: string) {
    return this.commandBus.execute(new InviteMemberCommand(id, memberId));
  }
}
