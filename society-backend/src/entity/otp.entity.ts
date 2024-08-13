import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import {
    IsInt,
    Min,
    Max,
} from "class-validator"

@Entity()
export class Otp {
    @PrimaryGeneratedColumn({ name: 'id', unsigned: true })
    id!: number;

    @Column({ nullable: false })
    @IsInt()
    @Min(10)
    @Max(10)
    mobile!: string;

    @Column({ nullable: false })
    message!: string;

    @Column({ nullable: false })
    @Min(6)
    @Max(6)
    otp!: string;

    @Column({ nullable: false, default: true })
    status!: Boolean;

    @Column({ nullable: false, default: false })
    deleted!: Boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at!: Date;

}