import { useEffect, useState } from "react";
import { branchAreaService } from "../services/branchAreaService";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";
import { areasDropdown, branchDropdown } from "../../dropdown/listDropdown";

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

    const createLoadOptions = (fetchFn, label) => {
        return async (search, loadedOptions, { page }) => {
            try {
                const res = await fetchFn(search, loadedOptions, { page });
                const items = res.items || [];

                return {
                    options: items.map((item) => ({
                        value: item.id,
                        label: item.name,
                    })),
                    hasMore: res.hasMore,
                    additional: {
                        page: page + 1,
                    },
                };
            } catch (error) {
                console.error(`Error loading ${label} options:`, error);
                return {
                    options: [],
                    hasMore: false,
                    additional: { page },
                };
            }
        };
    };

    const loadBranchOptions = createLoadOptions(
        branchDropdown.getAll,
        "branch"
    );
    const loadAreaOptions = createLoadOptions(areasDropdown.getAll, "area");

    const handleBranchChange = (selectedOptions) => {
        const updated = Array.isArray(selectedOptions)
            ? selectedOptions.map((opt) => ({
                  value: opt.value,
                  label: opt.label,
              }))
            : [];
        setBranch(updated);
    };
    const handleAreasChange = (selectedOption) => {
        if (selectedOption) {
            setAreas({
                value: selectedOption.value,
                label: selectedOption.label,
            });
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
            ToastNotification.success(
                respon.message || "Branch Area berhasil diperbarui."
            );
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
