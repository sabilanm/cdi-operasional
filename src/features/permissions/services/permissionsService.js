import { apiJSON } from "../../../api/auth";

export const permissionsService = {
    getAll: async (searchQuery, length, page, sortField, sortDirection) => {
        const response = await apiJSON.get(
            `/permissions?length=${length}&start=${
                page * length
            }&search=${searchQuery}&sortField=${sortField}&sortDirection=${sortDirection}`
        );
        return response.data;
    },
    create: async (payload) => {
        const response = await apiJSON.post("/permissions", payload);
        return response.data;
    },
    getById: async (id) => {
        const response = await apiJSON.get(`/permissions/${id}`);
        return response.data.data;
    },
    update: async (id, payload) => {
        const response = await apiJSON.put(`/permissions/${id}`, payload);
        return response.data.data;
    },
};
