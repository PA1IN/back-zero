import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class DeviceResponse{

    @Field()
    token: string;

    @Field()
    success: boolean;
}