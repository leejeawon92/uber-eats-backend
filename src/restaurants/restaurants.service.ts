import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantInput, CreateRestaurantOutput } from './dtos/create-restaurant.dto';
import { User } from 'src/users/entities/user.entity';
import { Category } from './entities/cetegory.entity';
import { EditRestaurantInput, EditRestaurantOutput } from './dtos/edit-restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor( 
    @InjectRepository(Restaurant) private readonly restaurants: Repository<Restaurant>,
    @InjectRepository(Category) private readonly categories: Repository<Category>,
  ) {}

  async getOrCreateCategory(name: string): Promise<Category> {
    const categoryName = name.trim().toLowerCase();
    const categorySlug = categoryName.replace(/ /g, '-');
    let category = await this.categories.findOne({where: { slug: categorySlug }});
    if (!category) {
      category = await this.categories.save(
        this.categories.create({ slug: categorySlug, name: categoryName }),
      );
    }
    return category;
  }

  async createRestaurant(
    owner: User,
    createRestaurantInput: CreateRestaurantInput): Promise<CreateRestaurantOutput> {
      try {
        const newRestaurant = this.restaurants.create(createRestaurantInput);
        newRestaurant.owner = owner;
        const category = await this.getOrCreateCategory(
          createRestaurantInput.categoryName,
        );
        newRestaurant.category = category;
        await this.restaurants.save(newRestaurant);
        return {
          ok: true,
        };
      } catch {
        return {
          ok: false,
          error: '레스토랑을 생성할 수 없습니다.',
        };
      }
  }

  async editRestaurant(
    owner: User,
    editRestaurantInput: EditRestaurantInput,
  ): Promise<EditRestaurantOutput> {
    try {
      const restaurant = await this.restaurants.findOne({where : {id : editRestaurantInput.restaurantId}})
      if (!restaurant) {
        return {
          ok: false,
          error: 'Restaurant not found',
        };
      }
      if (owner.id !== restaurant.ownerId) {
        return {
          ok: false,
          error: "owner가 아니면 레스토랑을 수정할 수 없습니다.",
        };
      }

      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '레스토랑을 수정 할 수 없습니다.',
      };
    }
  }
}

