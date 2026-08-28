import { apiJSON } from "../../../api/auth";

export const overviewService = {
    getAll: async (length, page, searchQuery, sortField, sortDirection) => {
        const response = await apiJSON.get(
            `/admin_kpis/overview?length=${length}&start=${
                page * length
            }&search=${searchQuery}&sortDirection=${sortDirection}`,
        );
        return response.data;
    },
    getById: async (id, periode) => {
        // const response = await apiJSON.get(`/action_plans/master/${id}`);
        const response = await apiJSON.get(
            `admin_kpis/overview/${id}?periode=${periode}`,
        );
        return response.data.data;
    },
    export: async (month, year, branch) => {
        const response = await apiJSON.get(
            `/excels/download-kpi-admin?year=${year}&month=${month}&branch_id=${branch}`,
            {
                responseType: "blob",
            },
        );
        return response;
    },
};
