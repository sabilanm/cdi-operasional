import api from "../../../api/auth";

export const cLevelService = {
    getAll: async () => {
        const response = await api.get("/c_level");
        return response.data.data;
    },
    create: async (payload) => {
        const response = await api.post("/c_level", payload);
        return response.data.data;
    },
    getById: async (id) => {
        const response = await api.get(`/c_level/${id}`);
        return response.data.data;
    },
    update: async (id, payload) => {
        const response = await api.put(`/c_level/${id}`, payload);
        return response.data.data;
    },
};
