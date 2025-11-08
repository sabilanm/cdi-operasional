import { apiJSON } from "../../../api/auth";

export const branchAreaService = {
    getAll: async () => {
        const response = await apiJSON.get("/branch_area_mapping");
        return response.data.data;
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
};
