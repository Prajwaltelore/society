import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';
import Logger from "./services/logger";
import morganMiddleware from './config/morganMiddleware'
import fileUpload from 'express-fileupload';

import dotenv from 'dotenv';
dotenv.config();

import { routes } from './routes';

createConnection().then(() => {
    
    const app = express();

    app.use(express.json());
    app.use(cookieParser());
    app.use(morganMiddleware);
    app.use(fileUpload({
        useTempFiles : true,
        tempFileDir : '/tmp/',
        debug : true
    }));
    app.use('/public', express.static('public'))
    app.use(cors({
        origin: ['*', 'http://localhost:3000', 'http://localhost', 'https://localhost', 'http://localhost:8100', 'http://192.168.1.15:8100'],
        credentials: true
    }));

    app.get("/logger", (_, res) => {
        Logger.error("This is an error log");
        Logger.warn("This is a warn log");
        Logger.info("This is a info log");
        Logger.http("This is a http log");
        Logger.debug("This is a debug log");
        
        res.send("Hello world");
    });
    
    routes(app);

    // app.listen(process.env.PORT);
    app.listen(process.env.PORT, () => {
        Logger.debug('Server is up and running @ http://localhost:'+process.env.PORT+'');
    })
})