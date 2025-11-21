import { useEffect, useState } from "react";
import { branchAreaService } from "../services/branchAreaService";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";
import { areaService } from "../../areas/services/areaService";
import { branchesService } from "../../branch/services/branchesService";

export const useCreateBranchArea = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [branch, setBranch] = useState([]);
    const [areas, setAreas] = useState(null);

    const loadBranchOptions = async (search, loadedOptions, { page }) => {
        try {
            const length = 10;
            const res = await branchesService.getAll(search || "", length, (page - 1) || 0, "id", "asc");
            const options = (res.data || []).map((item) => ({
                value: item.id,
                label: item.name,
            }));
            const total = res.recordsFiltered ?? res.recordsTotal ?? options.length;
            const hasMore = page * length < total;
            return { options, hasMore, additional: { page: page + 1 } };
        } catch {
            return { options: [], hasMore: false, additional: { page } };
        }
    };

    const loadAreaOptions = async (search, loadedOptions, { page }) => {
        try {
            const length = 10;
            const res = await areaService.getAll(search || "", length, (page - 1) || 0, "id", "asc");
            const options = (res.data || []).map((item) => ({
                value: item.id,
                label: item.name,
            }));
            const total = res.recordsFiltered ?? res.recordsTotal ?? options.length;
            const hasMore = page * length < total;
            return { options, hasMore, additional: { page: page + 1 } };
        } catch {
            return { options: [], hasMore: false, additional: { page } };
        }
    };

    const handleBranchChange = (selectedOptions) => {
        const updated = Array.isArray(selectedOptions)
            ? selectedOptions.map((opt) => ({ id: opt.value, name: opt.label }))
            : [];
        setBranch(updated);
    };
    const handleAreasChange = (selectedOption) => {
        if (selectedOption) {
            setAreas({ id: selectedOption.value, name: selectedOption.label });
        } else {
            setAreas(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            branch_id: branch.map((b) => b.id),
            area_id: areas?.id,
        };
        try {
            const respon = await branchAreaService.create(postData);
            ToastNotification.success(respon.message || "Branch Area berhasil ditambah.");
            setTimeout(() => navigate("/branch-areas"), 1000);
        } catch (err) {
            return err;
        }
    };

    return {
        branch,
        areas,
        loadBranchOptions,
        loadAreaOptions,
        handleBranchChange,
        handleAreasChange,
        handleSubmit,
    };
};
