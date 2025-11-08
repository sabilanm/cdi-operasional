import { apiJSON } from "../../../api/auth";

export const menuService = {
    getAll: async () => {
        const response = await apiJSON.get("/menus");
        return response.data.data;
    },
    create: async (payload) => {
        const response = await apiJSON.post("/menus", payload);
        return response.data.data;
    },
    getById: async (id) => {
        const response = await apiJSON.get(`/menus/${id}`);
        return response.data.data;
    },
    update: async (id, payload) => {
        const response = await apiJSON.put(`/menus/${id}`, payload);
        return response.data.data;
    },
};
