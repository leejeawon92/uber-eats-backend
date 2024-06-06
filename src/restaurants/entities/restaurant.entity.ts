import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IsString, Length  } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Category } from './cetegory.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Restaurant extends CoreEntity {

  @Field(type => String)
  @Column()
  @IsString()
  @Length(5)
  name: string;

  @Field(type => String)
  @Column()
  @IsString()
  coverImg: string;

  @Field(type => String, { defaultValue: '행신동' })
  @Column()
  @IsString()
  address: string;

  @Field(type => Category)
  @ManyToOne(
    type => Category,
    category => category.restaurants,
  )
  category: Category;
}

// entities는 데이터베이스의 모델이라고 생각하면 된다