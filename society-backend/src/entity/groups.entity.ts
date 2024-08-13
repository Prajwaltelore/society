import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import {
    Contains,
    IsInt,
    Length,
    IsEmail,
    IsFQDN,
    IsDate,
    Min,
    Max,
} from "class-validator"

@Entity()
export class Groups {
    @PrimaryGeneratedColumn({ name: 'id', unsigned: true })
    id!: number;

    @Column({ nullable: false })
    name!: string;

    @Column({ nullable: false, default: 0 })
    parent!: number;

    @Column({ nullable: false })
    society_id!: number;

    @Column({ nullable: false, default: true })
    status!: Boolean;

    @Column({ nullable: false, default: false })
    deleted!: Boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at!: Date;

}