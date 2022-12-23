import { Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import "../util/env";

export default {
    jwtVerify: (req: Request): JwtPayload | null => {
        const TOKEN_PREFIX = 'Bearer ';
        const auth = req.headers.authorization
        const token = auth?.includes(TOKEN_PREFIX)
            ? auth.split(TOKEN_PREFIX)[1]
            : auth
        try {
            if (!token) { return null }
            const jwtPayload = jwt.verify(token, process.env.SECRET_KEY!);
            if (jwtPayload && typeof jwtPayload !== 'string') {
                return jwtPayload;
            } else {
                return null;
            }
        } catch (error) {
            return null
        }
    }
} 