import { apiJSON } from "../../../api/auth";

export const PlanService = {
    getAll: async () => {
        const response = await apiJSON.get(`/action_plans`);
        return response.data;
    },
    create: async (payload) => {
        const response = await apiJSON.post("/action_plans", payload);
        return response.data.data;
    },
    getById: async (id) => {
        const response = await apiJSON.get(`/divisions/${id}`);
        return response.data.data;
    },
    update: async (id, payload) => {
        const response = await apiJSON.post(
            `/action_plans/${id}/status`,
            payload
        );
        return response.data.data;
    },
};
