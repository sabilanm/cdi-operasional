import api from "../../../api/auth";

export const roleService = {
    getAll: async () => {
        const response = await api.get(`/roles`);
        return response.data;
    },
    create: async (payload) => {
        const response = await api.post("/roles", payload);
        return response.data.data;
    },
    getById: async (id) => {
        const response = await api.get(`/roles/${id}`);
        return response.data.data;
    },
    update: async (id, payload) => {
        const response = await api.put(`/roles/${id}`, payload);
        return response.data.data;
    },
};
