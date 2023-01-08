import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetWorkplaceMemberDTO {
  @Expose()
  _id: string;
  @Expose()
  firstName: string;
  @Expose()
  lastName: string;
  @Expose()
  workplaceId: number;
}
