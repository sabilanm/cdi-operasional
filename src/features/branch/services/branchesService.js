import { apiJSON } from "../../../api/auth";

export const branchesService = {
    getAll: async () => {
        const response = await apiJSON.get("/branches");
        return response.data.data;
    },
    create: async (payload) => {
        const response = await apiJSON.post("/branches", payload);
        return response.data.data;
    },
    getById: async (id) => {
        const response = await apiJSON.get(`/branches/${id}`);
        return response.data.data;
    },
    update: async (id, payload) => {
        const response = await apiJSON.post(`/branches/${id}`, payload);
        return response.data.data;
    },
};
