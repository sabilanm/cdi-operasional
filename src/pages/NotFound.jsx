import React from "react";
import { useNavigate } from "react-router-dom";
import Background from "../assets/images/bg/bg.gif";
import { Icon } from "@iconify/react";

export default function NotFound() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div
            style={{ backgroundColor: "#edecef" }}
            className="min-h-screen flex items-center justify-center px-4"
        >
            <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-8">
                {/* GIF */}
                <div className="flex-shrink-0">
                    <img
                        src={Background}
                        alt="Illustration"
                        className="w-[85%] md:w-[400px] lg:w-[450px] h-auto object-contain"
                    />
                </div>

                <div className="max-w-md flex flex-col items-center">
                    <h1 className="text-6xl md:text-7xl font-extrabold text-gray-800 mb-4">
                        404
                    </h1>
                    <p className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">
                        Oops! Page not found.
                    </p>
                    <p className="text-gray-600 text-base md:text-lg mb-6 text-center">
                        The page you are looking for does not exist. Try going back to the previous page.
                    </p>

                    <div className="flex justify-center w-full">
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition font-semibold"
                        >
                            <Icon icon="solar:double-alt-arrow-left-outline" /> Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
