import React from "react";

export default function BestAdminCard({ name, imageSrc, iconSrc }) {
    return (
        <div className="bg-gradient-to-br from-yellow-50 to-amber-100 rounded-2xl shadow-lg p-6 border border-yellow-200">
            <div className="relative mb-6">
                {iconSrc && <img src={iconSrc} className="w-20 absolute -top-2 -left-2 opacity-80" alt="Best Icon" />}
                <h4 className="text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 font-bold text-xl pt-2">
                    Best Admin Nasional
                </h4>
            </div>
            <div className="relative mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-200 to-orange-200 rounded-full blur-lg opacity-60"></div>
                {imageSrc && <img src={imageSrc} className="relative mx-auto w-40 my-3 z-10" alt="Best Admin" />}
            </div>
            <div className="text-center">
                <span className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-6 py-2 rounded-full text-sm shadow-lg">
                    {name}
                </span>
            </div>
        </div>
    );
}

