import { Module } from '@nestjs/common';
import { PrismaModule } from '../repositories/prisma/prisma.module.js';
import { RestaurantsResolver } from './resolvers/restaurant.resolver';
import { RestaurantsService } from './services/restaurant.service';

@Module({
  imports: [PrismaModule],
  providers: [RestaurantsService, RestaurantsResolver],
})
export class RestaurantsModule {}
