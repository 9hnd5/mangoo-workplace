import { Injectable } from '@nestjs/common';
import { HttpService } from 'mangoo-core';

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender?: string;
  role?: {
    id: number;
    name: string;
  };
};

@Injectable()
export class WorkplaceService {
  constructor(private httpService: HttpService) {}

  async getMember(id: string) {
    try {
      const { data } = await this.httpService.get<User>(`http://localhost:3002/users/${id}`);
      return data;
    } catch (err) {
      console.error('err', err);
    }
  }

  async getMembers(ids: string[], email?: string) {
    let url = 'http://localhost:3002/users?';

    try {
      if (ids.length) url += `ids=${ids.join()}`;
      if (email) url += `&${email}`;

      const { data } = await this.httpService.get<User[]>(url);

      return data;
    } catch (err) {
      throw err;
    }
  }
}
