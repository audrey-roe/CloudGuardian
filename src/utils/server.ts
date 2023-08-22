import express from "express";
// import setupRedisMiddleware from "./middleware/redis.middleware";
import dotenv from 'dotenv';
import session from 'express-session';
import connectRedis from 'connect-redis'; 
import { createClient } from 'redis';
import logger from "../utils/logger";

function createServer() {
    dotenv.config();

    // create express app
    const app = express();
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
}

export default createServer