import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity({name: "device"})
export class DeviceEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    device_id: string;
}