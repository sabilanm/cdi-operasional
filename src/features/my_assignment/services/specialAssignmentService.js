import { apiForm, apiJSON } from "../../../api/auth";

export const SpecialAssignmentService = {
    getAll: async (
        searchQuery,
        length,
        page,
        sortField,
        sortDirection,
        startDate,
        endDate,
    ) => {
        const response = await apiJSON.get(
            `/my_assignments?length=${length}&start=${
                page * length
            }&search=${searchQuery}&sortField=${sortField}&sortDirection=${sortDirection}&start_date=${startDate}&end_date=${endDate}`,
        );
        return response.data;
    },
    getById: async (id) => {
        const response = await apiJSON.get(`/my_assignments/${id}`);
        return response.data.data;
    },
    update: async (id, payload) => {
        const response = await apiJSON.post(`/my_assignments/${id}`, payload);
        return response.data.data;
    },
};
