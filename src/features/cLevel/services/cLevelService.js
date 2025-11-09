import { apiJSON } from "../../../api/auth";

export const cLevelService = {
    getAll: async (searchQuery, length, page, sortField, sortDirection) => {
        const response = await apiJSON.get(
            `/c_level?length=${length}&start=${
                page * length
            }&search=${searchQuery}&sortField=${sortField}&sortDirection=${sortDirection}`
        );
        return response.data;
    },
    create: async (payload) => {
        const response = await apiJSON.post("/c_level", payload);
        return response.data.data;
    },
    getById: async (id) => {
        const response = await apiJSON.get(`/c_level/${id}`);
        return response.data.data;
    },
    update: async (id, payload) => {
        const response = await apiJSON.put(`/c_level/${id}`, payload);
        return response.data.data;
    },
};
