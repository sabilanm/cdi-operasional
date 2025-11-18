import { apiJSON } from "../../api/auth";

export const userDropdown = {
    getAll: async (search = "", loadedOptions = [], { page }) => {
        const response = await apiJSON.get(
            `/users/list?q=${search}&page=${page}`
        );
        return response.data;
    },
};
export const permissionDropdown = {
    getAll: async (search = "", loadedOptions = [], { page }) => {
        const response = await apiJSON.get(
            `/permissions/list?q=${search}&page=${page}`
        );
        return response.data;
    },
};
export const menusDropdown = {
    getAll: async (search = "", loadedOptions = [], { page }) => {
        const response = await apiJSON.get(
            `/menus/list?q=${search}&page=${page}`
        );
        return response.data;
    },
};
export const branchDropdown = {
    getAll: async () => {
        const response = await apiJSON.get("/branches/list");
        return response.data.items;
    },
};
export const positionDropdown = {
    getAll: async () => {
        const response = await apiJSON.get("/positions/list");
        return response.data;
    },
};
export const divisionDropdown = {
    getAll: async () => {
        const response = await apiJSON.get("/divisions/list");
        return response.data;
    },
};
export const roleDropdown = {
    getAll: async (search = "", loadedOptions = [], { page }) => {
        const response = await apiJSON.get(
            `/roles/list?q=${search}&page=${page}`
        );
        return response.data;
    },
};
export const areasDropdown = {
    getAll: async () => {
        const response = await apiJSON.get("/areas");
        return response.data.data;
    },
};
export const userCLevelDropdown = {
    getAll: async () => {
        const response = await apiJSON.get("/c_level/users");
        return response.data.data;
    },
};

export const userAreaDropdown = {
    getAll: async () => {
        const response = await apiJSON.get("/areas/users");
        return response.data.data;
    },
};