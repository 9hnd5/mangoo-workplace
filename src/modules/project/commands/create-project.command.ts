import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { BaseCommandHandler } from 'mangoo-core';
import { ProjectRepository } from 'src/modules/project/project.repository';
import { WorkplaceRepository } from 'src/modules/workplace/workplace.repository';

export class CreateProjectCommand {
  @IsNotEmpty()
  name: string;
  @IsNumber()
  workplaceId: number;
  @IsOptional()
  @IsNotEmpty()
  description?: string;
}
@CommandHandler(CreateProjectCommand)
export class CreateProjectCommandHandler
  extends BaseCommandHandler
  implements ICommandHandler<CreateProjectCommand, number>
{
  constructor(private repo: ProjectRepository, private wpRepository: WorkplaceRepository) {
    super();
  }
  async execute(command: CreateProjectCommand): Promise<number> {
    const createdBy = this.request.user!.id;
    const { name, workplaceId, description } = command;

    const workplace = await this.wpRepository.findOneBy({ id: workplaceId });
    if (!workplace) throw new BadRequestException();

    const project = this.repo.create({ name, workplaceId, createdBy, description });
    await this.repo.save(project);

    return project.id;
  }
}
