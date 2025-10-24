const ListCards = (props) => {
    return (
        <div class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8">
            <div className="flex gap-3">
                <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded-lg">
                    <span className="text-3xl font-semibold">
                        {props.number}
                    </span>
                </div>
                {props.role === "1" || props.role === "2" ? (
                    <div className="flex-1 items-left">
                        <h3 className="text-lg font-semibold">{props.name}</h3>
                    </div>
                ) : props.role === "3" ? (
                    <div className="flex-1 items-left">
                        <h3 className="text-lg font-semibold">{props.name}</h3>
                    </div>
                ) : props.role === "5" ? (
                    <div className="flex-1 items-left">
                        <h3 className="text-sm font-semibold">{props.name}</h3>
                        <label className="text-xs text-[#6C757D]">
                            {props.category}
                        </label>
                    </div>
                ) : props.role === "4" ? (
                    <div className="flex-1 items-left">
                        <h3 className="text-lg font-semibold">{props.name}</h3>
                    </div>
                ) : null}
            </div>
            {props.role === "1" || props.role === "2" ? null : props.role ===
              "3" ? null : props.role === "5" ? (
                <div className="flex gap-3 items-center">
                    <label className="text-xs text-[#6C757D]">Due Date</label>
                    <h3 className="text-sm font-normal">{props.date}</h3>
                </div>
            ) : props.role === "4" ? null : null}
            <div className="flex gap-2 mt-2">
                {props.role === "1" || props.role === "2" ? (
                    <span className="text-sm font-medium">{props.total}</span>
                ) : props.role === "3" ? (
                    <span className="text-sm font-medium">{props.total}</span>
                ) : props.role === "5" ? (
                    <div className="flex-1 items-center">
                        {props.status === "done" ? (
                            <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-lg">
                                {props.status}
                            </span>
                        ) : (
                            <span class="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-lg">
                                {props.status}
                            </span>
                        )}
                    </div>
                ) : props.role === "4" ? (
                    <span className="text-sm font-medium">{props.total}</span>
                ) : null}
                {props.role === "1" || props.role === "2" ? (
                    <div
                        class="bg-gradient-to-br from-[#007BFF] to-[#005BD1] text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                        style={{
                            width: `${(props.total_done / props.total) * 100}%`,
                        }}
                    >
                        {" "}
                        {props.total_done}
                    </div>
                ) : props.role === "3" ? (
                    <div
                        class="bg-gradient-to-br from-[#007BFF] to-[#005BD1] text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                        style={{
                            width: `${(props.total_done / props.total) * 100}%`,
                        }}
                    >
                        {" "}
                        {props.total_done}
                    </div>
                ) : props.role === "4" ? (
                    <div
                        class="bg-gradient-to-br from-[#007BFF] to-[#005BD1] text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                        style={{
                            width: `${(props.total_done / props.total) * 100}%`,
                        }}
                    >
                        {" "}
                        {props.total_done}
                    </div>
                ) : props.role === "5" ? (
                    <div
                        class="bg-gradient-to-br from-[#007BFF] to-[#005BD1] text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                        style={{
                            width: `${props.progress_percentage}%`,
                        }}
                    >
                        {" "}
                        {props.progress_percentage}%
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default ListCards;
