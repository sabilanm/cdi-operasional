import React, { useState, useEffect } from "react";
import Background from "../../assets/images/bg/bg.gif";

function Starter() {
    return (
        <div>
            <title>Operational</title>
            <div className="p-2 p-md-3 mt-4 mt-md-5">
                <div className="md:mt-48 lg:mt-48 mt-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-3">
                        <div className="col-span-2">
                            <img
                                src={Background}
                                alt="Coming Soon Illustration"
                                className="w-[85%] md:w-[75%] lg:w-[95%] max-w-[6500px] h-auto object-contain"
                            />
                        </div>
                        <div className="flex flex-col col-span-2 items-center text-center justify-center space-y-4">
                            <div className="leading-tight">
                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-800">
                                    COMING
                                </h1>
                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-blue-600">
                                    SOON!
                                </h1>
                            </div>
                            <p className="text-gray-600 text-base md:text-lg max-w-md">
                                We’re currently working hard on this page —
                                it’ll be available soon!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Starter;
