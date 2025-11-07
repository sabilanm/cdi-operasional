import api from "../../../api/auth";

export const usersService = {
    getAll: async () => {
        const response = await api.get("/users");
        return response.data.data;
    },
    create: async (payload) => {
        const response = await api.post("/users", payload);
        return response.data.data;
    },
    getById: async (id) => {
        const response = await api.get(`/users/${id}`);
        return response.data.data;
    },
    update: async (id, payload) => {
        const response = await api.post(`/users/${id}`, payload);
        return response.data.data;
    },
};
