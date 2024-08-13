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
export class Documents {
    @PrimaryGeneratedColumn({ name: 'id', unsigned: true })
    id!: number;
   
    @Column({ nullable: false })
    @IsInt()
    society_id!: number;

    @Column({ nullable: false })
    @Min(3)
    @Max(12)
    doc_number!: string;

    @Column({ nullable: false })
    @Min(3)
    @Max(12)
    file!: string;

    @Column({ nullable: false })
    @Min(3)
    @Max(12)
    doc_type!: string;

    @Column({ nullable: false, default: true })
    status!: Boolean;

    @Column({ nullable: false, default: false })
    deleted!: Boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at!: Date;

}