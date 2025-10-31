import api from "../../../api/auth";

export const roleService = {
    getAll: async () => {
        const response = await api.get("/roles");
        return response.data.data;
    },
};
export const userDropdown = {
    getAll: async () => {
        const response = await api.get("/users/list");
        return response.data;
    },
};
export const permissionDropdown = {
    getAll: async () => {
        const response = await api.get("/permissions/list");
        return response.data;
    },
};
export const menusDropdown = {
    getAll: async () => {
        const response = await api.get("/menus/list");
        return response.data;
    },
};
