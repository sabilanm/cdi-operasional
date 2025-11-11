import { apiForm, apiJSON } from "../../../api/auth";

export const TargetPelunasanService = {
    getAll: async (searchQuery, length, page, sortField, sortDirection) => {
        const response = await apiJSON.get(
            `/target_pelunasan?length=${length}&start=${
                page * length
            }&search=${searchQuery}&sortField=${sortField}&sortDirection=${sortDirection}`
        );
        return response.data;
    },
    create: async (payload) => {
        const response = await apiForm.post("/target_pelunasan", payload);
        return response.data.data;
    },
    getById: async (id) => {
        const response = await apiJSON.get(`/target_pelunasan/${id}`);
        return response.data.data;
    },
    update: async (id, payload) => {
        const response = await apiJSON.post(`/target_pelunasan/${id}`, payload);
        return response.data.data;
    },
};
