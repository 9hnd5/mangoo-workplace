import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Request } from 'express';
import { Authorize } from 'src/decorators/authorize.decorator';
import { CreateProjectCommand } from 'src/modules/project/commands/create-project.command';

@Controller()
export class ProjectController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Authorize('admin')
  @Get()
  getProject() {}
  @Authorize('admin')
  @Post()
  createProject(@Body() command: CreateProjectCommand, @Req() request: Request) {
    command.createdBy = request.user!.id;
    return this.commandBus.execute(command);
  }
}
