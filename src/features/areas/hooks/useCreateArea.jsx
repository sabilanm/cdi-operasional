import { useEffect, useState } from "react";
import { branchAreaService } from "../services/branchAreaService";
import { branchDropdown, areasDropdown } from "../../dropdown/listDropdown";
import { useNavigate, useParams } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useCreateArea = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [branch, setBranch] = useState();
    const [areas, setAreas] = useState();
    const [availableBranch, setAvailableBranch] = useState();
    const [availableAreas, setAvailableAreas] = useState();
    const fetchBranchArea = async () => {
        setLoading(true);
        setError(null);
        try {
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
        fetchBranchArea();
    }, []);
    const handleBranchChange = (selectedOptions) => {
        const updatedBranch = selectedOptions.map((option) => ({
            id: option.value,
            name: option.label,
        }));
        setBranch(updatedBranch);
    };
    const handleAreasChange = (selectedOptions) => {
        // const updatedAreas = selectedOptions.map((option) => ({
        //     id: option.value,
        //     name: option.label,
        // }));
        // setAreas(updatedAreas);
        const single = selectedOptions;
        setAreas({
            id: single.value,
            name: single.label,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            branch_id: branch.map((val) => val.id),
            area_id: areas.id,
        };

        try {
            const respon = await branchAreaService.create(postData);
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
