import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Restaurant {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  address: string;

  @Field()
  phone: string;

  @Field()
  email: string;
}
