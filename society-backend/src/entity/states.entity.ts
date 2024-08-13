import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class States {
    @PrimaryGeneratedColumn({ name: 'id', unsigned: true })
    id!: number;

    @Column({ nullable: false })
    name!: string;

    @Column({ nullable: false })
    country_id!: number;

    @Column({ nullable: true })
    created_at!: Date;

    @Column({ nullable: true })
    updated_at!: Date;

}