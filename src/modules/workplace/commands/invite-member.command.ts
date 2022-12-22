import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from 'mangoo-core';
import { WorkplaceMemberRepository } from 'src/modules/workplace/workplace-member.repository';
import { WorkplaceRepository } from 'src/modules/workplace/workplace.repository';
import { WorkplaceService } from 'src/modules/workplace/workplace.service';

export class InviteMemberCommand {
  constructor(public workplaceId: number, public memberId: string) {}
}

@CommandHandler(InviteMemberCommand)
export class InviteMemberCommandHandler extends BaseCommandHandler implements ICommandHandler<InviteMemberCommand> {
  constructor(
    private wpRepo: WorkplaceRepository,
    private wpMember: WorkplaceMemberRepository,
    private wpService: WorkplaceService,
  ) {
    super();
  }
  async execute(command: InviteMemberCommand): Promise<any> {
    const { workplaceId, memberId } = command;
    const wp = await this.wpRepo.findOneBy({ id: workplaceId });
    const wpMember = await this.wpService.getMember(memberId);
    if (!wp || !wpMember) return new NotFoundException();
    const member = this.wpMember.create({ memberId, workplaceId });
    return this.wpMember.save(member);
  }
}
