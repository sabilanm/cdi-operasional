import { useEffect, useState } from "react";
import { direksiAreaService } from "../services/direksiAreaService";
import { divisionDropdown } from "../../dropdown/listDropdown";
import { cLevelService } from "../../cLevel/services/cLevelService";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useEditDireksiArea = (id) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [cLevel, setCLevel] = useState(null);
    const [divisions, setDivisions] = useState([]);

    const [availableCLevels, setAvailableCLevels] = useState([]);
    const [availableDivisions, setAvailableDivisions] = useState([]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [cLevelRes, divisionRes, detailRes] = await Promise.all([
                cLevelService.getAll("", 1000, 0, "id", "asc"),
                divisionDropdown.getAll(),
                direksiAreaService.getById(id),
            ]);

            const cLevelOptions = (cLevelRes?.data || []).map((item) => ({
                value: item.id,
                label: item.name,
            }));
            setAvailableCLevels(cLevelOptions);

            const divisionOptions = (divisionRes?.items || []).map((item) => ({
                value: item.id,
                label: item.name,
            }));
            setAvailableDivisions(divisionOptions);

            // Map detail direksi
            const matchedCLevel =
                cLevelOptions.find((opt) => opt.label === detailRes?.c_level) || null;
            setCLevel(matchedCLevel);

            const mappedDivisions = (detailRes?.divisions || []).map((d) => ({
                value: d.division_id,
                label: d.division_name,
            }));
            setDivisions(mappedDivisions);
        } catch (err) {
            setError(err.message || "Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

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
            const respon = await direksiAreaService.update(id, postData);
            ToastNotification.success(
                respon?.message || "Direksi Area berhasil diubah."
            );
            setTimeout(() => navigate("/direksi-area"), 1000);
        } catch (err) {
            setError(err.message || "Failed to update");
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
