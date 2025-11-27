import { apiJSON, apiForm } from "../../../api/auth";

export const profitLossService = {
    getApprovalList: async (branchId, length, page, sortField, sortDirection) => {
        const response = await apiJSON.get(
            `/profit_and_losses/approval/list?length=${length}&start=${
                page * length
            }&branch=${branchId || ""}&sortField=${sortField}&sortDirection=${sortDirection}`
        );
        return response.data;
    },
    create: async (payload) => {
        const response = await apiJSON.post("/divisions", payload);
        return response.data.data;
    },
    getById: async (id) => {
        const response = await apiJSON.get(`/divisions/${id}`);
        return response.data.data;
    },
    updateApprovalStatus: async (id, status) => {
        const formData = new FormData();
        formData.append("status", status);
        const response = await apiForm.post(`/profit_and_losses/approval/${id}`, formData);
        return response.data;
    },
};
