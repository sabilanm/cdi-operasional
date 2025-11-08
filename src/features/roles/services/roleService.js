import { apiJSON } from "../../../api/auth";

export const roleService = {
    getAll: async () => {
        const response = await apiJSON.get(`/roles`);
        return response.data;
    },
    create: async (payload) => {
        const response = await apiJSON.post("/roles", payload);
        return response.data.data;
    },
    getById: async (id) => {
        const response = await apiJSON.get(`/roles/${id}`);
        return response.data.data;
    },
    update: async (id, payload) => {
        const response = await apiJSON.put(`/roles/${id}`, payload);
        return response.data.data;
    },
};
