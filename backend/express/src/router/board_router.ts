import { Router, Request, Response, NextFunction } from "express";
import { Connection, MysqlError, OkPacket } from "mysql";
import Board from "../interface/Board";
import con from "../orm/db_connection";

const router = Router();
const mysql: Connection = con;

router.get("/api/board", (req: Request, res: Response, next: NextFunction) => {
    console.log("board router > /board > GET");
    const query = "SELECT a.bno, a.title, a.writer, a.create_at, a.update_at FROM board a";
    mysql.query(query, (err: MysqlError, result: Board[]) => {
        if (err) next(err);
        return res.send(result);
    })
})

router.get("/api/board/:bno", (req: Request, res: Response, next: NextFunction) => {
    console.log("board router > /board/bno > GET");
    const {bno} = req.params;
    const query = "SELECT * FROM board a WHERE a.bno = ?";
    mysql.query(query, bno, (err: MysqlError | null, result: Board[]) => {
        if (err) return next(err);
        return res.send(result[0]);
    })
})

router.post("/api/board/:mno", (req: Request, res: Response, next: NextFunction) => {
    console.log("board router > /board/mno > POST");
    const body: Board = req.body;
    const query = "INSERT INTO board(mno, title, content, writer) VALUES (?, ?, ?, ?)"
    mysql.query(query, [body.mno, body.title, body.content, body.writer], (err: MysqlError | null, result: OkPacket) => {
        if (err) return next(err);
        return res.send(result.insertId.toString());
    })
})

router.put("/api/board/:bno", (req: Request, res: Response, next: NextFunction) => {
    console.log("board router > board/bno > PUT");
    const body: Board = req.body;
    const query = "UPDATE board SET title = ?, content = ? WHERE bno = ?";
    mysql.query(query, [body.title, body.content, body.bno], (err: MysqlError | null, result: OkPacket) => {
        if (err) return next(err);
        return res.send("1");
    })
})

router.delete("/api/board/:bno", (req: Request, res: Response, next: NextFunction) => {
    console.log("board router > board/bno > DELETE");
    const {bno} = req.params;
    const query = "DELETE FROM board WHERE bno = ?";
    mysql.query(query, bno, (err: MysqlError | null, result: OkPacket) => {
        if (err) return next(err);
        return res.send("1");
    })
})

export default router;