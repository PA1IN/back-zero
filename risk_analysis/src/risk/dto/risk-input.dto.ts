import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RiskInput {
  @Field()
  userId: number;

  @Field()
  ip: string;

  @Field()
  navigator: string;

  @Field()
  operatingSystem: string;

  @Field()
  timeZone: string;

  @Field()
  email: string;

  @Field()
  deviceId: string;
}
