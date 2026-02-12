import React from "react";
import Bestadminmale from "../../assets/images/dashboard/Bestadminmale.png";

export default function CongratulationCard({ name = "Jono", percent = 80 , image}) {
    return (
        <div
            className="
                bg-[#CFEFFF]
                rounded-3xl
                shadow
                p-6 sm:p-8
                flex flex-col sm:flex-row
                items-center
                justify-between
                gap-6
            "
        >
            {/* Text Section */}
            <div className="flex-1">
                <h2 className="text-3xl sm:text-4xl font-semibold text-[#1177BB] mb-3">
                    Congratulation {name}!
                </h2>
                <p className="text-lg text-gray-800">
                    You have done {percent}% more spirit today.
                </p>
            </div>

            {/* Image Section */}
            <div className="flex-shrink-0">
                <img
                    src={image}
                    alt="Best Admin"
                    className="h-40 sm:h-48 object-contain"
                />
            </div>
        </div>
    );
}
