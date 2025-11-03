import api from "../../../api/auth";

export const permissionsService = {
    getAll: async () => {
        const response = await api.get("/permissions");
        return response.data.data;
    },
    create: async (payload) => {
        const response = await api.post("/permissions", payload);
        return response.data.data;
    },
    getById: async (id) => {
        const response = await api.get(`/permissions/${id}`);
        return response.data.data;
    },
    update: async (id, payload) => {
        const response = await api.put(`/permissions/${id}`, payload);
        return response.data.data;
    },
};
