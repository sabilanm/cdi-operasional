import { useEffect, useState } from "react";
import { direksiAreaService } from "../services/direksiAreaService";
import { divisionDropdown, CLevelDropdown } from "../../dropdown/listDropdown";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useCreateDireksiArea = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [cLevel, setCLevel] = useState(null);
    const [divisions, setDivisions] = useState([]);

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

    const loadCLevelOptions = createLoadOptions(
        CLevelDropdown.getAll,
        "cLevel"
    );
    const loadDivisionOptions = createLoadOptions(
        divisionDropdown.getAll,
        "division"
    );

    const handleCLevelChange = (selectedOption) => {
        setCLevel(selectedOption || null);
    };
    const handleDivisionsChange = (selectedOptions) => {
        setDivisions(Array.isArray(selectedOptions) ? selectedOptions : []);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            c_level_id: cLevel?.value,
            division_id: divisions.map((d) => d.value),
        };
        try {
            const respon = await direksiAreaService.create(postData);
            ToastNotification.success(
                respon?.message || "Direksi Area berhasil ditambah."
            );
            setTimeout(() => navigate("/direksi-area"), 1000);
        } catch (err) {
            setError(err.message || "Failed to create");
        }
    };

    return {
        cLevel,
        divisions,
        loadCLevelOptions,
        loadDivisionOptions,
        handleCLevelChange,
        handleDivisionsChange,
        handleSubmit,
        loading,
        error,
    };
};
