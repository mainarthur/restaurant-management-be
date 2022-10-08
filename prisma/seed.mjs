import { PrismaClient } from '@prisma/client';
import Chance from 'chance';
const client = new PrismaClient();
const chance = new Chance();
const restaurantsNumber = await client.restaurants.count();

if (restaurantsNumber < 100) {
    await client.restaurants.createMany({
        data: Array(100)
            .fill(null)
            .map(() => ({
                name: chance.name(),
                address: chance.address(),
                email: chance.email(),
                phone: chance.phone(),
            })),
    });
}

await client.$disconnect();
process.exit(0);
