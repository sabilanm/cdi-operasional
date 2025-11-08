import { apiJSON } from "../../../api/auth";

export const areaService = {
    getAll: async () => {
        const response = await apiJSON.get("/areas");
        return response.data.data;
    },
    create: async (payload) => {
        const response = await apiJSON.post("/areas", payload);
        return response.data.data;
    },
    getById: async (id) => {
        const response = await apiJSON.get(`/areas/${id}`);
        return response.data.data;
    },
    update: async (id, payload) => {
        const response = await apiJSON.put(`/areas/${id}`, payload);
        return response.data.data;
    },
};
