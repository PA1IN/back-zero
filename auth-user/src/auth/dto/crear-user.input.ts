import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CrearUserInput {
    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    operatingSystem: string;

    @Field()
    timeZone: string;

    @Field()
    navigator: string;

    @Field() //No lo colocamos como date por simplicidad, es preferible el string
    time: string;
}