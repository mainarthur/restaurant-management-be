import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from '../models/restaurant.model';
import { RestaurantsService } from '../services/restaurant.service';

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

  @Query(() => [Restaurant])
  async searchRestaurants(
    @Args('searchTerm') searchTerm: string,
    @Args('page', { type: () => Int, nullable: true }) page?: number,
    @Args('pageSize', { type: () => Int, nullable: true }) pageSize?: number,
  ) {
    return this.restaurantsService.findMany(page, pageSize, searchTerm);
  }

  @Mutation(() => Restaurant)
  async createRestaurant(
    @Args('name') name: string,
    @Args('address') address: string,
    @Args('email') email: string,
    @Args('phone') phone: string,
  ) {
    return this.restaurantsService.create({
      name,
      address,
      email,
      phone,
    });
  }
}
