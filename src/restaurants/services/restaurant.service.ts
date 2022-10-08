import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../repositories/prisma/prisma.service';
import { Restaurant } from '../models/restaurant.model';

const generateQuery = (searchTerm?: string) =>
  searchTerm
    ? {
        OR: [
          {
            name: {
              contains: searchTerm,
            },
          },
          {
            address: {
              contains: searchTerm,
            },
          },
          {
            phone: {
              contains: searchTerm,
            },
          },
          {
            email: {
              contains: searchTerm,
            },
          },
        ],
      }
    : {};

@Injectable()
export class RestaurantsService {
  constructor(private prismaService: PrismaService) {}
  async findMany(
    page = 0,
    pageSize = 100,
    searchTerm?: string,
  ): Promise<Restaurant[]> {
    return await this.prismaService.restaurants.findMany({
      skip: page * pageSize,
      take: pageSize,
      where: generateQuery(searchTerm),
    });
  }

  async create(restaurant: Omit<Restaurant, 'id'>) {
    return await this.prismaService.restaurants.create({ data: restaurant });
  }

  async update(id: number, restaurant: Partial<Omit<Restaurant, 'id'>>) {
    return await this.prismaService.restaurants.update({
      where: { id },
      data: restaurant,
    });
  }

  async deleteOne(id: number) {
    return await this.prismaService.restaurants.delete({ where: { id } });
  }

  async count(searchTerm?: string) {
    return this.prismaService.restaurants.count({
      where: generateQuery(searchTerm),
    });
  }
}
