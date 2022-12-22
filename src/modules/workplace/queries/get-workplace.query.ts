import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from 'mangoo-core';
import { WorkplaceRepository } from 'src/modules/workplace/workplace.repository';

export class GetWorkplaceQuery {
  createdBy: string;
}
@QueryHandler(GetWorkplaceQuery)
export class GetWorkplaceQueryHandler extends BaseQueryHandler implements IQueryHandler<GetWorkplaceQuery> {
  constructor(private wpRepo: WorkplaceRepository) {
    super();
  }
  execute(query: GetWorkplaceQuery): Promise<any> {
    const { createdBy } = query;
    return this.wpRepo.findBy({ createdBy });
  }
}
