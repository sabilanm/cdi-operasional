import api from "../../../api/auth";

export const positionService = {
    getAll: async () => {
        const response = await api.get("/position");
        return response.data.data;
    },
    create: async (payload) => {
        const response = await api.post("/position", payload);
        return response.data.data;
    },
    getById: async (id) => {
        const response = await api.get(`/position/${id}`);
        return response.data.data;
    },
    update: async (id, payload) => {
        const response = await api.put(`/position/${id}`, payload);
        return response.data.data;
    },
};
