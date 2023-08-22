import "reflect-metadata"
import { DataSource } from "typeorm"
import { User, Admin } from "./entity/User"
import { UnsafeFile } from "./entity/UnsafeFile"
import { File } from "./entity/File"
import { Folder } from "./entity/Folder"
import { FileHistory } from "./entity/FileHistory"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "drey",
    password: "drey",
    database: "filemtest",
    synchronize: true, //TODO remove before production
    logging: false,
    entities: [Admin, User, UnsafeFile, File, Folder, FileHistory],
    migrations: ['migration/**'],
    subscribers: [],
})
