import { apiForm, apiJSON } from "../../../api/auth";

export const usersService = {
    getAll: async (searchQuery, length, page, sortField, sortDirection) => {
        const response = await apiJSON.get(
            `/users?length=${length}&start=${
                page * length
            }&search=${searchQuery}&sortField=${sortField}&sortDirection=${sortDirection}`
        );
        return response.data;
    },
    create: async (payload) => {
        const response = await apiForm.post("/users", payload);
        return response.data.data;
    },
    getById: async (id) => {
        const response = await apiJSON.get(`/users/${id}`);
        return response.data.data;
    },
    update: async (id, payload) => {
        const response = await apiJSON.post(`/users/${id}`, payload);
        return response.data.data;
    },
};
