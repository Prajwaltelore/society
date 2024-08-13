import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import bcryptjs from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { User } from "../entity/user.entity";
import { Otp } from "../entity/otp.entity";

export const sendOtp = async (req: Request, res: Response, next: NextFunction) => {
    const { mobile } = req.body;

    const checkUser = await getRepository(User).findOne({
        where: {
            mobile: mobile,
        }
    });

    if (checkUser) {
        let digits = '0123456789';
        let otp = '';

        for (let i = 0; i < 6; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        }

        let message = 'Hi, OTP is ' + otp + ' to access your Truckbazi. For security reasons do not share this OTP with anyone -CMPLAB';
        let otpData = {
            mobile: mobile,
            otp: otp,
            message: message,
            status: true,
            deleted: false
        };

        const result = await getRepository(Otp).save(otpData);

        if (result) {
            res.send({
                status: true,
                message: 'OTP sent successfully',
                data: null
            });

        } else {
            res.send({
                status: false,
                message: 'Failed to send otp',
                data: null
            });
        }
    } else {
        res.send({
            status: false,
            message: 'User not found',
            data: null
        });
    }
}

export const verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
    const { mobile, otp, password } = req.body;

    const checkUser = await getRepository(User).findOne({
        where: {
            mobile: mobile,
        }
    });

    if (checkUser) {
        const checkOtp = await getRepository(Otp).update({ mobile: mobile, otp: otp, status: true, deleted: false }, {
            status: false,
            deleted: true
        });

        if (checkOtp) {
            const result = await getRepository(User).update({ id: checkUser.id }, {
                password: await bcryptjs.hash(password, 12)
            });

            if (result) {
                res.send({
                    status: true,
                    message: 'Password updated successfully',
                    data: null
                });
            } else {
                res.send({
                    status: false,
                    message: 'Failed to update password',
                    data: null
                })
            }
        } else {
            res.send({
                status: false,
                message: 'OTP do not found',
                data: null
            });
        }
    } else {
        res.send({
            status: false,
            message: 'User not found',
            data: null
        });
    }
}