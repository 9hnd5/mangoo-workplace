import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateProjectCommandHandler } from 'src/modules/project/commands/create-project.command';
import { ProjectController } from 'src/modules/project/project.controller';
import { ProjectRepository } from 'src/modules/project/project.repository';
import { GetProjectsQueryHandler } from 'src/modules/project/queries/get-projects.query';

@Module({
  imports: [CqrsModule],
  controllers: [ProjectController],
  providers: [ProjectRepository, CreateProjectCommandHandler, GetProjectsQueryHandler],
})
export class ProjectModule {}
