import { DB_COLLECTIONS } from "@constant/database";
import { TEMPLATE_TYPES } from "@constant/templates";
import { firebaseClient } from "@lib/firebase/firebaseClient";
import { getStoreId, getTenantId } from "@util/tenantSTore";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const COLLECTION = DB_COLLECTIONS.WEBSITE_TEMPLATES_CONFIG;

const getCollectionRef = (templateId: any, entityType: any) => {
    return doc(firebaseClient, `${COLLECTION}/${getTenantId(entityType)}/${getStoreId(entityType)}`, templateId);
}

//referances
// https://firebase.google.com/docs/firestore/manage-data/add-data
//

export const addTemplateConfig = (templateConfigDetails: any, templateId: any, entityType = TEMPLATE_TYPES.PLATFORM) => {
    return new Promise(async (res, rej) => {
        const collectionDocRef = getCollectionRef(templateId, entityType);
        const docRef = await setDoc(collectionDocRef, templateConfigDetails);
        console.log("Document written with ID: ", docRef);
        res(docRef)
    })
}

export const updateTemplateConfig = (templateConfigDetails: any, templateId: any, entityType = TEMPLATE_TYPES.PLATFORM) => {
    return new Promise(async (res, rej) => {
        const collectionDocRef = getCollectionRef(templateId, entityType);
        const docRef = await updateDoc(collectionDocRef, templateConfigDetails);
        console.log("Document written with ID: ", docRef);
        res(docRef)
    })
}

//referances
// https://firebase.google.com/docs/firestore/query-data/get-data#get_a_document
//
export const getTemplateConfigById = (templateId: any, entityType = TEMPLATE_TYPES.PLATFORM) => {
    return new Promise(async (res, rej) => {
        const collectionDocRef = getCollectionRef(templateId, entityType);
        const docSnap = await getDoc(collectionDocRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            res(docSnap.data());
        } else {
            rej()
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    })
}