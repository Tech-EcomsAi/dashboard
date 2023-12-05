import { DB_COLLECTIONS } from "@constant/database";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { firebaseClient } from "@lib/firebase/firebaseClient";

const COLLECTION = DB_COLLECTIONS.USERS;

export const getUserByEmail = (email: string) => {
    return new Promise(async (res, rej) => {
        const q = query(collection(firebaseClient, COLLECTION), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            console.log('User not found.');
            res({});
        } else {
            querySnapshot.forEach(doc => res({ ...doc.data(), id: doc.id }));
        }
    })
}

export const addUser = (cred: any) => {
    return new Promise(async (res, rej) => {
        // const q = query(collection(firebaseClient, COLLECTION), where("email", "==", email));
        // const querySnapshot = await getDocs(q);
        // if (querySnapshot.empty) {
        //     console.log('User not found.');
        //     res({});
        // } else {
        //     querySnapshot.forEach(doc => res({ ...doc.data(), id: doc.id }));
        // }
    })
}