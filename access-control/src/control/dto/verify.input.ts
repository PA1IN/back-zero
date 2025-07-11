import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class VerifyInput {
    @Field()
    deviceId: string;
}