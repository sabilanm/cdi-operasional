// src/features/scoreboar/services/scoreboardService.js
import { apiJSON } from "../../../api/auth";

export const scoreboardService = {
    getAll: async (start_date = "", end_date = "", length = 10, page = 0, sortField = "b.id", sortDirection = "asc", month = new Date().getMonth() + 1, year = new Date().getFullYear(), branch_id ="") => {
        const params = new URLSearchParams({
            length,
            start: page * length,
            sortField,
            sortDirection,
            month,
            year,
            branch_id,
        });

        if (start_date) params.append("start_date", start_date);
        if (end_date) params.append("end_date", end_date);

        const response = await apiJSON.get(`/scoreboards?${params.toString()}`);
        return response.data;
    },

    getById: async (id, start_date, end_date, length, page, sortField, sortDirection, user_id, position_id) => {
        const params = new URLSearchParams({
            length,
            start: page * length,
            sortField,
            sortDirection,
        });

        if (user_id) params.append("user_id", user_id);
        if (position_id) params.append("position_id", position_id);
        if (start_date) params.append("start_date", start_date);
        if (end_date) params.append("end_date", end_date);

        const response = await apiJSON.get(`/scoreboards/${id}?${params.toString()}`);
        return response.data;
    },

    getDetailUser: async (user_id, position_id, branch_id, month = new Date().getMonth() + 1) => {
        const params = new URLSearchParams({
            user_id,
            position_id,
            branch_id,
            month,
        });

        const response = await apiJSON.get(`/scoreboards/detail_user?${params.toString()}`);
        return response.data;
    },
    // create: async (payload) => await apiJSON.post("/scoreboards", payload),
    // update: async (id, payload) => await apiJSON.put(`/scoreboards/${id}`, payload),
    // delete: async (id) => await apiJSON.delete(`/scoreboards/${id}`)
};
