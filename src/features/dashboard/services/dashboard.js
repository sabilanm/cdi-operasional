import { apiJSON } from "../../../api/auth";

export const dashboardService = {
    getAll: async () => {
        const response = await apiJSON.get(`/dashboard`);
        return response.data;
    },
    getTop: async (month, year) => {
        const response = await apiJSON.get(
            `dashboard/top5?month=${month}&year=${year}`,
        );
        return response.data;
    },
    getRegional: async (month, year) => {
        const response = await apiJSON.get(
            `dashboard/region_score?month=${month}&year=${year}`,
        );
        return response.data;
    },
};
