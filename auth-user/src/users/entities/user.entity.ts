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

    @Column({default: null})
    navigator: string;

    @Column({default: null})
    zone: string; //La idea es que sea coquimbo pero se debe habilitar el internet y geolocalizacion asi que solo se tomo timeZone

    /*@Column({default: null})
    date: string;*/
};