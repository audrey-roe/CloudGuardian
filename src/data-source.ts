import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/user.entity"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "drey",
    password: "drey",
    database: "filemtest",
    synchronize: true, //TODO remove before production
    logging: false,
    entities: [User],
    migrations: ['migration/**'],
    subscribers: [],
})
