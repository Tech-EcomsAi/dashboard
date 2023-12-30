import { reduxStore } from "@reduxStore/index";

const ACCESSING_USER_ENTITY = {
    PLATFORM: "platform",
    CLIENT: "client",
}
export const getTenantId = (type = ACCESSING_USER_ENTITY.CLIENT) => {
    let tenantId = 0;
    if (type == ACCESSING_USER_ENTITY.CLIENT) {
        tenantId = reduxStore.getState()?.tenantId
    }
    return tenantId;
}

export const getStoreId = (type = ACCESSING_USER_ENTITY.CLIENT) => {
    let storeId = 0;
    if (type == ACCESSING_USER_ENTITY.CLIENT) {
        storeId = reduxStore.getState()?.storeId
    }
    return storeId;
}