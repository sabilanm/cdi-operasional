import { apiJSON } from "../../../api/auth";

export const permissionsService = {
    getAll: async () => {
        const response = await apiJSON.get("/permissions");
        return response.data.data;
    },
    create: async (payload) => {
        const response = await apiJSON.post("/permissions", payload);
        return response.data;
    },
    getById: async (id) => {
        const response = await apiJSON.get(`/permissions/${id}`);
        return response.data.data;
    },
    update: async (id, payload) => {
        const response = await apiJSON.put(`/permissions/${id}`, payload);
        return response.data.data;
    },
};
