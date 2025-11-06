// src/features/jobdesc_admin/services/jobdescService.js

import api from "../../../api/auth";

export const jobdesService = {
    getAll: async (page = 1, length = 10) => {
        const start = (page - 1) * length;
        const response = await api.get("/jobdescs", {
            params: {
                start,
                length
            }
        });
        return response.data;
    },
};
