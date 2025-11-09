import { apiJSON } from "../../../api/auth";

export const areaService = {
    getAll: async (searchQuery, length, page, sortField, sortDirection) => {
        const response = await apiJSON.get(
            `/areas?length=${length}&start=${
                page * length
            }&search=${searchQuery}&sortField=${sortField}&sortDirection=${sortDirection}`
        );
        return response.data;
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
