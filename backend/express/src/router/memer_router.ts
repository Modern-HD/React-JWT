import { NextFunction, query, Request, Response, Router } from "express";
import { Connection, MysqlError, OkPacket } from "mysql";
import Member from "../interface/Member";
import con from "../orm/db_connection";
import { JwtPayload, sign } from "jsonwebtoken";
import "../util/env";
import auth_util from "../auth/auth_util";
import AuthResponse from "../interface/AuthResponse";

const router = Router();
const mysql: Connection = con;

router.get("/api/member", (req: Request, res: Response, next: NextFunction) => {
    console.log("member router > /member > GET");
    const user: JwtPayload | null = auth_util.jwtVerify(req);
    if (!user) { return res.send({mno: undefined, body: undefined}); }
    const query = "SELECT a.mno, a.email, a.pwd, a.nick_name FROM `member` a";
    mysql.query(query, (err: MysqlError, result: Member[]) => {
        if (err) return next(err);
        const authRes: AuthResponse<Member[]> = {
            mno: user.result.mno,
            body: result
        }
        return res.send(authRes);
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
    mysql.query(query, [body.email, body.pwd], (err: MysqlError | null, result: Member[]) => {
        if (err) return next(err);
        if (result[0]) {
            const jsontoken = sign({ result: result[0] }
            , process.env.SECRET_KEY!, {
                expiresIn: "1h"
            });
            return res.send({
                member: result[0],
                jwt: {
                    success: 1,
                    message: "로그인 성공",
                    token: jsontoken
                }
            });
        } else {
            return res.send({
                success: 0,
                message: "아이디 혹은 비밀번호가 일치하지 않습니다."
            })
        }
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