import { NextFunction, Request, Response, Router } from "express";
import { Connection, MysqlError, OkPacket } from "mysql";
import Member from "../interface/Member";
import con from "../orm/db_connection";
import { JwtPayload, sign, TokenExpiredError } from "jsonwebtoken";
import "../util/env";
import auth_util from "../auth/auth_util";
import AuthResponse from "../interface/AuthResponse";

const router = Router();
const mysql: Connection = con;

// List
router.get("/api/member", (req: Request, res: Response, next: NextFunction) => {
    console.log("member router > /member > GET");
    const user: JwtPayload | TokenExpiredError | null = auth_util.accessVerify(req);
    if (user instanceof TokenExpiredError) { return res.status(401).send("TokenExpiredError") }
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

// Detail
router.get("/api/member/:mno", (req: Request, res: Response, next: NextFunction) => {
    console.log("memer router > /member/mno > GET");
    const { mno } = req.params;
    const query = "SELECT a.mno, a.email, a.pwd, a.nick_name, a.create_at, a.update_at FROM `member` a WHERE mno = ?";
    mysql.query(query, mno, (err: MysqlError | null, result: Member[]) => {
        if (err) return next(err);
        return res.send(result[0]);
    })
})

// Login
router.post("/api/member/login", (req: Request, res: Response, next: NextFunction) => {
    console.log("member router > /member/login > POST");
    const body: Member = req.body;
    const query = "SELECT a.mno, a.email, a.nick_name, a.create_at FROM `member` a\n" +
                    "WHERE a.email = ? AND pwd = ?";
    mysql.query(query, [body.email, body.pwd], (err: MysqlError | null, result: Member[]) => {
        if (err) return next(err);
        try {
            if (result[0]) {
                const accessToken = sign({ result: result[0] }
                , process.env.ACCESS_SECRET_KEY!, {
                    expiresIn: "1m"
                });
                const refreshToken = sign({ result: result[0]}
                , process.env.REFRESH_SECRET_KEY!, {
                    expiresIn: "24h"
                })

                res.cookie("refreshToken", refreshToken, {
                    secure: false,
                    httpOnly: true
                })

                return res.send({
                    member: result[0],
                    jwt: {
                        success: 1,
                        message: "로그인 성공",
                        token: accessToken,
                        body: result[0]
                    }
                });

            } else {
                return res.send({
                    jwt: {
                        success: 0,
                        message: "아이디 혹은 비밀번호가 일치하지 않습니다."
                    }
                })
            }
        } catch (err) {
            next(err);
        }
    })
})

// Register
router.post("/api/member", (req: Request, res: Response, next: NextFunction) => {
    console.log("member router > /member > POST");
    const body: Member = req.body;
    const query = "INSERT INTO member(email, pwd, nick_name) VALUES(?, ?, ?)";
    mysql.query(query, [body.email, body.pwd, body.nick_name] ,(err: MysqlError | null, result: OkPacket) => {
        if (err) return next(err);
        return res.send(`${result.insertId}`);
    })
})

// Modify
router.put("/api/member/:mno", (req: Request, res: Response, next: NextFunction) => {
    console.log("member router > /member > PUT");
    const body: Member = req.body;
    const query = "UPDATE `member` SET nick_name = ?, pwd = ? WHERE mno = ?";
    mysql.query(query, [body.nick_name, body.pwd, body.mno], (err: MysqlError | null, result: OkPacket) => {
        if (err) return next(err);
        return res.send("1");
    })
})

// Remove
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