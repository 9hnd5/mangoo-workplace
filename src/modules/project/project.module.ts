import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateProjectCommandHandler } from 'src/modules/project/commands/create-project.command';
import { ProjectController } from 'src/modules/project/project.controller';
import { ProjectRepository } from 'src/modules/project/project.repository';
import { GetProjectQueryHandler } from 'src/modules/project/queries/get-project.query';
import { GetProjectsQueryHandler } from 'src/modules/project/queries/get-projects.query';
import { WorkplaceRepository } from 'src/modules/workplace/workplace.repository';

const repositories = [ProjectRepository, WorkplaceRepository];
const commandHandlers = [CreateProjectCommandHandler];
const queryHandlers = [GetProjectsQueryHandler, GetProjectQueryHandler];

@Module({
  imports: [CqrsModule],
  controllers: [ProjectController],
  providers: [...repositories, ...commandHandlers, ...queryHandlers],
})
export class ProjectModule {}
