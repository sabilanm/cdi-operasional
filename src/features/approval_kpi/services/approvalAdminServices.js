import { apiJSON } from "../../../api/auth";

export const approvalAdminService = {
    getAll: async () => {
        const response = await apiJSON.get("/admin_kpis/kpi-user");
        return response.data;
    },
    getById: async (id) => {
        const response = await apiJSON.get(`/admin_kpis/kpi-user/${id}`);
        return response.data.data;
    },
    approve: async (id) => {
        const response = await apiJSON.post(
            `/admin_kpis/kpi-user/${id}/approved`
        );
        return response.data.data;
    },
};
