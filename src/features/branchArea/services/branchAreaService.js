import { apiJSON } from "../../../api/auth";

export const branchAreaService = {
    getAll: async (searchQuery, length, page, sortField, sortDirection) => {
        const response = await apiJSON.get(
            `/branch_area_mapping?length=${length}&start=${
                page * length
            }&search=${searchQuery}&sortField=${sortField}&sortDirection=${sortDirection}`
        );
        return response.data;
    },
    create: async (payload) => {
        const response = await apiJSON.post("/branch_area_mapping", payload);
        return response.data.data;
    },
    getById: async (id) => {
        const response = await apiJSON.get(`/branch_area_mapping/${id}`);
        return response.data.data;
    },
    update: async (id, payload) => {
        const response = await apiJSON.put(
            `/branch_area_mapping/${id}`,
            payload
        );
        return response.data.data;
    },
    delete: async (id) => {
        const response = await apiJSON.delete(`/branch_area_mapping/${id}`);
        return response.data.data;
    },
};
