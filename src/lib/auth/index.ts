import { DefaultSession, NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import { Adapter } from "next-auth/adapters";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { useSession } from "next-auth/react";
import { getUserByEmail } from "@database/user";
import CredentialsProvider from "next-auth/providers/credentials"
import { getUserByCredentials } from "@lib/internalApi/user";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            credits: number;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        credits: number;
    }
}

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET as string,
    callbacks: {
        jwt: async ({ token }: any) => {
            if (token.email) {
                const user: any = await getUserByEmail(token.email)
                // console.log('User found.', user);
                if (user.id) {
                    token.id = user.id;
                    token.credits = user.credits;
                } else {
                    return token;
                }
            }
            // console.log("token", token)
            return token;
        },
        session: ({ session, token }) => {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture;
                session.user.credits = token.credits;
            }
            return session;
        },
    },
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        //https://medium.com/ascentic-technology/authentication-with-next-js-13-and-next-auth-9c69d55d6bfd
        // CredentialsProvider({
        //     name: 'Credentials',
        //     credentials: {
        //         email: { label: "Email", type: "text" },
        //         password: { label: "Password", type: "password" }
        //     },
        //     async authorize(credentials, req) {
        //         if (typeof credentials !== "undefined") {
        //             getUserByCredentials({ username: credentials.email, password: credentials.password })
        //                 .then((data) => {
        //                     if (data) return data;
        //                     else return null;
        //                 })
        //                 .catch((err) => {
        //                     return null;
        //                 });
        //         } else {
        //             return null
        //         }
        //     }
        // })
    ],
    adapter: FirestoreAdapter({
        credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
        }),
    }) as Adapter
}

export const getServerSideSessionUser = async () => {
    return await getServerSession(authOptions);
}

export const getClientSideSessionUser = async () => {
    return await useSession();
}