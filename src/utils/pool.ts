import { Pool } from 'pg';

const pool = new Pool({
    user: "alex",
    password: "alex",
    database: "newdatabase",
    host: "localhost",
    port: 5432,
});

export default pool;
