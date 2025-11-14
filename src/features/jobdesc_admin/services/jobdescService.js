// src/features/jobdesc_admin/services/jobdescService.js
import { apiJSON } from "../../../api/auth";

export const jobdesService = {
    getAll: async (page = 1, length = 10, filters = {}) => {
        const start = (page - 1) * length;
        const params = { start, length };

        if (filters.position) params.position = filters.position;
        if (filters.type) params.type = filters.type;
        if (filters.methode) params.methode = filters.methode;

        const response = await apiJSON.get("/jobdescs", { params });
        return response.data;
    },

    create: async (payload) => {
        const response = await apiJSON.post("/jobdescs", payload);
        return response.data.data;
    },

    getById: async (id) => {
        const response = await apiJSON.get(`/jobdescs/${id}`);
        return response.data.data;
    },

    update: async (id, payload) => {
        const response = await apiJSON.put(`/jobdescs/${id}`, payload);
        return response.data.data;
    },
};
