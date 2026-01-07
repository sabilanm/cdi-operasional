import { apiJSON } from "../../../api/auth";

export const KPIAdminService = {
    getAll: async (searchQuery, length, page, sortField, sortDirection) => {
        const response = await apiJSON.get(
            `/admin_kpis?length=${length}&start=${
                page * length
            }&search=${searchQuery}&sortField=${sortField}&sortDirection=${sortDirection}`
        );
        return response.data;
    },
    create: async (payload) => {
        const response = await apiJSON.post("/admin_kpis", payload);
        return response.data.data;
    },
    getById: async (id) => {
        const response = await apiJSON.get(`/admin_kpis/${id}`);
        return response.data.data;
    },
    update: async (id, payload) => {
        const response = await apiJSON.put(`/admin_kpis/${id}`, payload);
        return response.data.data;
    },
};
