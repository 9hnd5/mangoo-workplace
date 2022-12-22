import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('section')
export default class Section {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: String })
  name: string;
}
