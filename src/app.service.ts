import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HEADER_KEY } from 'src/const/header.const';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  async auth(token: string, role?: string) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post(
          'http://localhost:3002/users/check',
          { role: role },
          {
            headers: {
              [HEADER_KEY.AUTHORIZATION]: token,
            },
          },
        ),
      );
      return data;
    } catch (err) {
      throw err;
    }
  }
}
