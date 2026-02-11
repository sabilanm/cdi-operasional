import { apiJSON } from "../../../api/auth";

export const dashboardService = {
    getAll: async () => {
        const response = await apiJSON.get(`/dashboard`);
        return response.data;
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
    delete: async (id) => {
        const response = await apiJSON.delete(`/c_level/${id}`);
        return response.data.data;
    },
};
