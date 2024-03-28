import { Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entity';

@Resolver()
export class RestaurantResolver {
  @Query(returns => Restaurant) // Restaurant를 return하고 Restaurant는 restaurant.entity.ts파일에서 만든 Object Type의 모양대로 들어갈 것이다.
  myRestaurant() {
    return true;
  }
}