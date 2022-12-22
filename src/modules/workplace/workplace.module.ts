import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ContextModule, HttpModule } from 'mangoo-core';
import { CreateWorkplaceCommandHandler } from 'src/modules/workplace/commands/create-workplace.command';
import { InviteMemberCommandHandler } from 'src/modules/workplace/commands/invite-member.command';
import { GetWorkplaceQueryHandler } from 'src/modules/workplace/queries/get-workplace.query';
import { WorkplaceMemberRepository } from 'src/modules/workplace/workplace-member.repository';
import { WorkplaceController } from 'src/modules/workplace/workplace.controller';
import { WorkplaceRepository } from 'src/modules/workplace/workplace.repository';
import { WorkplaceService } from 'src/modules/workplace/workplace.service';

const repositories = [WorkplaceRepository, WorkplaceMemberRepository];
const commandHandlers = [CreateWorkplaceCommandHandler, InviteMemberCommandHandler];
const queryHandlers = [GetWorkplaceQueryHandler];

@Module({
  imports: [CqrsModule, ContextModule, HttpModule.register({ injectToken: true })],
  controllers: [WorkplaceController],
  providers: [...repositories, ...commandHandlers, ...queryHandlers, WorkplaceService],
})
export class WorkplaceModule {}
