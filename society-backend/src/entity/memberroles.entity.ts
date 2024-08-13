import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from "typeorm";

@Entity()
export class Memberroles {
    @PrimaryGeneratedColumn({ name: 'id', unsigned: true })
    id!: number;

    @Column({ nullable: false })
    role!: string;

    @Column({ nullable: true })
    created_at!: Date;

    @Column({ nullable: true })
    updated_at!: Date;

}