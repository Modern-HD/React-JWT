import { Request, Response } from "express";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import "../util/env";

export default {
    refreshVerify: (req: Request): TokenExpiredError | JwtPayload | null => {
        try {
            const token = req.cookies.refreshToken;
            const jwtPayload = jwt.verify(token, process.env.REFRESH_SECRET_KEY!);
            if (jwtPayload && typeof jwtPayload !== 'string') {
                return jwtPayload;
            } else {
                return null;
            }
        } catch (err) {
            if (err instanceof TokenExpiredError) {return err;}
            return null;
        }
    }
    , accessVerify: (req: Request): TokenExpiredError | JwtPayload | null => {
        const TOKEN_PREFIX = 'Bearer ';
        const auth = req.headers.authorization
        const token = auth?.includes(TOKEN_PREFIX)
            ? auth.split(TOKEN_PREFIX)[1]
            : auth
        try {
            if (!token) { return null }
            const jwtPayload = jwt.verify(token, process.env.ACCESS_SECRET_KEY!);
            if (jwtPayload && typeof jwtPayload !== 'string') {
                return jwtPayload;
            } else {
                return null;
            }
        } catch (err) {
            if (err instanceof TokenExpiredError) {return err;}
            return null
        }
    }
} 