import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { BaseQueryHandler } from 'mangoo-core';
import { GetWorkplaceMemberDTO } from 'src/modules/workplace/dtos/get-workplace-member.dto';
import { WorkplaceMemberRepository } from 'src/modules/workplace/workplace-member.repository';
import { WorkplaceService } from 'src/modules/workplace/workplace.service';

export class GetWorkplaceMemberQuery {
  @IsOptional()
  @IsString()
  email?: string;

  workplaceId: number;
}

@QueryHandler(GetWorkplaceMemberQuery)
export class GetWorkplaceMemberQueryHandler
  extends BaseQueryHandler
  implements IQueryHandler<GetWorkplaceMemberQuery, GetWorkplaceMemberDTO[]>
{
  constructor(private wpMemberRepo: WorkplaceMemberRepository, private wpService: WorkplaceService) {
    super();
  }
  async execute(query: GetWorkplaceMemberQuery): Promise<GetWorkplaceMemberDTO[]> {
    const { email, workplaceId } = query;
    const wpMembers = await this.wpMemberRepo.findBy({ workplaceId });

    if (!wpMembers.length) return [];

    const members = await this.wpService.getMembers(
      wpMembers.map((x) => x.memberId),
      email,
    );
    if (!members) return [];

    const result = plainToInstance(GetWorkplaceMemberDTO, members, { excludeExtraneousValues: true });

    return result.map((x) => ({ ...x, workplaceId }));
  }
}
