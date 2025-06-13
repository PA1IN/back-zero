import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CrearUserInput {
    @Field()
    email: string;

    @Field()
    password: string;
}