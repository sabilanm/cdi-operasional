import { apiJSON, apiForm } from "../../../api/auth";

export const ketepatanService = {
    getAll: async (searchQuery, length, page, sortField, sortDirection) => {
        const response = await apiJSON.get(
            `/ketepatan_laporans?length=${length}&start=${
                page * length
            }&search=${searchQuery}&sortField=${sortField}&sortDirection=${sortDirection}`,
        );
        return response.data;
    },
    create: async (payload) => {
        const response = await apiForm.post("/ketepatan_laporans", payload);
        return response.data.data;
    },
    getById: async (id) => {
        const response = await apiJSON.get(`/ketepatan_laporans/${id}`);
        return response.data.data;
    },
    update: async (id, payload) => {
        const response = await apiJSON.post(
            `/ketepatan_laporans/${id}`,
            payload,
        );
        return response.data.data;
    },
    updateStatus: async (id, payload) => {
        const response = await apiJSON.put(
            `/ketepatan_laporans/${id}`,
            payload,
        );
        return response.data.data;
    },
    delete: async (id) => {
        const response = await apiJSON.delete(`/ketepatan_laporans/${id}`);
        return response.data.data;
    },
};
