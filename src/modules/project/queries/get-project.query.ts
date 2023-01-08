import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ProjectRepository } from 'src/modules/project/project.repository';
import { GetProjectDTO } from '../dtos/get-project.dto';

export class GetProjectQuery {
  constructor(public id: number) {}
}
@QueryHandler(GetProjectQuery)
export class GetProjectQueryHandler implements IQueryHandler<GetProjectQuery, GetProjectDTO> {
  constructor(private projectRepository: ProjectRepository) {}
  async execute(query: GetProjectQuery): Promise<GetProjectDTO> {
    const { id } = query;
    const project = await this.projectRepository.findOneBy({ id });
    if (!project) throw new NotFoundException('Project not found');
    const result = plainToInstance(GetProjectDTO, project, { excludeExtraneousValues: true });
    return result;
  }
}
