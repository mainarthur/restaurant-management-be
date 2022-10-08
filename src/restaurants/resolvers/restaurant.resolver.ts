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

  @Mutation(() => Restaurant)
  async updateRestaurant(
    @Args('id', { type: () => Int, nullable: true }) id: number,
    @Args('name', { nullable: true }) name?: string,
    @Args('address', { nullable: true }) address?: string,
    @Args('email', { nullable: true }) email?: string,
    @Args('phone', { nullable: true }) phone?: string,
  ) {
    return this.restaurantsService.update(id, { name, address, email, phone });
  }

  @Mutation(() => Restaurant)
  async deleteRestaurant(
    @Args('id', { type: () => Int, nullable: true }) id: number,
  ) {
    return this.restaurantsService.deleteOne(id);
  }
}
