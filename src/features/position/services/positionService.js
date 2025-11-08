import { apiJSON } from "../../../api/auth";

export const positionService = {
    getAll: async () => {
        const response = await apiJSON.get("/positions");
        return response.data.data;
    },
    create: async (payload) => {
        const response = await apiJSON.post("/positions", payload);
        return response.data.data;
    },
    getById: async (id) => {
        const response = await apiJSON.get(`/positions/${id}`);
        return response.data.data;
    },
    update: async (id, payload) => {
        const response = await apiJSON.put(`/positions/${id}`, payload);
        return response.data.data;
    },
};
