import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Documents } from "../entity/documents.entity";
import path from 'path';

export const Add_docs = async (req: Request, res: Response, next: NextFunction) => {
    const { society_id, doc_number, doc_type } = req.body;
    console.log(req.files);
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.send({status: false, message: 'No files were uploaded.', data: null});
    }

    var timestamp = new Date().toISOString().replace(/[-:.]/g,"");  
    var random = ("" + Math.random()).substring(2, 8); 
    var random_number = timestamp+random;  

    let uploadedFile;
    let uploadPath;

    uploadedFile = req.files.file;
    let filetype = uploadedFile.mimetype.toString();
    // console.log(filetype);
    // if(filetype != "image/png" || filetype != "image/jpg") {
    //     return res.send({status: false, message: 'Only jpg & png files are allowed.', data: null});
    // }

    uploadPath = '/public/documents/' + doc_type+'-'+random_number+'-'+society_id+'.png';
    const fileDir = path.join(process.cwd()+'/public/documents/', '' + doc_type+'-'+random_number+'-'+society_id+'.png');

    let file = 'documents/'+doc_type+'-'+random_number+'-'+society_id;

    uploadedFile.mv(fileDir, function (err: any) {
        if (err) {
            res.send({
                status: false,
                message: 'Failed to upload Documents',
                data: err,
            })
        } else {
            const result = getRepository(Documents).save({
                society_id, doc_number, file, doc_type
            })

            if (result) {
                res.send({
                    status: true,
                    message: 'Documents uploaded successful',
                    data: result
                });
            }else{
                res.send({
                    status: false,
                    message: 'Failed to upload Documents',
                    data: null
                })
            }
        }

    });
}
export const UpdateDocument = async (req: Request<{ id: number }>, res: Response, next: NextFunction) => {
    const { society_id, doc_number, file, doc_type } = req.body;
    const { id } = req.params;
    try {
        let doc = {
            society_id: society_id,
            doc_number: doc_number,
            file: file,
            doc_type: doc_type
        }
        const result = await getRepository(Documents).update({ id: id }, doc);

        if (result) {
            return res.send({
                status: true,
                message: 'Documents Updated successfully',
                data: result
            })
        } else {
            return res.send({
                status: false,
                message: 'Failed to update Documents',
                data: null
            })
        }

    } catch (err) {
        return res.send({
            status: false,
            message: 'Failed to update Documents',
            data: err
        })
    }
}

export const DeleteDocument = async (req: Request<{ id: number }>, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {

        const result = await getRepository(Documents).delete({ id: id });

        if (result) {
            return res.send({
                status: true,
                message: 'Documents deleted successfully',
                data: null
            })
        } else {
            return res.send({
                status: false,
                message: 'Failed to delete Documents',
                data: null
            })
        }

    } catch (err) {
        return res.send({
            status: false,
            message: 'Failed to delete Documents',
            data: err
        })
    }
}

export const fetchDocuments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getRepository(Documents).find();
        return res.send({
            status: true,
            message: 'Documents fetched successfully',
            data: result
        })
    } catch (err) {
        return res.send({
            status: false,
            message: 'Failed to fetch Documents',
            data: err
        })
    }
}

export const fetchDocsBySociety = async (req: Request<{ id: number }>, res: Response, next: NextFunction) => {
    try {
        const result = await getRepository(Documents).find({
            where: { society_id: req.params.id }
        });
        return res.send({
            status: true,
            message: 'Documents fetched successfully',
            data: result
        })
    } catch (err) {
        return res.send({
            status: false,
            message: 'Failed to fetch Documents',
            data: err
        })
    }
}