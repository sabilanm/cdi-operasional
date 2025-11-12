import { apiForm, apiJSON } from "../../../api/auth";

export const SpecialAssignmentService = {
    getAll: async (searchQuery, length, page, sortField, sortDirection) => {
        const response = await apiJSON.get(
            `/special_assignments?length=${length}&start=${
                page * length
            }&search=${searchQuery}&sortField=${sortField}&sortDirection=${sortDirection}`
        );
        return response.data;
    },
    create: async (payload) => {
        const response = await apiForm.post("/special_assignments", payload);
        return response.data.data;
    },
    getById: async (id) => {
        const response = await apiJSON.get(`/special_assignments/${id}`);
        return response.data.data;
    },
    getDetailId: async (id) => {
        const response = await apiJSON.get(`/special_assignments/detail/${id}`);
        return response.data.data;
    },
    getDetail: async (
        searchQuery,
        length,
        page,
        sortField,
        sortDirection,
        id
    ) => {
        const response = await apiJSON.get(
            `/special_assignments/detail/${id}/list?length=${length}&start=${
                page * length
            }&search=${searchQuery}&sortField=${sortField}&sortDirection=${sortDirection}`
        );
        return response.data;
    },
    update: async (id, payload) => {
        const response = await apiJSON.post(
            `/special_assignments/${id}`,
            payload
        );
        return response.data.data;
    },
};
