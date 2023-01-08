import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetProjectDTO {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  description?: string;
}
