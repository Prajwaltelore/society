import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, JoinTable, ManyToMany, OneToMany, } from "typeorm";

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

import { Countries } from "./countries.entity";
import { Member } from "./member.entity";
import { Society } from "./society.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    @Min(3)
    firstname: string;

    @Column({ nullable: false })
    @Min(3)
    lastname: string;

    @Column({ unique: true, nullable: false })
    @IsInt()
    @Min(10)
    @Max(10)
    mobile: string;

    @Column({ unique: true, nullable: false })
    @IsEmail()
    email: string;

    @Column({ type: 'date', nullable: true, })
    @IsDate()
    dob: Date;

    @Column({ nullable: true, default: 'https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere-thumbnail.png' })
    profile_image: string;

    @Column({ nullable: false })
    @Min(6)
    @Max(12)
    password: string;

    @Column({ nullable: true })
    country: number;

    @Column({ nullable: true })
    state: number;

    @Column({ nullable: true })
    city: number;

    @Column({ nullable: true })
    emergency_contact: string;

    @Column({ nullable: true })
    occupation: string;

    @Column({ nullable: true })
    gender: string;

    @Column({ nullable: true  })
    current_address: string;

    @Column({ nullable: true  })
    permanent_address: string;

    @Column({ nullable: false, default: true })
    status: Boolean;

    @Column({ nullable: false, default: false })
    deleted: Boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    // @OneToOne(() => Countries, (country) => country.id)
    // @JoinColumn({ name: 'country' })
    // countrydata: Countries

    // @OneToMany(() => Member, (member) => member.usersId)
    // member: Member[]

    // @OneToMany(() => Society, (society) => society.user)
    // societies: Society[]

}