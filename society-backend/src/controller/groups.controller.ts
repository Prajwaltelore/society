import { Request, Response, NextFunction } from "express";
import { NotBrackets, getRepository } from "typeorm";
import { Groups } from "../entity/groups.entity";

export const Add_groups = async (req: Request, res: Response, next: NextFunction) => {
    const { name, parent, society_id } = req.body;

    const result = await getRepository(Groups).save({
        name, parent, society_id
    })

    if (result) {
        res.send({
            status: true,
            message: 'Groups added successful',
            data: result
        });
    }
}
export const UpdateGroups = async (req: Request<{ id: number }>, res: Response, next: NextFunction) => {
    const { name, parent, society_id } = req.body;
    const { id } = req.params;
    try {
        let group = {
            name: name,
            parent: parent,
            society_id: society_id
        }
        const result = await getRepository(Groups).update({ id: id }, group);

        if (result) {
            return res.send({
                status: true,
                message: 'Groups Updated successfully',
                data: result
            })
        } else {
            return res.send({
                status: false,
                message: 'Failed to update Groups',
                data: null
            })
        }

    } catch (err) {
        return res.send({
            status: false,
            message: 'Failed to update Groups',
            data: err
        })
    }
}

export const DeleteGroups = async (req: Request<{ id: number }>, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {

        const result = await getRepository(Groups).delete({ id: id });

        if (result) {
            return res.send({
                status: true,
                message: 'Groups deleted successfully',
                data: null
            })
        } else {
            return res.send({
                status: false,
                message: 'Failed to delete Groups',
                data: null
            })
        }

    } catch (err) {
        return res.send({
            status: false,
            message: 'Failed to delete Groups',
            data: err
        })
    }
}
export const FetchGroups = async (req: Request, res: Response) => {
    const result = await getRepository(Groups).find();

    if (result) {
        return res.send({
            status: true,
            message: 'Groups fetched successfully',
            data: result
        })
    } else {
        return res.send({
            status: false,
            message: 'Groups not found',
            data: null
        })
    }
}
export const FetchSubGroups = async (req: Request<{ id: number }>, res: Response) => {
    const { id } = req.params;
    const result = await getRepository(Groups).find({
        where: {
            parent: id
        }
    });

    if (result) {
        return res.send({
            status: true,
            message: 'Groups fetched successfully',
            data: result
        })
    } else {
        return res.send({
            status: false,
            message: 'Groups not found',
            data: null
        })
    }
}

export const fetchGroupsBySociety = async (req: Request<{ id: number }>, res: Response) => {
    const { id } = req.params;
    const result = await getRepository(Groups).createQueryBuilder("groups")
        .select('*')
        .where("groups.society_id = :society_id", { society_id: id })
        .andWhere("groups.parent = :parent", { parent: 0 })
        .andWhere("groups.status = :status", { status: true })
        .andWhere("groups.deleted = :deleted", { deleted: false })
        .getRawMany();

    if (result) {
        return res.send({
            status: true,
            message: 'Groups fetched successfully',
            data: result
        })
    } else {
        return res.send({
            status: false,
            message: 'Groups not found',
            data: null
        })
    }
}

export const fetchSubGroupsByGroup = async (req: Request<{ id: number }>, res: Response) => {
    const { id } = req.params;
    const result = await getRepository(Groups).createQueryBuilder("groups")
                    .select('*')
                    .andWhere("groups.parent = :parent", { parent: id })
                    .andWhere("groups.status = :status", { status: true })
                    .andWhere("groups.deleted = :deleted", { deleted: false })
                    .getRawMany();

    if (result) {
        return res.send({
            status: true,
            message: 'Groups fetched successfully',
            data: result
        })
    } else {
        return res.send({
            status: false,
            message: 'Groups not found',
            data: null
        })
    }
}