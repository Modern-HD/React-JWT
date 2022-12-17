import { Connection, MysqlError } from "mysql";
import config from "./db_config";
const mysql = require('mysql');

const con: Connection  = mysql.createConnection(config);

con.connect((err: MysqlError) => {
    if (err) throw err;
    console.log("Connected!");
})

export default con;