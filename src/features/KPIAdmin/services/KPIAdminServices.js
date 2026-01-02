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
    getKPI: async () => {
        const response = await apiJSON.get("/action_plans/overview");
        return response.data;
    },
    create: async (payload) => {
        const response = await apiJSON.post("/action_plans/master", payload);
        return response.data.data;
    },
    getById: async (id) => {
        const response = await apiJSON.get(`/action_plans/master/${id}`);
        return response.data.data;
    },
    update: async (id, payload) => {
        const response = await apiJSON.put(
            `/action_plans/master/${id}`,
            payload
        );
        return response.data.data;
    },
    getPerforma: async () => {
        const response = await apiJSON.get("/action_plans/performance");
        return response.data;
    },
};
