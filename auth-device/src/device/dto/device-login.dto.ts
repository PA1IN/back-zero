import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class DeviceLogin{
    @Field()
    device: string;
}