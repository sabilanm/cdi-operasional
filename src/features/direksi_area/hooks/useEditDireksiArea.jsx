import { useEffect, useState } from "react";
import { direksiAreaService } from "../services/direksiAreaService";
import { divisionService } from "../../division/services/divisionService";
import { cLevelService } from "../../cLevel/services/cLevelService";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useEditDireksiArea = (id) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cLevel, setCLevel] = useState(null);
    const [divisions, setDivisions] = useState([]);

    const [originalCLevelId, setOriginalCLevelId] = useState(null);
    const [originalCLevelName, setOriginalCLevelName] = useState(null);
    const [originalDivisionIds, setOriginalDivisionIds] = useState([]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const detailRes = await direksiAreaService.getById(id);
            const data = detailRes?.data || detailRes;
            const cLevelName = data?.c_level;
            
            if (cLevelName) {
                setCLevel({ value: `name:${cLevelName}`, label: cLevelName });
                setOriginalCLevelName(cLevelName);
                setOriginalCLevelId(null); 
            } else {
                setCLevel(null);
                setOriginalCLevelName(null);
                setOriginalCLevelId(null);
            }
            const mappedDivisions = (data?.divisions || []).map((d) => ({
                value: d.division_id ?? d.id,
                label: d.division_name ?? d.name,
            }));
            setDivisions(mappedDivisions);
            setOriginalDivisionIds(mappedDivisions.map((d) => d.value));
        } catch (err) {
            setError(err.message || "Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchData();    
        }
    }, [id]);

    const loadCLevelOptions = async (search, loadedOptions, { page }) => {
        try {
            const length = 10;
            const res = await cLevelService.getAll(search || "", length, (page - 1) || 0, "id", "asc");
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
            const res = await divisionService.getAll(search || "", length, (page - 1) || 0, "id", "asc");
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
        let cLevelId = cLevel?.value;
        if (typeof cLevelId === 'string' && cLevelId.startsWith('name:')) {
            const cLevelName = cLevelId.replace('name:', '');
            try {
                const res = await cLevelService.getAll(cLevelName, 10, 0, "id", "asc");
                const list = res?.data || [];
                const exactMatch = list.find(
                    (item) => (item?.name || "").trim().toLowerCase() === cLevelName.trim().toLowerCase()
                );
                
                if (exactMatch && exactMatch.id) {
                    cLevelId = exactMatch.id;
                } else {
                    cLevelId = originalCLevelName;
                }
            } catch (err) {
                cLevelId = originalCLevelName;
            }
        }

        const divisionIds = Array.isArray(divisions) && divisions.length
            ? divisions.map((d) => d.value)
            : originalDivisionIds;

        const postData = {
            c_level_id: cLevelId,
            division_id: divisionIds,
        };

        try {
            setLoading(true);
            const response = await direksiAreaService.update(id, postData);
            ToastNotification.success(response?.message || "Direksi Area berhasil diubah.");
            setTimeout(() => navigate("/direksi-area"), 1000);
        } catch (err) {
            const errorMessage = err.message || "Failed to update Direksi Area";
            setError(errorMessage);
            ToastNotification.error(errorMessage);
        } finally {
            setLoading(false);
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
