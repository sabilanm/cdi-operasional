import { useEffect, useState } from "react";
import { actionPlanService, KPIService } from "../services/actionPlanService";
import {
    userDropdown,
    branchDropdown,
    jobdescDropdown,
    positionDropdown,
} from "../../dropdown/listDropdown";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";
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
    const [branchName, setBranchName] = useState();
    const [branch, setBranch] = useState(
        userBranch ? { id: Number(userBranch), label: branchName } : null,
    );
    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);
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
        const fetchDivisions = async () => {
            setLoading(true);
            setError(null);
            try {
                const respons = await KPIService.getKPI(branch.id, year, month);
                setData(respons.data);
                setData((prev) =>
                    prev.map((item) => {
                        if (item.id === 2) {
                            const percent = (item.actual / 1000) * 100;

                            return {
                                ...item,
                                actual: percent,
                            };
                        }
                        return item;
                    }),
                );
                const val = await KPIService.getPerforma();
                setPerforma(val.data);
            } catch (err) {
                setError(err.message || "Failed to load divisions");
            } finally {
                setLoading(false);
            }
        };
        fetchDivisions();

        const getBranchName = async () => {
            try {
                const res = await loadBranchOptions(
                    "", // search
                    [], // loadedOptions
                    { page: 1 }, // additional
                );

                const found = res.options.find(
                    (opt) => String(opt.value) === String(branch.id),
                );

                if (found) {
                    setBranchName(found.label);
                }
            } catch (err) {
                console.error("Error get branch name:", err);
            }
        };

        if (branch.id) {
            getBranchName();
        }
    }, [branch, year, month]);
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
        setBranch({
            id: single.value,
            name: single.label,
        });
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
        branchName,
        setMonth,
        setYear,
        loadBranchOptions,
        handleBranchChange,
    };
};
