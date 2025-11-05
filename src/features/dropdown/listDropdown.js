import api from "../../api/auth";

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
    getAll: async (search = "", loadedOptions = [], { page }) => {
        const response = await api.get(`/menus/list?q=${search}&page=${page}`);
        return response.data;
    },
};
export const branchDropdown = {
    getAll: async () => {
        const response = await api.get("/branches/list");
        return response.data.data;
    },
};
export const roleDropdown = {
    getAll: async (search = "", loadedOptions = [], { page }) => {
        const response = await api.get(`/roles/list?q=${search}&page=${page}`);
        return response.data;
    },
};
export const areasDropdown = {
    getAll: async () => {
        const response = await api.get("/areas");
        return response.data.data;
    },
};
