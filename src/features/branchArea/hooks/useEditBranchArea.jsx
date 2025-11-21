import { useEffect, useState } from "react";
import { branchAreaService } from "../services/branchAreaService";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";
import { areaService } from "../../areas/services/areaService";
import { branchesService } from "../../branch/services/branchesService";

export const useEditBranchArea = (id) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [branch, setBranch] = useState([]);
    const [areas, setAreas] = useState(null);
    const [originalBranchIds, setOriginalBranchIds] = useState([]);
    const [originalAreaId, setOriginalAreaId] = useState(null);

    const fetchBranchArea = async () => {
        setLoading(true);
        setError(null);
        try {
            const responBranchAreas = await branchAreaService.getById(id);
            setAreas({
                value: responBranchAreas.area_id,
                label: responBranchAreas.area,
            });
            const branchSelections = responBranchAreas.branches.map((item) => ({
                value: item.branch_id,
                label: item.cabang,
            }));
            setBranch(branchSelections);
            setOriginalBranchIds(branchSelections.map((b) => b.value));
            setOriginalAreaId(responBranchAreas.area_id);
        } catch (err) {
            setError(err.message || "Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBranchArea();
    }, []);

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
            ? selectedOptions.map((opt) => ({ value: opt.value, label: opt.label }))
            : [];
        setBranch(updated);
    };
    const handleAreasChange = (selectedOption) => {
        if (selectedOption) {
            setAreas({ value: selectedOption.value, label: selectedOption.label });
        } else {
            setAreas(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const branchIds =
            Array.isArray(branch) && branch.length
                ? branch.map((b) => b.value)
                : originalBranchIds;
        const areaId = areas?.value ?? originalAreaId;

        const postData = {
            branch_id: branchIds,
            area_id: areaId,
        };
        try {
            const respon = await branchAreaService.update(id, postData);
            ToastNotification.success(respon.message || "Branch Area berhasil diperbarui.");
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
        loading,
        error,
    };
};
