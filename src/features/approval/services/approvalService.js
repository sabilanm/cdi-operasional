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
        sortDirection,
        user_id
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
        if (user_id) params.append("user_id", user_id);

        const response = await apiJSON.get(`/approvals?${params.toString()}`);
        return response.data;
    },

    updateMyActivity: async (id, formData) => {
        const response = await apiForm.post(`/my_activities/${id}`, formData);
        return response.data;
    },

    updateStatus: async (id, payload) => {
        const response = await apiJSON.post(`/my_activities/${id}/checked?status=${payload.status}`,
            payload
        );
        return response.data;
    },

    getDropdownUser: async (search = "", loadedOptions = [], { page }) => {
        const response = await apiJSON.get(
            `/approvals/user/list?q=${search}&page=${page}`
        );
        return response.data;
    },
};
