import { apiJSON } from "../../../api/auth";

export const menuService = {
    getAll: async (searchQuery, length, page, sortField, sortDirection) => {
        const response = await apiJSON.get(
            `/menus?length=${length}&start=${
                page * length
            }&search=${searchQuery}&sortField=${sortField}&sortDirection=${sortDirection}`
        );
        return response.data;
    },
    create: async (payload) => {
        const response = await apiJSON.post("/menus", payload);
        return response.data.data;
    },
    getById: async (id) => {
        const response = await apiJSON.get(`/menus/${id}`);
        return response.data.data;
    },
    update: async (id, payload) => {
        const response = await apiJSON.put(`/menus/${id}`, payload);
        return response.data.data;
    },
};
