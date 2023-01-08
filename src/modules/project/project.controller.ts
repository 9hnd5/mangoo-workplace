import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Authorize } from 'src/decorators/authorize.decorator';
import { CreateProjectCommand } from 'src/modules/project/commands/create-project.command';
import { GetProjectQuery } from 'src/modules/project/queries/get-project.query';
import { GetProjectsQuery } from 'src/modules/project/queries/get-projects.query';

@Controller('projects')
export class ProjectController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Authorize('admin')
  @Get()
  getProjects(@Query() query: GetProjectsQuery) {
    return this.queryBus.execute(query);
  }

  @Authorize('admin')
  @Get(':id')
  getProject(@Param('id') id: number) {
    return this.queryBus.execute(new GetProjectQuery(id));
  }

  @Authorize('admin')
  @Post()
  createProject(@Body() command: CreateProjectCommand) {
    return this.commandBus.execute(command);
  }
}
