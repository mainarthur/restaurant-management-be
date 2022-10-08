import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from '../models/restaurant.model.js';
import { RestaurantsService } from '../services/restaurant.service.js';

@Resolver(() => Restaurant)
export class RestaurantsResolver {
  constructor(private restaurantsService: RestaurantsService) {}

  @Query(() => [Restaurant])
  async restaurants(
    @Args('page', { type: () => Int, nullable: true }) page?: number,
    @Args('pageSize', { type: () => Int, nullable: true }) pageSize?: number,
  ) {
    return this.restaurantsService.findMany(page, pageSize);
  }
}
