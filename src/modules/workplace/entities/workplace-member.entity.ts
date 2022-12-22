import { Entity, PrimaryColumn } from 'typeorm';

@Entity('workplace-member')
export class WorkplaceMember {
  @PrimaryColumn()
  workplaceId: number;
  @PrimaryColumn()
  memberId: string;
}
