import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class LoginInput {
    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    time: string;

    @Field()
    navigator: string;

    @Field()
    operatingSystem: string;

    @Field()
    zone: string;

    /*@Field()
    idDevice: string;*/
};