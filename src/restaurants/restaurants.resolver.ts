import { Query, Resolver,Args, Mutation } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { RestaurantService } from './restaurants.service';
import { UpdateRestaurantDto } from './dtos/update-restaurant.dto';

@Resolver(of => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}
  @Query(returns => [Restaurant])
  restaurants(): Promise<Restaurant[]> {
    return this.restaurantService.getAll();
  }
  
  @Mutation(returns => Boolean)
  async createRestaurant(@Args('input') createRestaurantDto: CreateRestaurantDto): Promise<boolean> {
    try {
      await this.restaurantService.createRestaurant(createRestaurantDto);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  @Mutation(returns => Boolean)
  async updateRestaurant( @Args('input') updateRestaurantDto: UpdateRestaurantDto): Promise<boolean> {
    try {
      await this.restaurantService.updateRestaurant(updateRestaurantDto);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  // @Query(returns => Restaurant) // Restaurant를 return하고 Restaurant는 restaurant.entity.ts파일에서 만든 Object Type의 모양대로 들어갈 것이다.
  // myRestaurant() {
  //   return true;
  // }
  // @Mutation(returns => Boolean)
  // createRestaurant(@Args('createRestaurantDto') createRestaurantInput: CreateRestaurantDto): boolean {
  //   console.log(createRestaurantInput);
  //   return true;
  // }
}