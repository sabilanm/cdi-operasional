import api from "../../../api/auth";

// export const getRoles = async () => {
//     const res = await api.get("/roles");
//     return res.data;
// };

export const roleService = {
    getAll: async () => {
        const response = await api.get("/roles");
        return response.data.data;
    },
};
