import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Restaurant { // graphQL관점에서 본 restaurant가 어떻게 생겼는지 묘사를 한 것
  @Field(type => String)
  name: string;

  @Field(type => Boolean)
  isVegan: boolean;

  @Field(type => String)
  address: string;

  @Field(type => String)
  ownersName: string;
}

// entities는 데이터베이스의 모델이라고 생각하면 된다