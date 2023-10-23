import { NextApiRequest, NextApiResponse } from 'next'
import jwt, { sign } from "jsonwebtoken";
// import { serialize } from "cookie";
import { USER_COOKIE_KEY } from '@/constants/user';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    console.log("inside api/login", req.body)
    if (!req.body) {
        return res.status(403).json({ id: 'credentials', message: 'Invalid credentials' });
    }
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(403).json({ id: 'credentials', message: 'Invalid credentials' });
    }
    // Check in the database
    // if a user with this username
    // and password exists

    const users = [
        { username: 'abc', password: 'abc' },
        { username: 'gmd', password: 'gmd' },
        { username: 'pqr', password: 'pqr' },
        { username: 'admin', password: 'admin' },
    ]
    const userDetails = users.find((u) => u.username == username) || null;
    if (!userDetails) return res.status(403).json({ id: "username", message: 'Invalid username' });
    if (userDetails.password != password) return res.status(403).json({ id: "password", message: 'Invalid password' });
    // if (userDetails) {
    //     const token = sign({
    //         exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 1, // 1 day
    //         username,
    //         password,
    //     }, process.env.SECRET);

    //     const serialised = serialize(USER_COOKIE_KEY, token, {//gmd_u = growmedigitally user
    //         // httpOnly: true,
    //         // secure: process.env.NODE_ENV !== "development",
    //         sameSite: "strict",
    //         maxAge: 60 * 60 * 24 * 1,
    //         path: "/",
    //     });
    //     res.setHeader("Set-Cookie", serialised);
    //     res.status(200).json({ username });
    //     return;
    // }
}