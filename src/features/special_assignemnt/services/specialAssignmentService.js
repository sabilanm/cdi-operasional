import { apiForm, apiJSON } from "../../../api/auth";

export const SpecialAssignmentService = {
    getAll: async () => {
        const response = await apiJSON.get(`/special_assignments?`);
        return response.data;
    },
    create: async (payload) => {
        const response = await apiForm.post("/users", payload);
        return response.data.data;
    },
    getById: async (id) => {
        const response = await apiJSON.get(`/users/${id}`);
        return response.data.data;
    },
    update: async (id, payload) => {
        const response = await apiJSON.post(`/users/${id}`, payload);
        return response.data.data;
    },
};
