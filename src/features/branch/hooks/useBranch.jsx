import { useEffect, useState } from "react";
import { branchesService } from "../services/branchesService";

export const useBranch = () => {
    const [branch, setBranch] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBranch = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await branchesService.getAll();
            setBranch(data);
        } catch (err) {
            setError(err.message || "Failed to load branch");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBranch();
    }, []);

    return {
        branch,
        loading,
        error,
        refetch: fetchBranch,
    };
};
