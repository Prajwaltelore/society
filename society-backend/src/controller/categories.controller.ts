import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Categories } from "../entity/categories.entity";

export const Add_categories = async (req: Request, res: Response, next: NextFunction) => {
    const { name,parent} = req.body;

    const result = await getRepository(Categories).save({
        name,parent
    })

    if(result){
        res.send({
            status: true,
            message: 'Categories added successful',
            data: result
        });
    }
}
export const UpdateCategories = async (req: Request<{ id: number }>, res: Response, next: NextFunction) => {
    const { name,parent } = req.body;
    const { id } = req.params;
    try {
        let category = {
            name: name,
            parent: parent
        }        
        const result = await getRepository(Categories).update({ id: id }, category);

        if (result) {
            return res.send({
                status: true,
                message: 'Categories Updated successfully',
                data: result
            })
        } else {
            return res.send({
                status: false,
                message: 'Failed to update Categories',
                data: null
            })
        }

    } catch (err) {
        return res.send({
            status: false,
            message: 'Failed to update Categories',
            data: err
        })
    }
}

export const DeleteCategory = async (req: Request<{ id: number }>, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        
        const result = await getRepository(Categories).delete({ id: id });

        if (result) {
            return res.send({
                status: true,
                message: 'Categories deleted successfully',
                data: null
            })
        } else {
            return res.send({
                status: false,
                message: 'Failed to delete Categories',
                data: null
            })
        }

    } catch (err) {
        return res.send({
            status: false,
            message: 'Failed to delete Categories',
            data: err
        })
    }
}
export const FetchCategories = async (req: Request, res: Response) => {
    const result = await getRepository(Categories).findBy({
        parent: 0,
    });

    if(result){
        return res.send({
            status: true,
            message: 'Categoreies fetched successfully',
            data: result
        })
    }else{
        return res.send({
            status: false,
            message: 'Categories not found',
            data: null
        })
    }
}
export const FetchSubCategories = async (req: Request<{ id: number }>, res: Response) => {
    const {id} = req.params;
    const result = await getRepository(Categories).find({
        where:{
            parent : id
        }
    });

    if(result){
        return res.send({
            status: true,
            message: 'Categoreies fetched successfully',
            data: result
        })
    }else{
        return res.send({
            status: false,
            message: 'Categories not found',
            data: null
        })
    }
}