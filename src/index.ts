import express from "express";
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import session from 'express-session';
import connectRedis from 'connect-redis'; 
import { createClient } from 'redis';
import logger from "./utils/logger";
// import setupRedisMiddleware from "./middleware/redis.middleware";
import dotenv from 'dotenv';

AppDataSource.initialize().then(async () => {
    dotenv.config();
    
    const app = express()
    app.use(express.json());
    const redisClient = createClient({legacyMode:true})
    const RedisStore = connectRedis(session);
    redisClient.connect() .catch((err) => {
        logger.info('Error connecting to Redis:', err);
    });

    // app.use(setupRedisMiddleware);

    app.use(session({
        store: new RedisStore({ 
            client: redisClient }),
        secret: process.env.sessionSecret,
        resave: false,
        saveUninitialized: false,
        cookie:{
            secure: false,//if true only transmit over https TODO change to true for porduction
            httpOnly: false,
            maxAge: 1000*60*10 //setting the session age in millisec (10mins)
        }
    })); 

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    // start express server
    app.listen(3001)
 
    logger.info("Express server has started on port 3001. Open http://localhost:3001/ to see results")

}).catch(error => logger.error(error))
