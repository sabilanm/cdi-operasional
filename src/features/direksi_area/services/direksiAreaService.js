import { apiJSON } from "../../../api/auth";

export const direksiAreaService = {
    getAll: async () => {
        const response = await apiJSON.get("/direksi");
        return response.data.data;
    },
    create: async (payload) => {
        const response = await apiJSON.post("/direksi", payload);
        return response.data.data;
    },
    getById: async (id) => {
        const response = await apiJSON.get(`/direksi/${id}`);
        return response.data.data;
    },
    update: async (id, payload) => {
        const response = await apiJSON.put(`/direksi/${id}`, payload);
        return response.data.data;
    },
};
