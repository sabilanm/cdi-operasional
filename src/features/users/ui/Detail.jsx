import React, { useEffect, useState } from "react";
import { CardBody, CardTitle, Card, Spinner } from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import { useParams } from "react-router-dom";
import { usersService } from "../services/usersService";
import defaultImage from "../../../assets/images/users/user6.png";

const InfoItem = ({ icon, label, value }) => (
    <div className="flex items-center">
        <i className={`bi bi-${icon} mr-3 text-[#003B8F] text-xl`} />
        <span className="font-semibold w-32">{label}:</span>
        <span className="ml-1">{value}</span>
    </div>
);

const Detail = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "Users", to: "/users", active: false },
        { label: "Detail", active: true },
    ];

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const res = await usersService.getById(id);
                setData(res);
            } catch (e) {
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    const getDataValue = (key) => {
        const dataObj = data?.data || data;
        return dataObj?.[key] || '';
    };

    const getPositionNames = () => {
        const dataObj = data?.data || data;
        
        if (dataObj?.positions && Array.isArray(dataObj.positions)) {
            return dataObj.positions.map(pos => pos.name).filter(name => name).join(', ');
        }
        
        return dataObj?.position_name || '-';
    };

    const renderPositionBadges = () => {
        const dataObj = data?.data || data;
        
        if (dataObj?.positions && Array.isArray(dataObj.positions) && dataObj.positions.length > 0) {
            return (
                <div className="flex flex-wrap gap-2 mt-3">
                    {dataObj.positions.map((position, index) => (
                        <span
                            key={position.user_position_id || position.position_id || index}
                            className="bg-[#003B8F] text-[#FAF3E0] text-sm border border-[#C9ADA7] px-3 py-1 rounded-lg shadow-md transform transition-all duration-300 ease-in-out hover:translate-y-[-2px] hover:scale-105 hover:shadow-[0_6px_12px_rgba(0,0,0,0.3)]"
                        >
                            {position.name}
                        </span>
                    ))}
                </div>
            );
        }
        
        return (
            <span className="bg-[#003B8F] text-[#FAF3E0] text-base italic border border-[#C9ADA7] px-6 py-2 rounded-lg shadow-md transform transition-all duration-300 ease-in-out hover:translate-y-[-6px] hover:scale-110 hover:shadow-[0_12px_20px_rgba(0,0,0,0.4)]">
                {getDataValue('position_name')}
            </span>
        );
    };

    const displayImage =
        (getDataValue('image') &&
            `https://app.cobradental.co.id:1780/operasional-api/public/storage/${getDataValue('image')}`) ||
        defaultImage;

    if (loading && !data) {
        return (
            <div className="w-full flex justify-center items-center py-10">
                <Spinner />
            </div>
        );
    }

    return (
        <div>
            <title>Performa</title>
            <Breadcrumbs title="Detail Users" items={breadcrumbItems} />
            <Card className="bg-[#FFFFFF] border border-[#e5d8c0] shadow-inner rounded-xl p-6">
                <CardBody>
                    {data && (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                            <div className="flex flex-col items-center col-span-1">
                                <div className="relative mt-2">
                                    <img
                                        src={displayImage}
                                        alt="avatar"
                                        className="rounded-lg border-4 border-white shadow-lg object-cover transition duration-300 ease-in-out hover:scale-105"
                                        style={{
                                            width: "200px",
                                            height: "200px",
                                            backgroundColor: "white",
                                        }}
                                    />
                                </div>
                                <div className="mt-5">
                                    {renderPositionBadges()}
                                </div>
                            </div>

                            <div className="col-span-3 space-y-6">
                                <div>
                                    <h1 className="text-5xl text-[#003B8F] font-bold tracking-tight">
                                        {getDataValue('name')}
                                    </h1>
                                    <p className="text-[#6C757D] text-xl mt-2">
                                        {getDataValue('branch_name')}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 text-lg text-[#003B8F]">
                                    <InfoItem 
                                        icon="person-fill-gear" 
                                        label="Role" 
                                        value={getDataValue('role_name')} 
                                    />
                                    <InfoItem 
                                        icon="person-badge" 
                                        label="Division" 
                                        value={getDataValue('division_name')} 
                                    />
                                    <InfoItem 
                                        icon="person-circle" 
                                        label="Username" 
                                        value={getDataValue('username')} 
                                    />
                                    <InfoItem 
                                        icon="envelope-fill" 
                                        label="Email" 
                                        value={getDataValue('email')} 
                                    />
                                    <InfoItem
                                        icon="activity"
                                        label="Status"
                                        value={
                                            <span
                                                className={`capitalize font-semibold ${
                                                    getDataValue('status') === "active"
                                                        ? "text-green-600"
                                                        : "text-red-600"
                                                }`}
                                            >
                                                {getDataValue('status')}
                                            </span>
                                        }
                                    />
                                    <InfoItem 
                                        icon="briefcase-fill" 
                                        label="Position" 
                                        value={getPositionNames()} 
                                    />
                                    <InfoItem 
                                        icon="telephone-fill" 
                                        label="Phone" 
                                        value={getDataValue('phone') ? `+${getDataValue('phone')}` : '-'} 
                                    />
                                    <InfoItem 
                                        icon="geo-alt-fill" 
                                        label="Address" 
                                        value={getDataValue('address') || '-'} 
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </CardBody>
            </Card>
        </div>
    );
};

export default Detail;
