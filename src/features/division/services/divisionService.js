import { apiJSON } from "../../../api/auth";

export const divisionService = {
    getAll: async (searchQuery, length, page, sortField, sortDirection) => {
        const response = await apiJSON.get(
            `/divisions?length=${length}&start=${
                page * length
            }&search=${searchQuery}&sortField=${sortField}&sortDirection=${sortDirection}`
        );
        return response.data;
    },
    create: async (payload) => {
        const response = await apiJSON.post("/divisions", payload);
        return response.data.data;
    },
    getById: async (id) => {
        const response = await apiJSON.get(`/divisions/${id}`);
        return response.data.data;
    },
    update: async (id, payload) => {
        const response = await apiJSON.put(`/divisions/${id}`, payload);
        return response.data.data;
    },
};
