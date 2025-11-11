import { apiJSON } from "../../../api/auth";

export const branchesService = {
    getAll: async (searchQuery, length, page, sortField, sortDirection) => {
        const response = await apiJSON.get(
            `/branches?length=${length}&start=${
                page * length
            }&search=${searchQuery}&sortField=${sortField}&sortDirection=${sortDirection}`
        );
        return response.data;
    },
    create: async (payload) => {
        const response = await apiJSON.post("/branches", payload);
        return response.data.data;
    },
    getById: async (id) => {
        const response = await apiJSON.get(`/branches/${id}`);
        return response.data.data;
    },
    update: async (id, payload) => {
        const response = await apiJSON.post(`/branches/${id}`, payload);
        return response.data.data;
    },
};
