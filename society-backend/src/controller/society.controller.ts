import { Request, Response, NextFunction } from "express";
import { createQueryBuilder, getRepository, Like } from "typeorm";
import { Society } from "../entity/society.entity";
import { Member } from "../entity/member.entity";
import { User } from "../entity/user.entity";
import { selectFields } from "express-validator/src/field-selection";


export const Add_society = async (req: Request, res: Response, next: NextFunction) => {
    const { project, society, address, country, state, city, flats, formation_date, user, pincode } = req.body;

    try {
        const result = await getRepository(Society).save({
            project, society, address, country, state, city, flats, formation_date, user, pincode
        })

        if (result) {
            res.send({
                status: true,
                message: 'Society created successfuly',
                data: {
                    result
                }
            });
        } else {
            res.send({
                status: false,
                message: 'Failed to add Society',
                data: result
            })
        }
    } catch (err) {
        return res.send({
            status: false,
            message: 'Failed to add Society',
            data: err
        })
    }
}
export const UpdateSociety = async (req: Request<{ id: number }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { project_name, society_name, address, country, state, city, flats, formation_date, pincode } = req.body;
    const check = await getRepository(Society).findOneBy({ id: id });
    if (!check) {
        return res.send({
            status: false,
            message: 'Society not found',
            data: null
        })
    }

    try {
        let society = {
            project_name: project_name,
            society_name: society_name,
            country: country,
            state: state,
            city: city,
            address: address,
            flats: flats,
            formation_date: formation_date,
            pincode: pincode
        }


        const result = await getRepository(Society).update({ id: id }, society);

        if (result) {
            return res.send({
                status: true,
                message: 'Society Updated successfully',
                data: result
            })
        } else {
            return res.send({
                status: false,
                message: 'Failed to update Society',
                data: null
            })
        }

    } catch (err) {
        return res.send({
            status: false,
            message: 'Failed to update Society',
            data: err
        })
    }
}
export const DeleteSociety = async (req: Request<{ id: number }>, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {

        const result = await getRepository(Society).delete({ id: id });

        if (result) {
            return res.send({
                status: true,
                message: 'Society deleted successfully',
                data: null
            })
        } else {
            return res.send({
                status: false,
                message: 'Failed to delete Society',
                data: null
            })
        }

    } catch (err) {
        return res.send({
            status: false,
            message: 'Failed to delete Society',
            data: err
        })
    }
}

export const fetchSocieties = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getRepository(Society).find();
        return res.send({
            status: true,
            message: 'Societies fetched successfully',
            data: result
        })
    } catch (err) {
        return res.send({
            status: false,
            message: 'Failed to fetch Societies',
            data: err
        })
    }
}

export const fetchSocietiesByUser = async (req: Request<{ id: number }>, res: Response, next: NextFunction) => {
    try {
        const result = await getRepository(Society).find({
            where: { user: req.params.id }
        });
        return res.send({
            status: true,
            message: 'Societies fetched successfully',
            data: result
        })
    } catch (err) {
        return res.send({
            status: false,
            message: 'Failed to fetch Societies',
            data: err
        })
    }
}

export const fetchSocietiesByName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getRepository(Society).findBy({
            society: Like(`%${req.body.search}%`)
        });
        return res.send({
            status: true,
            message: 'Societies fetched successfully',
            data: result
        })
    } catch (err) {
        return res.send({
            status: false,
            message: 'Failed to fetch Societies',
            data: err
        })
    }
}

export const fetchSociety = async (req: Request<{ id: number }>, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {

        // const result = await getRepository(Society).findOneBy({ id: id });

        const result = await getRepository(Society).createQueryBuilder("society")
        .leftJoin("cities", "cities", "society.city = cities.id")
        .leftJoin("states", "states", "society.state = states.id")
        // .leftJoin("countries", "countries", "society.country = countries.id")
        .select([
            "society.*",
            "cities.name",
            "states.name",
            // "countries.name" 
        ])
        .where("society.id = :id", { id: id })
        .getRawOne();

        if (result) {
            return res.send({
                status: true,
                message: 'Data found',
                data: result
            })
        } else {
            return res.send({
                status: false,
                message: 'Data not found',
                data: null
            })
        }

    } catch (err) {
        return res.send({
            status: false,
            message: 'Failed to find Society',
            data: err
        })
    }
}

export const fetchJoinedSociety = async (req: Request<{ id: number }>, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const result = await getRepository(Society).createQueryBuilder("society")
            .leftJoin("member", "member", "member.societysId = society.id")
            .select(['society', 'member'])
            .where("member.usersId = :usersId", { usersId: id })
            .getRawMany();

        return res.send({
            status: true,
            message: 'Data found',
            data: result
        })
    } catch (err) {
        return res.send({
            status: false,
            message: 'Data not found',
            data: err
        })
    }
}

export const fetchMembersBySociety = async (req: Request<{ id: number }>, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const result = await getRepository(User).createQueryBuilder("user")
            .leftJoin("member", "member", "user.id = member.usersId")
            .where('member.societysId = :societysId', { societysId: id })
            .andWhere('member.accepted = :accepted', { accepted: true })
            .andWhere('member.status = :status', { status: true })
            .andWhere('member.deleted = :deleted', { deleted: false })
            .select([
                "user.id",
                "user.firstname",
                "user.lastname",
                "user.mobile",
                "user.email",
                "user.profile_image",
                "member.id",
                "member.role",
            ])
            .getRawMany();

        return res.send({
            status: true,
            message: 'Members fetched successfully',
            data: result
        })
    } catch (err) {
        return res.send({
            status: false,
            message: 'Failed to fetch Members',
            data: err
        })
    }
}

export const fetchMembersRequestsBySociety = async (req: Request, res: Response, next: NextFunction) => {
    const { society_id } = req.body;

    try {
        const result = await getRepository(User)
            .createQueryBuilder('user')
            .innerJoin('member', 'member', 'user.id = member.usersId')
            .where('member.societysId = :societysId', { societysId: society_id })
            .andWhere('member.accepted = :accepted', { accepted: 0 })
            .select([
                'user.id',
                'user.firstname',
                'user.lastname',
                'user.mobile',
                'user.email',
                'user.profile_image',
                'member.id AS memberid',
                'member.accepted',
                'member.status',
            ])
            .getRawMany();

        return res.send({
            status: true,
            message: 'Members fetched successfully',
            data: result
        })
    } catch (err) {
        return res.send({
            status: false,
            message: 'Failed to fetch Members',
            data: err
        })
    }
}

export const respondRequest = async (req: Request, res: Response, next: NextFunction) => {
    const { id, accepted, status, society_id } = req.body;

    try {

        let data = {
            accepted: accepted,
            status: status,
            societysId: Number(society_id)
        }

        const result = await getRepository(Member).update({ id: id }, data);

        if (result) {
            return res.send({
                status: true,
                message: 'Request responded successfully',
                data: null
            })
        } else {
            return res.send({
                status: false,
                message: 'Failed to respond request',
                data: null
            })
        }

    } catch (err) {
        return res.send({
            status: false,
            message: 'Failed to respond request',
            data: err
        })
    }
}

export const removeMember = async (req: Request<{ society: number, id: number }>, res: Response, next: NextFunction) => {
    const { society, id } = req.params;

    try {
        const result = getRepository(Member).update({ id: id }, { status: false, deleted: true });
        
        if (result) {
            return res.send({
                status: true,
                message: 'Member removed successfully',
                data: null
            })
        } else {
            return res.send({
                status: false,
                message: 'Failed to remove member',
                data: null
            })
        }
    } catch (err) {
        return res.send({
            status: false,
            message: 'Failed to remove member',
            data: err
        })
    }
}
export const homeDataCount = async (req: Request<{ id: number }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const society = await getRepository(Society).count()
    const members = await getRepository(Member).count({
        where: {
            societysId: id, status: true
        }
    })

    const requests = await getRepository(Member).count({
        where: {
            societysId: id, accepted: false
        }
    })

    const vendors = 0;
    const complaints = 0;

    return res.send({
        status: true,
        message: 'Data fetched successfully',
        data: { society: society, members: members, requests: requests, vendors: vendors, complaints: complaints }
    })
}