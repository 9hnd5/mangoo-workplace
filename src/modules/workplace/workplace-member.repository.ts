import { Injectable } from '@nestjs/common';
import { WorkplaceMember } from 'src/modules/workplace/entities/workplace-member.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class WorkplaceMemberRepository extends Repository<WorkplaceMember> {
  constructor(ds: DataSource) {
    super(WorkplaceMember, ds.createEntityManager());
  }
}
