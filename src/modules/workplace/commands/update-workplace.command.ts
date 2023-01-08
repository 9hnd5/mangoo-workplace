import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from 'mangoo-core';
import { WorkplaceRepository } from 'src/modules/workplace/workplace.repository';

export class UpdateWorkplaceCommand {
  id: number;
  name: string;
  description?: string;
}
@CommandHandler(UpdateWorkplaceCommand)
export class UpdateWorkplaceCommandHanlder
  extends BaseCommandHandler
  implements ICommandHandler<UpdateWorkplaceCommand, number>
{
  constructor(private wpRepo: WorkplaceRepository) {
    super();
  }
  async execute(command: UpdateWorkplaceCommand): Promise<number> {
    const { id, name, description } = command;
    const workplace = await this.wpRepo.findOneBy({ id });
    if (!workplace) throw new NotFoundException('Workplace not found');
    workplace.name = name;
    workplace.description = description;
    await this.wpRepo.save(workplace);
    return id;
  }
}
