import { NextFunction, query, Request, Response, Router } from "express";
import { Connection, MysqlError, OkPacket } from "mysql";
import Member from "../interface/Member";
import con from "../orm/db_connection";

const router = Router();
const mysql: Connection = con;

router.get("/api/member", (req: Request, res: Response, next: NextFunction) => {
    console.log("member router > /member > GET");
    const query = "SELECT a.mno, a.email, a.pwd, a.nick_name FROM `member` a";
    mysql.query(query, (err: MysqlError, result: Member[]) => {
        if (err) return next(err);
        return res.send(result);
    })
})

router.get("/api/member/:mno", (req: Request, res: Response, next: NextFunction) => {
    console.log("memer router > /member/mno > GET");
    const { mno } = req.params;
    const query = "SELECT a.mno, a.email, a.pwd, a.nick_name, a.create_at, a.update_at FROM `member` a WHERE mno = ?";
    mysql.query(query, mno, (err: MysqlError | null, result: Member[]) => {
        if (err) return next(err);
        return res.send(result[0]);
    })
})

router.post("/api/member/login", (req: Request, res: Response, next: NextFunction) => {
    console.log("member router > /member/login > POST");
    const body: Member = req.body;
    const query = "SELECT a.mno, a.email, a.nick_name, a.create_at FROM `member` a\n" +
                    "WHERE a.email = ? AND pwd = ?";
    mysql.query(query, [body.email, body.pwd], (err: MysqlError | null, result: Member) => {
        if (err) return next(err);
        return res.send(result);
    })
})

router.post("/api/member", (req: Request, res: Response, next: NextFunction) => {
    console.log("member router > /member > POST");
    const body: Member = req.body;
    const query = "INSERT INTO member(email, pwd, nick_name) VALUES(?, ?, ?)";
    mysql.query(query, [body.email, body.pwd, body.nick_name] ,(err: MysqlError | null, result: OkPacket) => {
        if (err) return next(err);
        return res.send(`${result.insertId}`);
    })
})

router.put("/api/member/:mno", (req: Request, res: Response, next: NextFunction) => {
    console.log("member router > /member > PUT");
    const body: Member = req.body;
    const query = "UPDATE `member` SET nick_name = ?, pwd = ? WHERE mno = ?";
    mysql.query(query, [body.nick_name, body.pwd, body.mno], (err: MysqlError | null, result: OkPacket) => {
        if (err) return next(err);
        return res.send("1");
    })
})

router.delete("/api/member/:mno", (req: Request, res: Response, next: NextFunction) => {
    console.log("member router > /member > DELETE");
    const { mno } = req.params;
    const query = "DELETE FROM `member` WHERE mno = ?";
    mysql.query(query, mno, (err: MysqlError | null, result: OkPacket) => {
        if (err) return next(err);
        return res.send("1");
    })
})

export default router;