import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cities {
    @PrimaryGeneratedColumn({ name: 'id', unsigned: true })
    id!: number;

    @Column({ nullable: false })
    name!: string;

    @Column({ nullable: false })
    state_id!: number;

    @Column({ nullable: true })
    created_at!: Date;

    @Column({ nullable: true })
    updated_at!: Date;

}