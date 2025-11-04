import api from "../../../api/auth";

export const positionService = {
    getAll: async () => {
        const response = await api.get("/positions");
        return response.data.data;
    },
    create: async (payload) => {
        const response = await api.post("/positions", payload);
        return response.data.data;
    },
    getById: async (id) => {
        const response = await api.get(`/positions/${id}`);
        return response.data.data;
    },
    update: async (id, payload) => {
        const response = await api.put(`/positions/${id}`, payload);
        return response.data.data;
    },
};
