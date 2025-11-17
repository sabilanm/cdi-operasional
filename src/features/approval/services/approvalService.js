// src/features/approval/services/approvalService.js
import { apiForm, apiJSON } from "../../../api/auth";

export const approvalService = {
    getAll: async (
        start_date,
        end_date,
        branch,
        status,
        length,
        page,
        sortField,
        sortDirection
    ) => {
        const params = new URLSearchParams({
            length,
            start: page * length,
            sortField,
            sortDirection,
        });

        if (start_date) params.append("start_date", start_date);
        if (end_date) params.append("end_date", end_date);
        if (status) params.append("status", status);

        const response = await apiJSON.get(`/approvals?${params.toString()}`);
        return response.data;
    },

    updateMyActivity: async (id, formData) => {
        const response = await apiForm.post(`/my_activities/${id}`, formData);
        return response.data;
    },

    updateStatus: async (id, status) => {
         const response = await apiJSON.post(`/my_activities/${id}/checked?status=${status}`);
        return response.data;
    },
};
