import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsString, Length, IsOptional } from 'class-validator';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Restaurant { // graphQL관점에서 본 restaurant가 어떻게 생겼는지 묘사를 한 것
  @PrimaryGeneratedColumn()
  @Field(type => Number)
  id: number;

  @Field(type => String)
  @Column()
  @IsString()
  @Length(5)
  name: string;

  @Field(type => Boolean, { nullable: true })
  // @Field(type => Boolean, { defaultValue: false })
  @Column({ default: true })
  @IsOptional()
  isVegan: boolean;

  @Field(type => String, { defaultValue: '행신동' })
  @Column()
  @IsString()
  address: string;

  @Field(type => String)
  @Column()
  @IsString()
  ownersName: string;

  @Field(type => String)
  @Column()
  @IsString()
  categoryName: string;
}

// entities는 데이터베이스의 모델이라고 생각하면 된다