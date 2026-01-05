import { apiJSON } from "../../../api/auth";

export const scoringService = {
    getAll: async () => {
        const response = await apiJSON.get("/admin_kpis/kpi-user");
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
    create: async (payload) => {
        const response = await apiJSON.post("/action_plans/master", payload);
        return response.data.data;
    },
    getById: async (id, admin_kpi_id) => {
        // const response = await apiJSON.get(`/action_plans/master/${id}`);
        const response = await apiJSON.get(
            `admin_kpis/kpi-user/${id}/detail/${admin_kpi_id}`
        );
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
