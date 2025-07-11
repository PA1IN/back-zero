import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'risk'})
export class RiskEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: "::1"})
    ip: string;

    @Column({default: 'Windows'})
    operating_system: string;

    @Column({default: '-1'})
    user_id: number;

    @Column({default: 'null'})
    email: string;
    
    @Column({default: '-1'})
    device_id: number;

    @Column({default: 'G-0'})
    time_zone: string;

    @Column({default: null})
    timestamp: string;

    @Column({type: 'text', nullable: true})
    risk_level_ia: string;
}