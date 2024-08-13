import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Member } from "../entity/member.entity";
import { Memberroles } from "../entity/memberroles.entity";
import { Society } from "../entity/society.entity";
import { User } from "../entity/user.entity";

export const AddMembers = async (req: Request, res: Response, next: NextFunction) => {
    const { usersId, society_id, role,  group, subgroup } = req.body;
    const member = await getRepository(Member).find({
        where: { societysId: society_id, usersId }
    })

    if(member.length > 0) {
        return res.send({
            status: false,
            message: 'Member already exists',
            data: null
        })
    }else{
        const result = await getRepository(Member).save({
            societysId:society_id, usersId, role, group, subgroup, accepted: true
        })
    
        if(result){
            res.send({
                status: true,
                message: 'Members added successful',
                data: result
            });
        }else{
            res.send({
                status: false,
                message: 'Failed to add Members',
                data: null
            });
        }
    }

}

export const RequestMembership = async (req: Request, res: Response, next: NextFunction) => {
    const { usersId, society_id, role,  group, subgroup } = req.body;
    
    const member = await getRepository(Member).find({
        where: { societysId: society_id, usersId: usersId }
    })

    if(member.length > 0) {
        return res.send({
            status: false,
            message: 'Member already exists',
            data: null
        })
    }else{
        let role = 1;
        const result = await getRepository(Member).save({
            societysId: society_id, usersId, role,  group, subgroup
        })
    
        if(result){
            res.send({
                status: true,
                message: 'Members added successful',
                data: result
            });
        }else{
            res.send({
                status: false,
                message: 'Failed to add Members',
                data: null
            });
        }
    }

}

export const UpdateMembers = async (req: Request<{ id: number }>, res: Response, next: NextFunction) => {
    const { user_id, society_id, subgroup, group, role } = req.body;
    const { id } = req.params;
    try {
        let member = {
            usersId: user_id,
            societysId: society_id,
            group: group,
            subgroup: subgroup,
            role: role
        }        
        const result = await getRepository(Member).update({ id: id }, member);

        if (result) {
            return res.send({
                status: true,
                message: 'Members Updated successfully',
                data: result
            })
        } else {
            return res.send({
                status: false,
                message: 'Failed to update Members',
                data: null
            })
        }

    } catch (err) {
        return res.send({
            status: false,
            message: 'Failed to update Members',
            data: err
        })
    }
}

export const DeleteMembers = async (req: Request<{ id: number }>, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        
        const result = await getRepository(Member).delete({ id: id });

        if (result) {
            return res.send({
                status: true,
                message: 'Members deleted successfully',
                data: null
            })
        } else {
            return res.send({
                status: false,
                message: 'Failed to delete Members',
                data: null
            })
        }

    } catch (err) {
        return res.send({
            status: false,
            message: 'Failed to delete Members',
            data: err
        })
    }
}
export const GetMembers = async (req: Request<{ id: number }>, res: Response, next: NextFunction) => {
 
    const { id } = req.params;

    try {
        
        const result = await getRepository(Member).find({
            where : {
                societysId : id
            }
        });

        if (result) {
            return res.send({
                status: true,
                message: 'Members fetched successfully',
                data: null
            })
        } else {
            return res.send({
                status: false,
                message: 'Failed to fetch Members',
                data: null
            })
        }

    } catch (err) {
        
        return res.send({
            status: false,
            message: 'Failed to fetch Members',
            data: err
        })
    }
}

export const fetchMemberById = async (req: Request<{ id: number}>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        
        const result = await getRepository(User).createQueryBuilder("user")
            .leftJoin("member", "member", "user.id = member.usersId")
            .where('member.id = :id', { id: id })
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
                "member.group",
                "member.subgroup",
            ])
            .getRawOne();

        return res.send({
            status: true,
            message: 'Member fetched successfully',
            data: result
        })
    } catch (err) {
        return res.send({
            status: false,
            message: 'Failed to fetch Member',
            data: err
        })
    }
}

export const fetchRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getRepository(Memberroles).find();
        return res.send({
            status: true,
            message: 'Roles fetched successfully',
            data: result
        })
    } catch (err) {
        return res.send({
            status: false,
            message: 'Failed to fetch Roles',
            data: err
        })
    }
}