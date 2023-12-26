// 
// refer for auth
// https://www.youtube.com/watch?v=MNm1XhDjX1s&t=4624s
// 


import { addUser, getUserByEmail } from "@database/users";
import { firebaseApp } from "@lib/firebase/firebaseClient";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        const userData = body.formData;
        //Confirm data exists
        if (!userData?.email || !userData.password) {
            return NextResponse.json(
                { message: "All fields are required." },
                { status: 400 }
            );
        }

        // check for duplicate emails
        const alreadyRegistred: any = await getUserByEmail(userData.email)

        if (alreadyRegistred?.name) {
            return NextResponse.json({ message: "Duplicate Email" }, { status: 409 });
        }

        const auth = getAuth(firebaseApp);
        createUserWithEmailAndPassword(auth, userData.email, userData.password)
            .then(async (userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log("user", userCredential)
                const userInFirebase = await addUser(userCredential)
                console.log("?userInFirebase", userInFirebase)
                return NextResponse.json({ message: "User Created.", data: user }, { status: 201 });
            })
            .catch((err) => {
                console.log(err.code);
                console.log(err.message);
                return NextResponse.json({ message: "User creation falied." }, { status: 201 });
            });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}
