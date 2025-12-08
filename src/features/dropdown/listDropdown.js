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
    getAll: async (search = "", loadedOptions = [], { page }) => {
        const response = await apiJSON.get(
            `/branches/list?q=${search}&page=${page}`
        );
        return response.data;
    },
};
export const positionDropdown = {
    getAll: async (search = "", loadedOptions = [], { page }) => {
        const response = await apiJSON.get(
            `/positions/list?q=${search}&page=${page}`
        );
        return response.data;
    },
};
export const divisionDropdown = {
    getAll: async (search = "", loadedOptions = [], { page }) => {
        const response = await apiJSON.get(
            `/divisions/list?q=${search}&page=${page}`
        );
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
    getAll: async (search = "", loadedOptions = [], { page }) => {
        const response = await apiJSON.get(
            `/areas/all?q=${search}&page=${page}`
        );
        return response.data.data;
    },
};
export const CLevelDropdown = {
    getAll: async (search = "", loadedOptions = [], { page }) => {
        const response = await apiJSON.get(`/c_level?q=${search}&page=${page}`);
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

export const filterUserScoreboard = {
    getAll: async ({ search = null, page = 1, branch_id = null }) => {
        const response = await apiJSON.get("/scoreboards/filter", {
            params: {
                q: search,
                page,
                branch_id,
            },
        });
        return response.data;
    },
};

