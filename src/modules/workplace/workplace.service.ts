import { Injectable } from '@nestjs/common';
import { HttpService } from 'mangoo-core';

@Injectable()
export class WorkplaceService {
  constructor(private httpService: HttpService) {}

  async getMember(id: string) {
    try {
      const { data } = await this.httpService.get(`http://localhost:3002/users/${id}`);
      return data;
    } catch (err) {
      console.error('err', err);
    }
  }
}
