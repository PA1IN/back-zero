import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';


@ObjectType()
@Entity()
export class User {
    @Field(()=> ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Field()
    @Column({ default: 'user' })
    role: string;
}