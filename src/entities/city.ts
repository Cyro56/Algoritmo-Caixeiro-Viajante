import { Field, FieldResolver, ObjectType } from "type-graphql";

@ObjectType()
export class CityPath {
  @Field()
  id: string;
  @Field(() => [String])
  path: Array<string>;
}

@ObjectType()
export class SimulationValues {
  @Field()
  maxValue!: number;
  @Field()
  minValue!: number;
  @Field()
  maxParcel!: number;
  @Field()
  minParcel!: number;
}

@ObjectType()
export class SimulationResponse {
  @Field()
  id: string;
  @Field()
  response!: string;
  @Field()
  loanValue: number;
  @Field()
  loanTerm: number;
  @Field()
  loanValueByTerm: number;
  @Field()
  loanAmountValue: number;
  @Field()
  loanFee: number;
  @Field()
  loanFeeAmountValue: number;
  @Field()
  proposalType: string;
}
