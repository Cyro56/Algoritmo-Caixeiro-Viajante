import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class CityPath {
  @Field()
  id: string;
  @Field(() => [String])
  path: Array<string>;
}
