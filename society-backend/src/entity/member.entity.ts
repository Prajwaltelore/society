import { Column, Entity, PrimaryGeneratedColumn, JoinTable, ManyToMany, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Society } from "./society.entity";
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
import { User } from "./user.entity";

@Entity()
export class Member {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    @IsInt()
    usersId: number;

    @Column({ nullable: false })
    @IsInt()
    societysId: number;

    @Column({ nullable: false })
    @IsInt()
    role: number;

    @Column({ nullable: false })
    @IsInt()
    group: number;

    @Column({ nullable: false })
    @IsInt()
    subgroup: number;

    @Column({ nullable: false, default: false })
    accepted: Boolean;

    @Column({ nullable: false, default: true })
    status: Boolean;

    @Column({ nullable: false, default: false })
    deleted: Boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
    
    // @ManyToOne(() => Society, society => society.id)
    // @JoinColumn({ name: 'societysId' })
    // society: Society[];

    // @ManyToOne(() => User, user => user.id)
    // @JoinColumn({ name: 'usersId' })
    // user: User;

}