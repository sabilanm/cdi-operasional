import { useEffect, useState } from "react";
import { direksiAreaService } from "../services/direksiAreaService";
import { divisionService } from "../../division/services/divisionService";
import { cLevelService } from "../../cLevel/services/cLevelService";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useCreateDireksiArea = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [cLevel, setCLevel] = useState(null);
    const [divisions, setDivisions] = useState([]);

    const loadCLevelOptions = async (search, loadedOptions, { page }) => {
        try {
            const length = 10;
            const res = await cLevelService.getAll(
                search || "",
                length,
                (page - 1) || 0,
                "id",
                "asc"
            );
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

    const loadDivisionOptions = async (search, loadedOptions, { page }) => {
        try {
            const length = 10;
            const res = await divisionService.getAll(
                search || "",
                length,
                (page - 1) || 0,
                "id",
                "asc"
            );
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
