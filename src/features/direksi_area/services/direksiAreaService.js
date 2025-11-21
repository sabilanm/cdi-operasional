import { apiJSON } from "../../../api/auth";

export const direksiAreaService = {
    getAll: async (searchQuery, length, page, sortField, sortDirection) => {
        const response = await apiJSON.get(
            `/direksi?length=${length}&start=${
                page * length
            }&search=${searchQuery}&sortField=${sortField}&sortDirection=${sortDirection}`
        );
        return response.data;
    },
    create: async (payload) => {
        const response = await apiJSON.post("/direksi", payload);
        return response.data.data;
    },
    getById: async (id) => {
        const response = await apiJSON.get(`/direksi/${id}`);
        return response.data.data;
    },
    update: async (id, payload) => {
        const response = await apiJSON.put(`/direksi/${id}`, payload);
        return response.data.data;
    },
    delete: async (id) => {
        const response = await apiJSON.delete(`/direksi/${id}`);
        return response.data.data;
    },
};
