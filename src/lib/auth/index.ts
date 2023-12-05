import { DefaultSession, NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import { Adapter } from "next-auth/adapters";
import { useSession } from "next-auth/react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from "@lib/firebase/firebaseClient";
import { getUserByEmail } from "@database/users";

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
            const dbUser: any = await getUserByEmail(user.email);
            if (dbUser?.isVerified) {
                return true;
            } else {
                return '/unauthorized'
            }
        },
        jwt: async ({ token, user, account, profile, isNewUser }: any) => {
            console.log('*** jwt start ***')
            console.log("Jwt { token, user, account, profile, isNewUser }", { token, user, account, profile, isNewUser })
            console.log('*** jwt end ***')

            if (Boolean(token && token?.email)) {
                const user: any = await getUserByEmail(token.email)
                // console.log('User found.', user);
                if (user.id) {
                    token.id = user.id;
                    token.credits = user.credits;
                }
                if (account) { }
            }
            // console.log("token", token)
            return token;
        },
        session: ({ session, token }) => {
            console.log("session { token, session, user }", { token, session })
            if (Boolean(token && token?.email)) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture;
                session.user.credits = token.credits;
                session.user.accessToken = token?.accessToken;
            }
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
                                return userCredential.user;
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
    return await getServerSession(authOptions);
}

export const getClientSideSessionUser = async () => {
    return await useSession();
}