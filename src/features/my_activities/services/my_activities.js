// src/features/my_activities/services/my_activities.js
import { apiForm, apiJSON } from "../../../api/auth";

export const myActivitiesService = {
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

        const response = await apiJSON.get(`/my_activities?${params.toString()}`);
        return response.data;
    },
};
