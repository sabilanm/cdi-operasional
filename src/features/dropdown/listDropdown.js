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
    getAll: async () => {
        const response = await api.get("/menus/list");
        return response.data;
    },
};
export const roleDropdown = {
    getAll: async (search = "", loadedOptions = [], { page }) => {
        const response = await api.get(`/roles/list?q=${search}&page=${page}`);
        return response.data; // misalnya response.data = { data: [...], hasMore: true/false }
    },
};
