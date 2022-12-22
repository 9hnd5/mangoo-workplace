import { CommandHandler, IQueryHandler } from '@nestjs/cqrs';
import { ProjectRepository } from 'src/modules/project/project.repository';

export class GetProjectsQuery {}
@CommandHandler(GetProjectsQuery)
export class GetProjectsQueryHandler implements IQueryHandler<GetProjectsQuery> {
  constructor(private repo: ProjectRepository) {}
  execute(query: GetProjectsQuery): Promise<any> {
    return this.repo.find();
  }
}
