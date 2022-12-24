import { Router, Request, Response, NextFunction } from "express";
import { JwtPayload, sign, TokenExpiredError } from "jsonwebtoken";
import auth_util from "../auth/auth_util";

const router = Router();

router.get('/api/refresh/token', (req: Request, res: Response, next: NextFunction) => {
    console.log("/api/refresh/token");
    try {
        const user: JwtPayload | TokenExpiredError | null = auth_util.refreshVerify(req);
        if (user instanceof TokenExpiredError || user == null) { 
            return res.cookie("refreshToken", "", {
                secure: false,
                httpOnly: true
            })
        }
        const accessToken = sign({ result: user.result }
            , process.env.ACCESS_SECRET_KEY!, {
                expiresIn: "1m"
            });
        return res.send({accessToken: accessToken});
    } catch (err) {
        return next(err);
    }

})

export default router;