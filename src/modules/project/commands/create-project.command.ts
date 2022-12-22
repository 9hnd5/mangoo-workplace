import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProjectRepository } from 'src/modules/project/project.repository';

export class CreateProjectCommand {
  name: string;
  workplaceId: number;
  createdBy: string;
  description?: string;
}
@CommandHandler(CreateProjectCommand)
export class CreateProjectCommandHandler implements ICommandHandler<CreateProjectCommand> {
  constructor(private repo: ProjectRepository) {}
  execute(command: CreateProjectCommand): Promise<any> {
    const { name, workplaceId, createdBy, description } = command;
    const project = this.repo.create({ name, workplaceId, createdBy, description });
    return this.repo.save(project);
  }
}
