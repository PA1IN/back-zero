import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class TokenCheck {
    @Field()
    ok: boolean;
    
    @Field(() => Int, { nullable: true})
    userId?: number;
}