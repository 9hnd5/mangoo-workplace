import { Injectable } from '@nestjs/common';
import { Workplace } from 'src/modules/workplace/entities/workplace.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class WorkplaceRepository extends Repository<Workplace> {
  constructor(ds: DataSource) {
    super(Workplace, ds.createEntityManager());
  }
}
