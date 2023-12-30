import { DB_COLLECTIONS } from "@constant/database";
import { TEMPLATE_TYPES } from "@constant/templates";
import { addDoc, collection, doc, getDoc, getDocs } from "@firebase/firestore";
import { firebaseClient } from "@lib/firebase/firebaseClient";
import { getStoreId, getTenantId } from "@util/tenantSTore";
import { addTemplateConfig, getTemplateConfigById } from "../websiteTemplateConfig";

const COLLECTION = DB_COLLECTIONS.WEBSITE_TEMPLATES;

const getCollectionRef = (entityType) => {
    return collection(firebaseClient, `${COLLECTION}/${getTenantId(entityType)}/${getStoreId(entityType)}`)
}

export const addTemplate = (templateDetails: any, entityType = TEMPLATE_TYPES.PLATFORM) => {
    return new Promise(async (res, rej) => {
        const docRef = await addDoc(getCollectionRef(entityType), templateDetails);
        const templateId = docRef.id
        console.log("Document written with ID: ", templateId);
        await addTemplateConfig({ config: "" }, templateId).then(() => {
            console.log("Config updated successfully")
            res(docRef.id)
        });
    })
}

export const getTemplate = (entityType = TEMPLATE_TYPES.PLATFORM) => {
    return new Promise(async (res, rej) => {
        const querySnapshot = await getDocs(getCollectionRef(entityType));
        const templatesList = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            templatesList.push({ id: doc.id, ...doc.data() })
        });
        res(templatesList);
    })
}


export const getTemplateById = (templateId, entityType = TEMPLATE_TYPES.PLATFORM) => {
    return new Promise(async (res, rej) => {
        const ref = doc(firebaseClient, `${COLLECTION}/${getTenantId(entityType)}/${getStoreId(entityType)}`, templateId);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
            res(docSnap.data())
            console.log("Document data:", docSnap.data());
        } else {
            rej()
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }

    })
}

export const getTemplateWithConfigById = (templateId, entityType = TEMPLATE_TYPES.PLATFORM) => {
    return new Promise(async (res, rej) => {
        const ref = doc(firebaseClient, `${COLLECTION}/${getTenantId(entityType)}/${getStoreId(entityType)}`, templateId);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
            const config = getTemplateConfigById(templateId);
            res({ ...docSnap.data(), config })
            console.log("Document data:", docSnap.data());
        } else {
            rej()
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    })
}