import React, { useState } from "react";
import { Button, Input, Form, Spinner } from "reactstrap";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../common/ToastNotification";

const Pagination = ({ onChange, id, phase }) => {
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const [hovered, setHovered] = useState(0);
    const [data, setData] = useState({
        rating: "",
        comment: "",
    });
    const [button, setButton] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClick = (value) => {
        setRating(value);
        if (onChange) onChange(value);
        setData((prevState) => ({
            ...prevState,
            rating: value,
        }));
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === "username" ? value.toLowerCase() : value;
        setData((prevState) => ({
            ...prevState,
            [name]: newValue,
        }));
    };
    const handlePost = async (e) => {
        e.preventDefault();
        if (button) return;
        setButton(true);
        setLoading(true);
        const formData = new FormData();
        formData.append("rating", data.rating);
        formData.append("comment", data.comment);
        if (data.rating !== "") {
            try {
                const token = Cookies.get("elearning_token");
                const headers = {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                };
                await axios.post(
                    `${process.env.REACT_APP_API_BASE_URL}/my_course/${id}/comment`,
                    formData,
                    {
                        headers: headers,
                    }
                );
                ToastNotification.success("Feedback berhasil ditambah.");
                if (phase === "1") {
                    setTimeout(() => {
                        navigate(`/mycourses/${id}/assessment/phase_1/answer`);
                    }, 2000);
                }
                if (phase === "2") {
                    setTimeout(() => {
                        navigate(`/mycourse`);
                    }, 2000);
                }
            } catch (error) {
                const errResp = error.response;
                if (errResp?.status === 422 && errResp.data?.errors?.email) {
                    ToastNotification.error(errResp.data.errors.email[0]);
                } else {
                    ToastNotification.error(
                        errResp?.data?.message || "Error adding feedback."
                    );
                }
                console.error("Error adding feedback:", error);
                setLoading(false);
                setButton(false);
            }
        } else if (data.rating === "") {
            ToastNotification.error("Mohon untuk memberi bintang");
            setLoading(false);
            setButton(false);
        }
    };
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
            <div class="relative p-4 w-full max-w-md max-h-full">
                <div class="relative bg-[#F5FAFF] rounded-lg shadow-sm">
                    <div class="p-4 md:p-5 text-center">
                        <div
                            style={{
                                background: "#5CB338",
                                width: "60px",
                                height: "60px",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto",
                            }}
                        >
                            <i
                                className="bi bi-check-lg"
                                style={{
                                    fontSize: "2.5rem",
                                    color: "white",
                                    width: "100%", // Tambahan agar posisi lebih stabil
                                    height: "100%", // Tambahan agar posisi lebih stabil
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            ></i>
                        </div>
                        <h6 class="mb-1 text-xl font-bold text-gray-500">
                            Terimakasih !
                        </h6>
                        <h3 class="mb-3 text-lg font-normal text-gray-500">
                            Anda telah menyelesaikan kursus
                        </h3>
                        <hr />
                        <p className="text-sm mb-2 mt-4 px-3">
                            Seberapa puas Anda dengan pengalaman belajar di
                            Kursus ini ?
                        </p>
                        <Form onSubmit={handlePost}>
                            <div className="flex justify-center align-center space-x-1 text-yellow-400 text-5xl mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => handleClick(star)}
                                        onMouseEnter={() => setHovered(star)}
                                        onMouseLeave={() => setHovered(0)}
                                        className="focus:outline-none"
                                    >
                                        {star <= (hovered || rating)
                                            ? "★"
                                            : "☆"}
                                    </button>
                                ))}
                            </div>
                            <div class="relative z-0 w-full mb-4 group">
                                <textarea
                                    type="text"
                                    name="comment"
                                    id="comment"
                                    class="peer block py-2.5 px-3 w-full text-sm text-dark bg-transparent border border-dark rounded-md focus:outline-none focus:ring-0 focus:border-b-2 focus:border-t-transparent focus:border-dark placeholder-transparent"
                                    placeholder="comment"
                                    value={data.comment}
                                    onChange={handleChange}
                                    required
                                    rows="2"
                                />
                                <label
                                    for="comment"
                                    className="absolute text-sm text-dark duration-300 transform -translate-y-6 scale-75 top-3 left-3 bg-white px-1 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:left-3 peer-placeholder-shown:bg-transparent peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Comment
                                </label>
                            </div>
                            <button
                                disabled={button}
                                type="submit"
                                // onClick={Submit}
                                className="w-[80%] bg-[#007BFF] text-white font-medium rounded-lg text-lg px-5 py-2.5 text-center transition duration-200"
                            >
                                {loading ? <Spinner size="sm" /> : "Kirim"}
                            </button>
                        </Form>
                        <p className="text-xs text-gray-500 px-3 mt-4">
                            Penilaian Anda sangat membantu kami dalam
                            meningkatkan kualitas materi di masa depan.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
