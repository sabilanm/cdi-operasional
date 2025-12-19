import { apiJSON } from "../../../api/auth";

export const actionPlanService = {
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
        const response = await apiJSON.put(`/divisions/${id}`, payload);
        return response.data.data;
    },
};
