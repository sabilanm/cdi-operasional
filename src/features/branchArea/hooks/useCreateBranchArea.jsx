import { useEffect, useState } from "react";
import { branchAreaService } from "../services/branchAreaService";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";
import { areaService } from "../../areas/services/areaService";
import { branchesService } from "../../branch/services/branchesService";
import { areasDropdown, branchDropdown } from "../../dropdown/listDropdown";

export const useCreateBranchArea = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [branch, setBranch] = useState([]);
    const [areas, setAreas] = useState(null);

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
            ToastNotification.success(
                respon.message || "Branch Area berhasil ditambah."
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
    };
};
