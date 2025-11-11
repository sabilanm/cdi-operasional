import { apiJSON } from "../../../api/auth";

export const positionService = {
    getAll: async (searchQuery, length, page, sortField, sortDirection) => {
        const response = await apiJSON.get(
            `/positions?length=${length}&start=${
                page * length
            }&search=${searchQuery}&sortField=${sortField}&sortDirection=${sortDirection}`
        );
        return response.data;
    },
    create: async (payload) => {
        const response = await apiJSON.post("/positions", payload);
        return response.data.data;
    },
    getById: async (id) => {
        const response = await apiJSON.get(`/positions/${id}`);
        return response.data.data;
    },
    update: async (id, payload) => {
        const response = await apiJSON.put(`/positions/${id}`, payload);
        return response.data.data;
    },
};
