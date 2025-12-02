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
        const client = payload instanceof FormData ? apiForm : apiJSON;
        const response = await client.post(`/users/${id}`, payload);
        return response.data.data;
    },
    delete: async (id) => {
        const response = await apiJSON.delete(`/users/${id}`);
        return response.data.data;
    },
    downloadTemplate: async () => {
        const response = await apiJSON.get("/excels/download-template", {
            responseType: "blob",
        });
        return response;
    },
    uploadExcel: async (formData) => {
        const response = await apiForm.post("/excels/imports", formData);
        return response.data;
    },
};
