import api from "../../../api/auth";

export const menuService = {
    getAll: async () => {
        const response = await api.get("/menus");
        return response.data.data;
    },
    create: async (payload) => {
        const response = await api.post("/menus", payload);
        return response.data.data;
    },
    getById: async (id) => {
        const response = await api.get(`/menus/${id}`);
        return response.data.data;
    },
    update: async (id, payload) => {
        const response = await api.put(`/menus/${id}`, payload);
        return response.data.data;
    },
};
