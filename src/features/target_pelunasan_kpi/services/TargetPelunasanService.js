import { apiJSON } from "../../../api/auth";

export const pelunasanService = {
    getAll: async (searchQuery, length, page, sortField, sortDirection) => {
        const response = await apiJSON.get(
            `/target_pelunasan/kpi?length=${length}&start=${
                page * length
            }&search=${searchQuery}&sortField=${sortField}&sortDirection=${sortDirection}`
        );
        return response.data;
    },
    get: async () => {
        const response = await apiJSON.get(`/target_pelunasan/kpi/overview`);
        return response.data.data;
    },
    getList: async () => {
        const response = await apiJSON.get(`/target_pelunasan/kpi/list`);
        return response.data;
    },
    create: async (payload) => {
        const response = await apiJSON.post("/target_pelunasan/kpi", payload);
        return response.data.data;
    },
    getById: async (id) => {
        const response = await apiJSON.get(`/target_pelunasan/kpi/${id}`);
        return response.data.data;
    },
    update: async (id, payload) => {
        const response = await apiJSON.put(
            `/target_pelunasan/kpi/${id}`,
            payload
        );
        return response.data.data;
    },
    delete: async (id) => {
        const response = await apiJSON.delete(`/target_pelunasan/kpi/${id}`);
        return response.data.data;
    },
};
