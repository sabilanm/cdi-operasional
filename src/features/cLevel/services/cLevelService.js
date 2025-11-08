import { apiJSON } from "../../../api/auth";

export const cLevelService = {
    getAll: async () => {
        const response = await apiJSON.get("/c_level");
        return response.data.data;
    },
    create: async (payload) => {
        const response = await apiJSON.post("/c_level", payload);
        return response.data.data;
    },
    getById: async (id) => {
        const response = await apiJSON.get(`/c_level/${id}`);
        return response.data.data;
    },
    update: async (id, payload) => {
        const response = await apiJSON.put(`/c_level/${id}`, payload);
        return response.data.data;
    },
};
