import { Injectable } from '@nestjs/common';
import { Restaurant } from '../models/restaurant.model.js';

@Injectable()
export class RestaurantsService {
  findMany(page?: number, pageSize?: number): Restaurant[] {
    return [
      { id: 1, name: 'test', address: 'here', phone: '123', email: '1233' },
    ];
  }
}
