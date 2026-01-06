import { apiJSON } from "../../../api/auth";

export const overviewService = {
    getAll: async () => {
        const response = await apiJSON.get("/admin_kpis/overview");
        return response.data;
    },
    getById: async (id, periode) => {
        // const response = await apiJSON.get(`/action_plans/master/${id}`);
        const response = await apiJSON.get(
            `admin_kpis/overview/${id}?periode=${periode}`
        );
        return response.data.data;
    },
};
