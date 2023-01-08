import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetProjectsDTO } from 'src/modules/project/dtos/get-projects.dto';
import { ProjectRepository } from 'src/modules/project/project.repository';

export class GetProjectsQuery {}

@QueryHandler(GetProjectsQuery)
export class GetProjectsQueryHandler implements IQueryHandler<GetProjectsQuery, GetProjectsDTO[]> {
  constructor(private repo: ProjectRepository) {}
  async execute(query: GetProjectsQuery): Promise<GetProjectsDTO[]> {
    const {} = query;
    const projects = await this.repo.find();    
    const result = plainToInstance(GetProjectsDTO, projects, { excludeExtraneousValues: true });
    return result;
  }
}
