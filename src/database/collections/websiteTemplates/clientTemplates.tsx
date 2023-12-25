import { DB_COLLECTIONS } from "@constant/database";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { firebaseClient } from "@lib/firebase/firebaseClient";
import { addDoc, doc, getDoc } from "firebase/firestore";

const COLLECTION = DB_COLLECTIONS.WEBSITE_CLIENT_TEMPLATES;

const getCollectionRef = () => {
    const tennatId = 1;
    const storeId = 1;
    return collection(firebaseClient, `${COLLECTION}/${tennatId}/${storeId}`)
}

export const addClientTemplate = (templateDetails: any) => {
    return new Promise(async (res, rej) => {
        const docRef = await addDoc(getCollectionRef(), templateDetails);
        console.log("Document written with ID: ", docRef.id);
        res(docRef.id)
    })
}

export const getClientTemplate = () => {
    return new Promise(async (res, rej) => {
        const querySnapshot = await getDocs(getCollectionRef());
        const templatesList = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            templatesList.push({ id: doc.id, ...doc.data() })
        });
        res(templatesList);
    })
}