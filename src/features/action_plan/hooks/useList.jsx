import { useEffect, useState } from "react";
import { actionPlanService, KPIService } from "../services/actionPlanService";
import {
    userDropdown,
    branchDropdown,
    jobdescDropdown,
    positionDropdown,
} from "../../dropdown/listDropdown";
import { useNavigate } from "react-router-dom";
import { branchesService } from "../../branch/services/branchesService";
import Cookies from "js-cookie";

export const useList = () => {
    const navigate = useNavigate();
    const userBranch = Cookies.get("operasional_branch");
    const currentYear = new Date().getFullYear();
    const startYear = 2025;
    const currentMonth = new Date().getMonth() + 1;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [performa, setPerforma] = useState();
    const [branch, setBranch] = useState();
    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);
    const [localBranch, setLocalBranch] = useState();
    const [localMonth, setLocalMonth] = useState(currentMonth);
    const [localYear, setLocalYear] = useState(currentYear);
    const monthOptions = [
        { value: 1, label: "Januari" },
        { value: 2, label: "Februari" },
        { value: 3, label: "Maret" },
        { value: 4, label: "April" },
        { value: 5, label: "Mei" },
        { value: 6, label: "Juni" },
        { value: 7, label: "Juli" },
        { value: 8, label: "Agustus" },
        { value: 9, label: "September" },
        { value: 10, label: "Oktober" },
        { value: 11, label: "November" },
        { value: 12, label: "Desember" },
    ];
    const yearOptions = Array.from(
        { length: currentYear - startYear + 1 },
        (_, i) => ({
            value: startYear + i,
            label: (startYear + i).toString(),
        }),
    );

    useEffect(() => {
        const fetchBranch = async () => {
            if (!userBranch) return;

            const value = await branchesService.getById(Number(userBranch));

            setBranch({
                id: value.id,
                label: value.name,
            });
            setLocalBranch({
                id: value.id,
                label: value.name,
            });
        };
        fetchBranch();
    }, []);

    useEffect(() => {
        const fetchDivisions = async () => {
            if (!branch?.id) return;
            setLoading(true);
            setError(null);
            try {
                const respons = await KPIService.getKPI(branch.id, year, month);
                setData(respons.data);
                const val = await KPIService.getPerforma(
                    branch.id,
                    year,
                    month,
                );
                setPerforma(val.data);
            } catch (err) {
                setError(err.message || "Failed to load divisions");
            } finally {
                setLoading(false);
            }
        };
        fetchDivisions();
    }, [branch?.id, year, month]);

    const createLoadOptions = (fetchFn, label) => {
        return async (search, loadedOptions, { page }) => {
            try {
                const res = await fetchFn(search, loadedOptions, { page });
                const items = res.items || [];

                return {
                    options: items.map((item) => ({
                        value: item.id,
                        label: item.name,
                        data: item.jobdesc,
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
        "branch",
    );
    const handleBranchChange = (selectedOptions) => {
        const single = selectedOptions;
        setLocalBranch({
            id: single.value,
            label: single.label,
        });
    };

    const handleSearch = () => {
        setBranch(localBranch);
        setMonth(localMonth);
        setYear(localYear);
    };
    const handleExport = async () => {
        try {
            const response = await KPIService.export();

            const blob = new Blob([response.data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "action_plan.xlsx";

            document.body.appendChild(a);
            a.click();

            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (e) {
            console.error("Gagal download:", e);
        }
    };

    return {
        data,
        branch,
        loading,
        error,
        performa,
        month,
        year,
        monthOptions,
        yearOptions,
        localBranch,
        localMonth,
        localYear,
        setLocalBranch,
        setLocalMonth,
        setLocalYear,
        handleSearch,
        handleExport,
        setMonth,
        setYear,
        loadBranchOptions,
        handleBranchChange,
    };
};
