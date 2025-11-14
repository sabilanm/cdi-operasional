import { useEffect, useState } from "react";
import { direksiAreaService } from "../services/direksiAreaService";
import { divisionDropdown } from "../../dropdown/listDropdown";
import { cLevelService } from "../../cLevel/services/cLevelService";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useCreateDireksiArea = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [cLevel, setCLevel] = useState(null);
    const [divisions, setDivisions] = useState([]);

    const [availableCLevels, setAvailableCLevels] = useState([]);
    const [availableDivisions, setAvailableDivisions] = useState([]);

    const fetchOptions = async () => {
        setLoading(true);
        setError(null);
        try {
            // Ambil daftar C Level (pakai paging besar agar cukup untuk dropdown)
            const cLevelRes = await cLevelService.getAll("", 1000, 0, "id", "asc");
            setAvailableCLevels(
                (cLevelRes?.data || []).map((item) => ({
                    value: item.id,
                    label: item.name,
                }))
            );

            // Ambil daftar Divisions
            const divisionRes = await divisionDropdown.getAll();
            setAvailableDivisions(
                (divisionRes?.items || []).map((item) => ({
                    value: item.id,
                    label: item.name,
                }))
            );
        } catch (err) {
            setError(err.message || "Failed to load options");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOptions();
    }, []);

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
        availableCLevels,
        availableDivisions,
        handleCLevelChange,
        handleDivisionsChange,
        handleSubmit,
        loading,
        error,
    };
};
