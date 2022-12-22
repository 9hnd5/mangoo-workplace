import { Injectable } from '@nestjs/common';
import { Project } from 'src/modules/project/entities/project.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ProjectRepository extends Repository<Project> {
  constructor(ds: DataSource) {
    super(Project, ds.createEntityManager());
  }
}
