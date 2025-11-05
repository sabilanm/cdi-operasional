import api from "../../../api/auth";

export const divisionService = {
    getAll: async () => {
        const response = await api.get("/divisions");
        return response.data.data;
    },
    create: async (payload) => {
        const response = await api.post("/divisions", payload);
        return response.data.data;
    },
    getById: async (id) => {
        const response = await api.get(`/divisions/${id}`);
        return response.data.data;
    },
    update: async (id, payload) => {
        const response = await api.put(`/divisions/${id}`, payload);
        return response.data.data;
    },
};
