import { NextApiRequest, NextApiResponse } from 'next'
// import jwt, { sign } from "jsonwebtoken";
// import { serialize } from "cookie";
import { USER_COOKIE_KEY } from '@/constants/user';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    // const { cookies } = req;
    // const token = cookies[USER_COOKIE_KEY || ''];
    // if (!token) {
    //     // return res.redirect(307, '/login');
    //     return res.status(403).json({ message: "Invalid token!" });
    // } else {
    //     const { username, password } = jwt.decode(token);
    //     const users = [
    //         { username: 'abc', password: 'abc' },
    //         { username: 'growme', password: 'growme' },
    //         { username: 'pqr', password: 'pqr' },
    //         { username: 'admin', password: 'admin' },
    //     ]
    //     const userDetails = users.find((u) => u.username == username && u.password == password) || null;
    //     if (userDetails) {
    //         const token = sign({
    //             exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
    //             username,
    //             password,
    //         }, process.env.SECRET);

    //         const serialised = serialize(USER_COOKIE_KEY, token, {//gmd_u = growmedigitally user
    //             // httpOnly: true,
    //             // secure: process.env.NODE_ENV !== "development",
    //             sameSite: "strict",
    //             maxAge: 60 * 60 * 24 * 30,
    //             path: "/",
    //         });

    //         // res.setHeader("Set-Cookie", serialised);
    return res.status(200).json({ username: "" });
    //     } else {
    //         const serialised = serialize(USER_COOKIE_KEY, null, {
    //             // httpOnly: true,
    //             // secure: process.env.NODE_ENV !== "development",
    //             sameSite: "strict",
    //             maxAge: -1,
    //             path: "/",
    //         });
    //         // res.setHeader("Set-Cookie", serialised);
    //         return res.status(403).json({ message: "Invalid token!" });
    //     }
    // }
}