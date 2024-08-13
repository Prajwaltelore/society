import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/user.entity";
import bcryptjs from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

export const Register = async (req: Request, res: Response, next: NextFunction) => {
    const { firstname, lastname, mobile, email, password, confirm_password } = req.body;

    if (password !== confirm_password) {
        return res.send({
            status: false,
            message: 'Passwords do not match',
            data: null
        })
    }

    const checkM = await getRepository(User).findOne({
        where: {
            mobile: mobile
        }
    });

    if (checkM) {
        return res.send({
            status: false,
            message: 'Mobile already exists',
            data: null
        })
    }

    const checkE = await getRepository(User).findOne({
        where: {
            email: email
        }
    });

    if (checkE) {
        return res.send({
            status: false,
            message: 'Email already exists',
            data: null
        })
    }

    const user = await getRepository(User).save({
        firstname, lastname, mobile, email, password: await bcryptjs.hash(password, 12)
    })

    if (user) {
        const accessToken = sign({
            id: user.id
        }, "access_secret", { expiresIn: 60 * 60 });

        const refreshToken = sign({
            id: user.id
        }, "refresh_secret", { expiresIn: 24 * 60 * 60 })

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 //equivalent to 1 day
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000 //equivalent to 7 days
        })

        res.send({
            status: true,
            message: 'Signup successful',
            data: {
                user: user,
                access_token: accessToken,
                refresh_token: refreshToken
            }
        });

    } else {
        res.send({
            status: false,
            message: 'Failed to create account',
            data: user
        });
    }

}

export const Login = async (req: Request, res: Response, next: NextFunction) => {
    const { mobile, password } = req.body;
    try {
        const user = await getRepository(User).findOne({
            where: {
                mobile: mobile
            }
        });
        if (!user) {
            return res.send({
                status: false,
                message: 'Invalid Credentials',
                data: null
            })
        }

        if (!await bcryptjs.compare(password, user.password)) {
            return res.send({
                status: false,
                message: 'Invalid Credentials',
                data: null
            })
        }

        const accessToken = sign({
            id: user.id
        }, "access_secret", { expiresIn: 60 * 60 });

        const refreshToken = sign({
            id: user.id
        }, "refresh_secret", { expiresIn: 24 * 60 * 60 })

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 //equivalent to 1 day
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000 //equivalent to 7 days
        })

        res.send({
            status: true,
            message: 'Login successfull',
            data: {
                user: user,
                access_token: accessToken,
                refresh_token: refreshToken
            }
        });

    } catch (e) {
        return res.send({
            status: false,
            message: 'Invalid Credentials',
            data: null
        })
    }
}

export const AuthenticatedUser = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];  
    const token = authHeader && authHeader.split(' ')[1];
     
    if(token === null || typeof(token) === "undefined"){
        return res.send({
            status: false,
            message: 'Unauthenticated',
            data: null
        })
    }
    try {

        console.log(token)
        const payload: any = verify(token, "access_secret");

        if (!payload) {
            return res.send({
                status: false,
                message: 'Unauthenticated',
                data: null
            })
        }

        const user = await getRepository(User).findOne({
            where: {
                id: payload.id
            }
        });

        if (!user) {
            return res.send({
                status: false,
                message: 'User not found',
                data: null
            })
        }

        const { password, ...data } = user;

        res.send({
            status: true,
            message: 'Data found',
            data: data
        });

    } catch (e) {
        // console.log(e)
        return res.send({
            status: false,
            message: 'Unauthenticated',
            data: null
        })
    }
}

export const Refresh = async (req: Request, res: Response) => {

    const authHeader = req.headers['authorization'];  
    const token = authHeader && authHeader.split(' ')[1];
     
    if(token === null || typeof(token) === "undefined"){
        return res.send({
            status: false,
            message: 'Unauthenticated',
            data: null
        })
    }
    try {

        // const refreshToken = req.cookies['refreshToken'];

        const payload: any = verify(token, "refresh_secret");

        if (!payload) {
            return res.status(401).send({
                message: 'unauthenticated'
            })
        }

        const accessToken = sign({
            id: payload.id,
        }, "access_secret", { expiresIn: 60 * 60 })

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 //equivalent to 1 day
        });

        res.send({
            status: true,
            message: 'success',
            data: accessToken
        })

    } catch (e) {
        return res.send({
            status: false,
            message: 'unauthenticated',
            data: null,
        })
    }
}

export const Logout = async (req: Request, res: Response) => {
    try {
        res.cookie('accessToken', '', { maxAge: 0 });
        res.cookie('refreshToken', '', { maxAge: 0 });
        return res.send({
            status: true,
            message: 'Successfully logged out',
            data: null,
        })
    } catch (e) {
        return res.send({
            status: false,
            message: 'Failed to logout',
            data: e,
        })
    }
}

export const Updateprofile = async (req: Request<{ id: number }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { firstname, lastname, email, dob, country, state, city, occupation, emergency_contact, permanent_address, current_address, gender, password, confirm_password } = req.body;
    const check = await getRepository(User).findOneBy({ id: id });
    if (!check) {
        return res.send({
            status: false,
            message: 'User not found',
            data: null
        })
    }

    try {
        let userData = {}
        if (password) {
            if (password !== confirm_password) {
                return res.send({
                    status: false,
                    message: 'Passwords do not match',
                    data: null
                })
            } else {
                userData = {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    dob: dob,
                    country: country,
                    state: state,
                    occupation: occupation,
                    city: city,
                    emergency_contact: emergency_contact,
                    permanent_address: permanent_address,
                    current_address: current_address,
                    gender: gender,
                    password: await bcryptjs.hash(password, 12)
                };
            }
        } else {
            userData = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                dob: dob,
                country: country,
                state: state,
                city: city,
                occupation: occupation,
                emergency_contact: emergency_contact,
                permanent_address: permanent_address,
                current_address: current_address,
                gender: gender,
            }
        }

        const result = await getRepository(User).update({ id: id }, userData);
        const uresult = await getRepository(User).findOneBy({ id: id });
        if (result) {
            return res.send({
                status: true,
                message: 'profile Updated successfully',
                data: uresult
            })
        } else {
            return res.send({
                status: false,
                message: 'Failed to update profile',
                data: null
            })
        }

    } catch (err) {
        return res.send({
            status: false,
            message: 'Failed to update profile',
            data: err
        })
    }

}

export const Updateprofilepic = async (req: Request<{ id: number }>, res: Response, next: NextFunction) => {

    const user = await getRepository(User).findOne({
        where: {
            id: req.params.id
        }
    });
}

export const searchUsersByMobile = async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
    try {
        const result = await getRepository(User).find({
            where: { mobile: req.params.id },
            select: {
                id: true,
                firstname: true,
                lastname: true,
                profile_image: true,
            }
        });
        return res.send({
            status: true,
            message: 'Users fetched successfully',
            data: result
        })
    } catch (err) {
        return res.send({
            status: false,
            message: 'Failed to fetch Users',
            data: err
        })
    }
}