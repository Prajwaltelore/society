import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Countries {
    @PrimaryGeneratedColumn({ name: 'id', unsigned: true })
    id!: number;

    @Column({ nullable: false })
    name!: string;

    @Column({ nullable: false })
    shortname!: string;

    @Column({ nullable: false })
    phonecode!: string;

    @Column({ nullable: true })
    created_at!: Date;

    @Column({ nullable: true })
    updated_at!: Date;

    @OneToOne(() => User, (user) => user.country) // specify inverse side as a second parameter
    user: User
}