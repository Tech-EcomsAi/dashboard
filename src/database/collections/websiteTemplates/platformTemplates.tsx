import { DB_COLLECTIONS } from "@constant/database";
import { collection, getDocs } from "@firebase/firestore";
import { firebaseClient } from "@lib/firebase/firebaseClient";
import { addDoc } from "firebase/firestore";

const COLLECTION = DB_COLLECTIONS.WEBSITE_PLATFORM_TEMPLATES;

const getCollectionRef = () => {
    const tennatId = 0;
    const storeId = 0;
    return collection(firebaseClient, `${COLLECTION}/${tennatId}/${storeId}`)
}

export const addPlatformTemplate = (templateDetails: any) => {
    return new Promise(async (res, rej) => {
        const docRef = await addDoc(getCollectionRef(), templateDetails);
        console.log("Document written with ID: ", docRef.id);
        res(docRef.id)
    })
}

export const getPlatformTemplate = () => {
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