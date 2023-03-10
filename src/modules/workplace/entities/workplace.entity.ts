import { Project } from 'src/modules/project/entities/project.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('workplace')
export class Workplace {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: String, length: 255 })
  name: string;
  @Column({ type: String, length: 255 })
  createdBy: string;
  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn({ nullable: true })
  updatedDate?: Date;
  @Column({ type: String, length: 1000, nullable: true })
  description?: string;

  @OneToMany((type) => Project, (t) => t.workplace, { orphanedRowAction: 'delete' })
  projects: Project[];
}
