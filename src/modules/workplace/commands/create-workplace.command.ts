import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from 'mangoo-core';
import { WorkplaceRepository } from 'src/modules/workplace/workplace.repository';

export class CreateWorkplaceCommand {
  name: string;
  createdBy: string;
  description?: string;
}

@CommandHandler(CreateWorkplaceCommand)
export class CreateWorkplaceCommandHandler implements ICommandHandler<CreateWorkplaceCommand> {
  constructor(private wpRepo: WorkplaceRepository) {
  }
  async execute(command: CreateWorkplaceCommand): Promise<any> {
    const { name, description } = command;
    const wp = this.wpRepo.create({ name, description, createdBy: '639efac909991175ab3dd193' });
    return this.wpRepo.save(wp);
  }
}
