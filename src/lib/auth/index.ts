import { FirestoreAdapter } from "@auth/firebase-adapter";
import { getUserByEmail } from "@database/users";
import { firebaseAuth } from "@lib/firebase/firebaseClient";
import { cert } from "firebase-admin/app";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { DefaultSession, NextAuthOptions, getServerSession } from "next-auth";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export type SESSION_TYPE = {
    user: {
        id: string;
        credits: number;
        accessToken: any;
    },
    tId: number,
    sId: number
}

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            credits: number;
            accessToken: any;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        credits: number;
    }
}

//refer https://www.youtube.com/watch?v=bkUmN9TH_hQ
export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET as string,
    callbacks: {
        signIn: async ({ user, profile, account }: any) => {
            console.log("signIn : user, profile, account }", { user, profile, account })
            let dbUser = user;
            if (!('isVerified' in dbUser)) {
                dbUser = await getUserByEmail(user.email);
            }
            if (dbUser?.isVerified) {
                return true;
            } else {
                return '/unauthorized'
            }
        },
        jwt: async ({ token, user, account, profile, isNewUser }: any) => {
            // console.log('*** jwt start ***')
            // console.log("Jwt { token, user, account, profile, isNewUser }", { token, user, account, profile, isNewUser })
            // console.log('*** jwt end ***')

            if (Boolean(token && token?.email)) {
                const dbUser: any = {}

                //uncomment this for prod
                // const dbUser: any = await getUserByEmail(token.email)
                //uncomment this for prod

                // console.log('User found.', user);
                if (dbUser.id) {
                    token.dbUser = dbUser
                }
                if (account) { }
            }
            // console.log("token", token)
            return token;
        },
        session: ({ session, token }: any) => {
            if (Boolean(token && token?.email)) {
                session.user = { ...session.user, ...token.dbUser };
                session.tId = 0;
                session.sId = 0;
            }
            // console.log("session { token, session, user }", { token, session })
            return session;
        }
    },
    pages: {
        signIn: '/signin'
    },
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        //https://medium.com/ascentic-technology/authentication-with-next-js-13-and-next-auth-9c69d55d6bfd

        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials): Promise<any> {
                const dbUser: any = await getUserByEmail((credentials as any).email);
                if (Boolean(dbUser?.isVerified)) {
                    return await signInWithEmailAndPassword(firebaseAuth, (credentials as any).email || '', (credentials as any).password || '')
                        .then(userCredential => {
                            console.log("signInWithEmailAndPassword userCredential.user", userCredential.user)
                            if (userCredential.user) {
                                return { ...userCredential.user, ...dbUser };
                            }
                            return null;
                        })
                        .catch((error) => {
                            console.log("CredentialsProvider error", error);
                            throw new Error(error)
                        });
                } else {
                    throw new Error("email-not-registred")
                }
            }
        })
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
    if (typeof window === 'undefined') {
        return await getServerSession(authOptions);
    } else {
        return await null;
    }
}