import { useEffect, useState } from "react";
import { areaService } from "../services/areaService";
import { branchDropdown, areasDropdown } from "../../dropdown/listDropdown";
import { useNavigate, useParams } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useEditArea = (id) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [branch, setBranch] = useState();
    const [areas, setAreas] = useState();
    const [availableBranch, setAvailableBranch] = useState();
    const [availableAreas, setAvailableAreas] = useState();
    const fetchArea = async () => {
        setLoading(true);
        setError(null);
        try {
            // branch
            const responBranchAreas = await areaService.getById(id);
            setAreas({
                value: responBranchAreas.area_id,
                label: responBranchAreas.area,
            });
            // setBranch(responBranchAreas.branches);
            setBranch(
                responBranchAreas.branches.map((item) => ({
                    value: item.branch_id,
                    label: item.cabang,
                }))
            );

            // branch
            const responBranch = await branchDropdown.getAll();
            setAvailableBranch(
                responBranch.map((user) => ({
                    value: user.id,
                    label: user.name,
                }))
            );
            // areas
            const responAreas = await areasDropdown.getAll();
            setAvailableAreas(
                responAreas.map((user) => ({
                    value: user.id,
                    label: user.name,
                }))
            );
        } catch (err) {
            setError(err.message || "Failed to load roles");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchArea();
    }, []);
    const handleBranchChange = (selectedOptions) => {
        const updatedBranch = selectedOptions.map((option) => ({
            value: option.value,
            label: option.label,
        }));
        console.log(updatedBranch);

        setBranch(updatedBranch);
    };
    const handleAreasChange = (selectedOptions) => {
        if (selectedOptions) {
            setAreas({
                value: selectedOptions.value,
                label: selectedOptions.label,
            });
        } else {
            setAreas(null);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            branch_id: branch.map((val) => val.value),
            area_id: areas.value,
        };
        try {
            const respon = await areaService.update(id, postData);
            ToastNotification.success(
                respon.message || "Divisi berhasil ditambah."
            );
            setTimeout(() => navigate("/division"), 1000);
        } catch (err) {
            return err;
        }
    };

    return {
        branch,
        areas,
        availableBranch,
        availableAreas,
        handleBranchChange,
        handleAreasChange,
        handleSubmit,
    };
};
