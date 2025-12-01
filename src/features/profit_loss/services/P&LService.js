import { apiJSON, apiForm } from "../../../api/auth";

export const profitLossService = {
    getAll: async (searchQuery, length, page, sortField, sortDirection) => {
        const response = await apiJSON.get(
            `/profit_and_losses?length=${length}&start=${
                page * length
            }&search=${searchQuery}&sortField=${sortField}&sortDirection=${sortDirection}`
        );
        return response.data;
    },
    create: async (payload) => {
        const response = await apiForm.post("/profit_and_losses", payload);
        return response.data.data;
    },
    getById: async (id) => {
        const response = await apiJSON.get(`/profit_and_losses/${id}`);
        return response.data.data;
    },
    update: async (id, payload) => {
        const client = payload instanceof FormData ? apiForm : apiJSON;
        const response = await client.post(`/profit_and_losses/${id}`, payload);
        return response.data.data;
    },
    delete: async (id) => {
        const response = await apiJSON.delete(`/profit_and_losses/${id}`);
        return response.data.data;
    },
};
