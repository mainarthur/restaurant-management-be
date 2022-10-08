import { Module } from '@nestjs/common';
import { RestaurantsResolver } from './resolvers/restaurant.resolver.js';
import { RestaurantsService } from './services/restaurant.service.js';

@Module({
  providers: [RestaurantsService, RestaurantsResolver],
})
export class RestaurantsModule {}
