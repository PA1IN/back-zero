import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity({name: "device"})
export class DeviceEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    device_id: string;

    @Column({default: null})//Desde el navegador no hay forma de extraer la mac, solo usando java se puede
    mac: string;

    @Column()
    ip: string;

    @Column({default: null})
    operating_system: string;
}