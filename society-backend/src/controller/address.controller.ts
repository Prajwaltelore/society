import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Countries } from "../entity/countries.entity";
import { States } from "../entity/states.entity";
import { Cities } from "../entity/cities.entity";


export const Fetchcountries = async (req: Request, res: Response) => {
    const result = await getRepository(Countries).find();

    if(result){
        return res.send({
            status: true,
            message: 'Countries fetched successfully',
            data: result
        })
    }else{
        return res.send({
            status: false,
            message: 'Countries not found',
            data: null
        })
    }

}

export const Fetchstates = async (req: Request, res: Response) => {
    const result = await getRepository(States).find();

    if(result){
        return res.send({
            status: true,
            message: 'States fetched successfully',
            data: result
        })
    }else{
        return res.send({
            status: false,
            message: 'States not found',
            data: null
        })
    }

}

export const FetchStatesByCountry = async (req: Request<{ id: number}>, res: Response) => {
    const result = await getRepository(States).find({
        where: {
            country_id: req.params.id
        }
    });

    if(result){
        return res.send({
            status: true,
            message: 'States fetched successfully',
            data: result
        })
    }else{
        return res.send({
            status: false,
            message: 'States not found',
            data: null
        })
    }

}


export const FetchCitiesByState = async (req: Request<{ id: number}>, res: Response) => {
    const result = await getRepository(Cities).find({
        where: {
            state_id: req.params.id
        }
    });

    if(result){
        return res.send({
            status: true,
            message: 'Cities fetched successfully',
            data: result
        })
    }else{
        return res.send({
            status: false,
            message: 'Cities not found',
            data: null
        })
    }

}

export const Fetchcities = async (req: Request, res: Response) => {
    const result = await getRepository(Cities).find();

    if(result){
        return res.send({
            status: true,
            message: 'Cities fetched successfully',
            data: result
        })
    }else{
        return res.send({
            status: false,
            message: 'Cities not found',
            data: null
        })
    }

}