import { apiForm, apiJSON } from "../../../api/auth";

export const scoringService = {
    getAll: async (searchQuery, length, page, sortField, sortDirection) => {
        const response = await apiJSON.get(
            `/admin_kpis/kpi-user?length=${length}&start=${
                page * length
            }&search=${searchQuery}`,
        );
        return response.data;
    },
    generate: async () => {
        const response = await apiJSON.post("/admin_kpis/generate");
        return response.data;
    },
    getKPI: async () => {
        const response = await apiJSON.get("/action_plans/overview");
        return response.data;
    },
    post: async (id, payload) => {
        const response = await apiForm.post(
            `/admin_kpis/kpi-user/${id}/scoring`,
            payload,
        );
        return response.data.data;
    },
    getById: async (id) => {
        const response = await apiJSON.get(`/admin_kpis/kpi-user/${id}`);
        return response.data.data;
    },
    update: async (id, payload) => {
        const response = await apiJSON.put(
            `/action_plans/master/${id}`,
            payload,
        );
        return response.data.data;
    },
};
