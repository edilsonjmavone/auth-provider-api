import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY! || "94bewm93hfosbr8r23qd";
const secretRefreshKey = process.env.SECRET_REFRESH_KEY! || "eregvvb34g3b2q2r23qd";

export type jwtPayloadType = {
    id: number;
    email: string;
    name: string;
    sessID?: string | number
}

//verify the Auth token
export const verify = (req: Request, res: Response, next: NextFunction) => {
    const { AuthToken } = req.cookies;
    try {
        if (AuthToken) {
            const verified = jwt.verify(AuthToken, secretKey);
            res.locals.tokenData = {
                id: (<jwtPayloadType>verified).id,
                email: (<jwtPayloadType>verified).email,
                name: (<jwtPayloadType>verified).name
            };
            next();
        } else {
            return res
                .status(403)
                .json({ error: { message: "Forbiden \n No credencials" } });
        }
    } catch (error) {
        return res
            .status(403)
            .json({ error: { message: "Forbiden \n Invalid crendencials" } });
    }
};

// verify the refresh token
export const verifyRefresh = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { RefreshToken } = req.cookies;
    try {
        if (RefreshToken) {
            const verified = jwt.verify(RefreshToken, secretRefreshKey);
            res.locals.refreshTokenData = {
                id: (<jwtPayloadType>verified).id,
                email: (<jwtPayloadType>verified).email,
                name: (<jwtPayloadType>verified).name
            };
            next();
        } else {
            return res.status(400).json({ error: { message: "Forbiden" } });
        }
    } catch (error) {
        return res.status(400).json({ error: { message: "Forbiden" } });
    }
};

// return the refresh token data
export const getRefreshTokenData = (token: string) => {
    try {
        return jwt.verify(token, secretRefreshKey);
    } catch (error) { }
};

// reaturns the auth token
export const getToken = (payload: jwtPayloadType) => {
    const token = jwt.sign(payload, secretKey, { expiresIn: "24h" });
    return token;
};

// reaturns the refresh token
export const getRefreshToken = (payload: jwtPayloadType) => {
    const token = jwt.sign(payload, secretRefreshKey);
    return token;
};

