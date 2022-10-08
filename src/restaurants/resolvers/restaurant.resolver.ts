import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PaginatedRestaurants, Restaurant } from '../models/restaurant.model';
import { RestaurantsService } from '../services/restaurant.service';

@Resolver(() => Restaurant)
export class RestaurantsResolver {
  constructor(private restaurantsService: RestaurantsService) {}

  @Query(() => PaginatedRestaurants)
  async restaurants(
    @Args('page', { type: () => Int, nullable: true }) page?: number,
    @Args('pageSize', { type: () => Int, nullable: true }) pageSize?: number,
  ): Promise<PaginatedRestaurants> {
    return {
      result: await this.restaurantsService.findMany(page, pageSize),
      total: await this.restaurantsService.count(),
    };
  }

  @Query(() => PaginatedRestaurants)
  async searchRestaurants(
    @Args('searchTerm') searchTerm: string,
    @Args('page', { type: () => Int, nullable: true }) page?: number,
    @Args('pageSize', { type: () => Int, nullable: true }) pageSize?: number,
  ): Promise<PaginatedRestaurants> {
    return {
      result: await this.restaurantsService.findMany(
        page,
        pageSize,
        searchTerm,
      ),
      total: await this.restaurantsService.count(searchTerm),
    };
  }

  @Mutation(() => Restaurant)
  async createRestaurant(
    @Args('name') name: string,
    @Args('address') address: string,
    @Args('email') email: string,
    @Args('phone') phone: string,
  ): Promise<Restaurant> {
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
  ): Promise<Restaurant> {
    return this.restaurantsService.update(id, { name, address, email, phone });
  }

  @Mutation(() => Restaurant)
  async deleteRestaurant(
    @Args('id', { type: () => Int, nullable: true }) id: number,
  ): Promise<Restaurant> {
    return this.restaurantsService.deleteOne(id);
  }
}
