import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Member } from "./member.entity";

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
export class Society {
    @PrimaryGeneratedColumn({ name: 'id', unsigned: true })
    id!: number;

    @Column({ nullable: false })
    @Min(4)
    @Max(12)
    project!: string;

    @Column({ nullable: false })
    @Min(4)
    @Max(14)
    society!: string;

    @Column({nullable:false})
    @IsInt()
    country!:number;

    @Column({nullable:false})
    @IsInt()
    state!:number;

    @Column({nullable:false})
    @IsInt()
    city!:number;

    @Column({ nullable: false })
    @Min(4)
    @Max(30)
    address!: string;

    @Column({nullable:false})
    @IsInt()
    pincode!:number;


    // @Column({ nullable: false })
    // @Min(3)
    // @Max(10)
    // district!: string;

    // @Column({ nullable: false })
    // @Min(3)
    // @Max(10)
    // taluka!: string;

    // @Column({ nullable: false })
    // @Min(3)
    // @Max(10)
    // area!: string;

    @Column({nullable:false})
    @IsInt()
    flats!:number;

    @Column({nullable:false, type: 'date'})
    @IsDate()
    formation_date!:Date;

    @Column({ nullable: true, default: 'societies/default.jpg' })
    society_photo!: string;

    @Column({nullable:false})
    @IsInt()
    user!:number;

    @Column({ nullable: false, default: true })
    status!: Boolean;

    @Column({ nullable: false, default: false })
    deleted!: Boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at!: Date;

    // @OneToMany(() => Member, (Member) => Member.societysId)
    // members!: Member[]

    // // @OneToMany(() => Member, (Member) => Member.society_id)
    // // societymembers!: Member[]

    // @ManyToOne(() => User, (user) => user.id)
    // @JoinColumn({ name: 'user' })
    // creator: User
}