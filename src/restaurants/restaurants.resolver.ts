import { Query, Resolver,Args } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entity';

@Resolver(of => Restaurant)
export class RestaurantResolver {
  // @Query(returns => Restaurant) // Restaurant를 return하고 Restaurant는 restaurant.entity.ts파일에서 만든 Object Type의 모양대로 들어갈 것이다.
  // myRestaurant() {
  //   return true;
  // }
  @Query(returns => [Restaurant])
  restaurants(@Args('veganOnly') veganOnly: boolean): Restaurant[] { // veganOnly라는 이름을 가진 argument를 요청한다. 그리고 veganOnly는 boolean값을 가진다
    return [];
  }
}