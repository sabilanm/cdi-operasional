import { useEffect, useState } from "react";
import { profitLossService } from "../services/P&LService";
import { useNavigate, useParams } from "react-router-dom";
import { branchDropdown } from "../../dropdown/listDropdown";
import Cookies from "js-cookie";
import ToastNotification from "../../../components/common/ToastNotification";

export const useCreate = () => {
    const userBranch = Cookies.get("operasional_branch");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState();
    const [branch, setBranch] = useState();
    const [mounth, setMounth] = useState();
    const [year, setYear] = useState();
    const mounthOptions = [
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
    const currentYear = new Date().getFullYear();
    const startYear = 2000;
    const yearOptions = Array.from(
        { length: currentYear - startYear + 1 },
        (_, i) => ({
            value: startYear + i,
            label: (startYear + i).toString(),
        })
    );

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            // branch
            const responBranch = await branchDropdown.getAll();
            const filtered = responBranch.filter(
                (item) => item.id === Number(userBranch)
            );

            setBranch({
                value: filtered[0].id,
                label: filtered[0].name,
            });
        } catch (err) {
            setError(err.message || "Failed to load roles");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
    };
    const handleMounthChange = (selectedOptions) => {
        if (!selectedOptions) return;
        setMounth({
            id: selectedOptions.value,
            name: selectedOptions.label,
        });
    };
    const handleYearChange = (selectedOptions) => {
        if (!selectedOptions) return;
        setYear({
            id: selectedOptions.value,
            name: selectedOptions.label,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // const postData = {
        //     name: data.name,
        //     status: data.status,
        // };
        console.log(data);

        // try {
        //     const respon = await profitLossService.create(postData);
        //     ToastNotification.success(
        //         respon.message || "Divisi berhasil ditambah."
        //     );
        //     setTimeout(() => navigate("/division"), 1000);
        // } catch (err) {
        //     return err;
        // }
    };

    return {
        data,
        branch,
        mounth,
        year,
        mounthOptions,
        yearOptions,
        handleChange,
        handleMounthChange,
        handleYearChange,
        handleSubmit,
    };
};
