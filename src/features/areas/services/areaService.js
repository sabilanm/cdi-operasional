import api from "../../../api/auth";

export const areaService = {
    getAll: async () => {
        const response = await api.get("/areas");
        return response.data.data;
    },
    create: async (payload) => {
        const response = await api.post("/areas", payload);
        return response.data.data;
    },
    getById: async (id) => {
        const response = await api.get(`/areas/${id}`);
        return response.data.data;
    },
    update: async (id, payload) => {
        const response = await api.put(`/areas/${id}`, payload);
        return response.data.data;
    },
};
