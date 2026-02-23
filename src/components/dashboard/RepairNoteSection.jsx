import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const RepairItem = ({ jobdesc, problems, plans, name, due_date }) => (
    <div className="bg-white border border-yellow-200 rounded-2xl p-6 space-y-4 shadow-md hover:shadow-lg transition-shadow duration-300 hover:border-yellow-300 h-full flex flex-col justify-between">
        <div>
            <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-4 py-2 rounded-full inline-block text-sm font-semibold shadow-sm mb-3">
                {jobdesc}
            </div>

            <p className="text-gray-700 text-sm leading-relaxed mb-2">
                {problems}
            </p>
            <div className="bg-yellow-100 rounded-lg border-2 border-blue-500">
                <div
                    className="m-3 content-html"
                    dangerouslySetInnerHTML={{
                        __html: plans,
                    }}
                />
            </div>
            {/* {points && points.length > 0 && (
                <ul className="list-none pl-0 text-sm space-y-2 mb-4">
                    {points.map((p, i) => (
                        <li key={i} className="flex items-start">
                            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 flex-shrink-0"></span>
                            <span className="text-gray-700">{p}</span>
                        </li>
                    ))}
                </ul>
            )} */}
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-gray-100 mt-auto">
            <span className="bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 px-4 py-1.5 rounded-full text-xs font-medium border border-amber-200">
                👤 {name}
            </span>
            <span className="text-sm text-gray-500 font-medium">
                {due_date}
            </span>
        </div>
    </div>
);

export default function RepairNoteSection({ notes = [] }) {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl shadow-lg p-6 border border-yellow-100 relative">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <h2 className="text-yellow-500 text-2xl font-bold">
                        Inputan masukan
                    </h2>
                </div>
                {/* Custom Navigation Buttons */}
                <div className="flex gap-2">
                    <button
                        ref={prevRef}
                        className="bg-white text-yellow-500 p-2 rounded-full shadow-md hover:bg-yellow-100 transition disabled:opacity-50"
                    >
                        <FaArrowLeft />
                    </button>
                    <button
                        ref={nextRef}
                        className="bg-white text-yellow-500 p-2 rounded-full shadow-md hover:bg-yellow-100 transition disabled:opacity-50"
                    >
                        <FaArrowRight />
                    </button>
                </div>
            </div>

            {notes.length === 0 ? (
                <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">📝</span>
                    </div>
                    <p className="text-gray-500 font-medium">
                        Tidak ada feedback
                    </p>
                </div>
            ) : (
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    loop={true}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                    }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 1 },
                        1024: { slidesPerView: 1 },
                    }}
                    className="pb-10"
                >
                    {notes.map((n, i) => (
                        <SwiperSlide key={i} className="h-auto">
                            <RepairItem key={i} {...n} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
}
