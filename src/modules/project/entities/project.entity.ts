import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('project')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: String, length: 255 })
  name: string;
  @Column({ type: Number })
  workplaceId: number;
  @Column({ type: String })
  createdBy: string;
  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn({ nullable: true })
  updateDate?: Date;
  @Column({ type: String, length: 1000 })
  description?: string;
}
