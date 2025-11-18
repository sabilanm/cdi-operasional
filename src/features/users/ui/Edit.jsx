import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    CardBody,
    CardTitle,
    Card,
    Form,
    Row,
    Col,
    FormGroup,
    Label,
    Input as RSInput,
    Spinner,
    Button,
    Input
} from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Select from "react-select";
import ToastNotification from "../../../components/common/ToastNotification";
import { usersService } from "../services/usersService";
import {
    branchDropdown,
    roleDropdown,
    positionDropdown,
    divisionDropdown,
} from "../../dropdown/listDropdown";
import defaultImage from "../../../assets/images/users/user6.png";

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState([]);
    const [branches, setBranches] = useState([]);
    const [positions, setPositions] = useState([]);
    const [divisions, setDivisions] = useState([]);
    const [selectedPositions, setSelectedPositions] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [loading, setLoading] = useState(false);

    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { 
            label: "Users", 
            to: "/users", 
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "Edit User", active: true },
    ];

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const [userData, branchList, positionList, divisionList, rolesResponse] =
                    await Promise.all([
                        usersService.getById(id),
                        branchDropdown.getAll(),
                        positionDropdown.getAll(),
                        divisionDropdown.getAll(),
                        roleDropdown.getAll("", [], { page: 1 }),
                    ]);
                setUser(userData.data || userData);
                setBranches(branchList || []);
                setPositions(positionList?.items || positionList?.data || []);
                setDivisions(divisionList?.items || divisionList?.data || []);
                setRoles(rolesResponse?.items || rolesResponse?.data || []);
                const userDataObj = userData.data || userData;
                if (userDataObj.positions && Array.isArray(userDataObj.positions)) {
                    const positionIds = userDataObj.positions.map(pos => pos.position_id);
                    setSelectedPositions(positionIds);
                } else if (userDataObj.position_id) {
                    setSelectedPositions([userDataObj.position_id]);
                }
                
            } catch (err) {
                console.error("Error loading data:", err);
                ToastNotification.error("Gagal memuat data user");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handlePasswordChange = (e) => {
        const { value } = e.target;
        setPasswordChanged(value.trim() !== "");
        setUser((prev) => ({ ...prev, password: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            ToastNotification.error("File harus berupa gambar (JPEG, PNG, JPG)");
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            ToastNotification.error("Ukuran gambar maksimal 2MB");
            return;
        }
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };
    const handlePositionChange = (selectedOptions) => {
        const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setSelectedPositions(selectedValues);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return;

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("username", user.username || "");
            formData.append("name", user.name || "");
            formData.append("email", user.email || "");
            
            if (passwordChanged && user.password) {
                formData.append("password", user.password);
            }
            
            formData.append("phone", user.phone || "");
            formData.append("status", user.status || "");
            selectedPositions.forEach(positionId => {
                formData.append("positions[]", positionId);
            });
            
            formData.append("division_id", user.division_id || "");
            formData.append("branch_id", user.branch_id || "");
            formData.append("role_id", user.role_id || "");
            formData.append("address", user.address || "");
            
            if (imageFile) {
                formData.append("image", imageFile);
            }
            await usersService.update(id, formData);
            ToastNotification.success("User berhasil diupdate.");
            setTimeout(() => navigate("/users"), 1000);
        } catch (error) {
            console.error("Update error:", error.response?.data);
            ToastNotification.error(
                "Terjadi kesalahan: " +
                    (error.response?.data?.message || error.message)
            );
        } finally {
            setLoading(false);
        }
    };

    const branchOptions = (branches || []).map((b) => ({
        value: b.id,
        label: b.name,
    }));
    
    const roleOptions = (roles || []).map((r) => ({
        value: r.id,
        label: r.name,
    }));
    
    const positionOptions = (positions || []).map((p) => ({
        value: p.id,
        label: p.name,
    }));
    
    const divisionOptions = (divisions || []).map((d) => ({
        value: d.id,
        label: d.name,
    }));
    const getSelectedPositionOptions = () => {
        return positionOptions.filter(option => 
            selectedPositions.includes(option.value)
        );
    };

    const getPositionNames = () => {
        const userData = user?.data || user;
        if (userData?.positions && Array.isArray(userData.positions)) {
            return userData.positions.map(pos => pos.name).filter(name => name).join(', ');
        }
        if (selectedPositions.length > 0) {
            return selectedPositions.map(posId => {
                const pos = positions.find(p => p.id === posId);
                return pos ? pos.name : '';
            }).filter(name => name).join(', ');
        }
        return user?.position_name || '-';
    };
    const getUserValue = (key) => {
        const userData = user?.data || user;
        return userData?.[key] || '';
    };

    const displayImage =
        imagePreview ||
        (getUserValue('image')
            ? `https://app.cobradental.co.id:1780/operasional-api/public/storage/${getUserValue('image')}`
            : defaultImage);

    if (loading && !user) {
        return (
            <div className="w-full flex justify-center items-center py-10">
                <Spinner />
            </div>
        );
    }

    return (
        <div>
            <title>Performa</title>
            <Breadcrumbs title="Edit User" items={breadcrumbItems} />
            <Card className="bg-[#FFFFFF] border border-[#e5d8c0] shadow-inner rounded-xl p-6">
                <CardBody>
                    {user && (
                        <Row className="mx-1 mt-4">
                            <Col md="5">
                                <Row>
                                    <div className="d-flex align-items-center justify-content-center p-2 position-relative">
                                        <div className="position-relative">
                                            <img
                                                src={displayImage}
                                                className="rounded-lg border-2 border-white shadow-lg object-cover transition duration-300 ease-in-out hover:scale-105"
                                                alt="avatar"
                                                width="100"
                                                height="100"
                                                style={{
                                                    padding: "10px",
                                                    width: "100px",
                                                    height: "100px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                            <label
                                                className="camera-icon position-absolute"
                                                style={{
                                                    top: "5px",
                                                    right: "5px",
                                                    backgroundColor: "#f79797",
                                                    color: "#ffffff",
                                                    borderRadius: "50%",
                                                    padding: "0px 4px 0px 4px",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <i className="bi bi-camera"></i>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    style={{ display: "none" }}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </Row>
                                <Row className="mt-3">
                                    <Col md="12">
                                        <div className="row mt-3">
                                            <label className="col-md-5 text-gray-600 fw-bold ">
                                                Nama
                                            </label>
                                            <label className="col-md-7 text-gray-800">
                                                <strong>:</strong>{" "}
                                                {getUserValue('name')}
                                            </label>
                                        </div>
                                        <div className="row mt-3">
                                            <label className="col-md-5 text-gray-600 fw-bold">
                                                Email
                                            </label>
                                            <label className="col-md-7 text-gray-800">
                                                <strong>:</strong>{" "}
                                                {getUserValue('email')}
                                            </label>
                                        </div>
                                        <div className="row mt-3">
                                            <label className="col-md-5 text-gray-600 fw-bold">
                                                Nomor Hp
                                            </label>
                                            <label className="col-md-7 text-gray-800">
                                                <strong>:</strong>{" "}
                                                {"+" + (getUserValue('phone') || "")}
                                            </label>
                                        </div>
                                        <div className="row mt-3">
                                            <label className="col-md-5 text-gray-600 fw-bold">
                                                Status
                                            </label>
                                            <label className="col-md-7 text-gray-800 text-capitalize">
                                                <strong>:</strong>{" "}
                                                {getUserValue('status')}
                                            </label>
                                        </div>
                                        <div className="row mt-3">
                                            <label className="col-md-5 text-gray-600 fw-bold">
                                                Nama Cabang
                                            </label>
                                            <label className="col-md-7 text-gray-800">
                                                <strong>:</strong>{" "}
                                                {getUserValue('branch_name')}
                                            </label>
                                        </div>
                                        <div className="row mt-3">
                                            <label className="col-md-5 text-gray-600 fw-bold ">
                                                Posisi
                                            </label>
                                            <label className="col-md-7 text-gray-800">
                                                <strong>:</strong>{" "}
                                                {getPositionNames()}
                                            </label>
                                        </div>
                                        <div className="row mt-3">
                                            <label className="col-md-5 text-gray-600 fw-bold ">
                                                Divisi
                                            </label>
                                            <label className="col-md-7 text-gray-800">
                                                <strong>:</strong>{" "}
                                                {getUserValue('division_name')}
                                            </label>
                                        </div>
                                        <div className="row mt-3">
                                            <label className="col-md-5 text-gray-600 fw-bold ">
                                                Role
                                            </label>
                                            <label className="col-md-7 text-gray-800">
                                                <strong>:</strong>{" "}
                                                {getUserValue('role_name')}
                                            </label>
                                        </div>
                                        <div className="row mt-3">
                                            <label className="col-md-5 text-gray-600 fw-bold ">
                                                Alamat
                                            </label>
                                            <label className="col-md-7 text-gray-800">
                                                <strong>:</strong>{" "}
                                                {getUserValue('address')}
                                            </label>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>

                            <Col md="7">
                                <Form onSubmit={handleSubmit}>
                                    {/* Form fields dengan styling yang sama seperti kode pertama */}
                                    <div class="relative z-0 w-full mb-4 group">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            class="peer block py-2.5 px-3 w-full text-sm text-dark bg-transparent border border-dark rounded-md focus:outline-none focus:ring-0 focus:border-b-2 focus:border-t-transparent focus:border-dark placeholder-transparent"
                                            placeholder="Name"
                                            value={getUserValue('name') || ""}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label
                                            for="name"
                                            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-3 bg-[#FFFFFF] px-1 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:left-3 peer-placeholder-shown:bg-[#FFFFFF] peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        >
                                            Nama
                                        </label>
                                    </div>
                                    <div class="relative z-0 w-full mb-4 group">
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            class="peer block py-2.5 px-3 w-full text-sm text-dark bg-transparent border border-dark rounded-md focus:outline-none focus:ring-0 focus:border-b-2 focus:border-t-transparent focus:border-dark placeholder-transparent"
                                            placeholder="User Name"
                                            value={getUserValue('username') || ""}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label
                                            for="username"
                                            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-3 bg-[#FFFFFF] px-1 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:left-3 peer-placeholder-shown:bg-[#FFFFFF] peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        >
                                            Username
                                        </label>
                                    </div>
                                    <div class="relative z-0 w-full mb-4 group">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            class="peer block py-2.5 px-3 w-full text-sm text-dark bg-transparent border border-dark rounded-md focus:outline-none focus:ring-0 focus:border-b-2 focus:border-t-transparent focus:border-dark placeholder-transparent"
                                            placeholder="Email"
                                            value={getUserValue('email') || ""}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label
                                            for="email"
                                            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-3 bg-[#FFFFFF] px-1 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:left-3 peer-placeholder-shown:bg-[#FFFFFF] peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        >
                                            Email
                                        </label>
                                    </div>
                                    <div class="relative z-0 w-full mb-4 group">
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            class="peer block py-2.5 px-3 w-full text-sm text-dark bg-transparent border border-dark rounded-md focus:outline-none focus:ring-0 focus:border-b-2 focus:border-t-transparent focus:border-dark placeholder-transparent"
                                            placeholder="Password"
                                            value={user.password || ""}
                                            onChange={handlePasswordChange}
                                        />
                                        <label
                                            for="password"
                                            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-3 bg-[#FFFFFF] px-1 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:left-3 peer-placeholder-shown:bg-[#FFFFFF] peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        >
                                            Kata Sandi
                                        </label>
                                    </div>
                                    <div class="relative z-0 w-full mb-4 group">
                                        <input
                                            type="tel"
                                            name="phone"
                                            id="phone"
                                            class="peer block py-2.5 px-3 w-full text-sm text-dark bg-transparent border border-dark rounded-md focus:outline-none focus:ring-0 focus:border-b-2 focus:border-t-transparent focus:border-dark placeholder-transparent"
                                            placeholder="Phone"
                                            value={getUserValue('phone') ? `+${getUserValue('phone')}` : "+"}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                const onlyNums = value.replace(/^\+|[^0-9]/g, "");
                                                setUser((prevState) => ({
                                                    ...prevState,
                                                    phone: onlyNums,
                                                }));
                                            }}
                                            pattern="\+62[0-9]*"
                                            title="Phone number must be numeric"
                                            required
                                        />
                                        <label
                                            for="phone"
                                            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-3 bg-[#FFFFFF] px-1 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:left-3 peer-placeholder-shown:bg-[#FFFFFF] peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        >
                                            Nomor Telepon
                                        </label>
                                    </div>
                                    <div class="relative z-0 w-full mb-4 group">
                                        <input
                                            type="address"
                                            name="address"
                                            id="address"
                                            class="peer block py-2.5 px-3 w-full text-sm text-dark bg-transparent border border-dark rounded-md focus:outline-none focus:ring-0 focus:border-b-2 focus:border-t-transparent focus:border-dark placeholder-transparent"
                                            placeholder="address"
                                            value={getUserValue('address') || ""}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label
                                            for="address"
                                            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-3 bg-[#FFFFFF] px-1 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:left-3 peer-placeholder-shown:bg-[#FFFFFF] peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        >
                                            Alamat
                                        </label>
                                    </div>

                                    <FormGroup>
                                        <Label>Status</Label>
                                        <div>
                                            <FormGroup check inline>
                                                <Label check>
                                                    <Input
                                                        type="radio"
                                                        name="status"
                                                        value="active"
                                                        checked={
                                                            getUserValue('status') === "active"
                                                        }
                                                        onChange={handleChange}
                                                    />{" "}
                                                    Active
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check inline>
                                                <Label check>
                                                    <Input
                                                        type="radio"
                                                        name="status"
                                                        value="inactive"
                                                        checked={
                                                            getUserValue('status') === "inactive"
                                                        }
                                                        onChange={handleChange}
                                                    />{" "}
                                                    Inactive
                                                </Label>
                                            </FormGroup>
                                        </div>
                                    </FormGroup>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 mb-4">
                                        <Select
                                            name="position_id"
                                            id="position_id"
                                            isMulti
                                            options={positionOptions}
                                            classNamePrefix="select focus:outline-none focus:ring-0 focus:border-gray-400"
                                            value={getSelectedPositionOptions()}
                                            onChange={handlePositionChange}
                                            placeholder="Pilih Posisi"
                                            styles={{
                                                menuPortal: (base) => ({
                                                    ...base,
                                                    zIndex: 9999,
                                                }),
                                            }}
                                        />
                                        <Select
                                            name="division_id"
                                            id="division_id"
                                            options={divisionOptions}
                                            classNamePrefix="select focus:outline-none focus:ring-0 focus:border-gray-400"
                                            value={
                                                divisionOptions.find(
                                                    (option) =>
                                                        option.value === getUserValue('division_id')
                                                ) || null
                                            }
                                            onChange={(opt) =>
                                                setUser((prev) => ({
                                                    ...prev,
                                                    division_id: opt ? opt.value : "",
                                                    division_name: opt?.label || "",
                                                }))
                                            }
                                            placeholder="Pilih Divisi"
                                            styles={{
                                                menuPortal: (base) => ({
                                                    ...base,
                                                    zIndex: 9999,
                                                }),
                                            }}
                                        />
                                    </div>

                                    <Select
                                        name="branch_id"
                                        id="branch_id"
                                        options={branchOptions}
                                        classNamePrefix="select focus:outline-none focus:ring-0 focus:border-gray-400"
                                        className="mb-4"
                                        value={
                                            branchOptions.find(
                                                (option) =>
                                                    option.value === getUserValue('branch_id')
                                            ) || null
                                        }
                                        onChange={(opt) =>
                                            setUser((prev) => ({
                                                ...prev,
                                                branch_id: opt ? opt.value : "",
                                                branch_name: opt?.label || "",
                                            }))
                                        }
                                        placeholder="Pilih Cabang"
                                        styles={{
                                            menuPortal: (base) => ({
                                                ...base,
                                                zIndex: 9999,
                                            }),
                                        }}
                                    />

                                    <Select
                                        name="role_id"
                                        id="role_id"
                                        options={roleOptions}
                                        classNamePrefix="select focus:outline-none focus:ring-0 focus:border-gray-400"
                                        className="mb-4"
                                        value={
                                            roleOptions.find(
                                                (option) =>
                                                    option.value === getUserValue('role_id')
                                            ) || null
                                        }
                                        onChange={(opt) =>
                                            setUser((prev) => ({
                                                ...prev,
                                                role_id: opt ? opt.value : "",
                                                role_name: opt?.label || "",
                                            }))
                                        }
                                        placeholder="Pilih Role"
                                        styles={{
                                            menuPortal: (base) => ({
                                                ...base,
                                                zIndex: 9999,
                                            }),
                                        }}
                                    />

                                    <Button
                                        type="submit"
                                        color="primary"
                                        className="w-40 rounded-md border border-[#5D3A00] bg-[#007BFF] text-[#FFFFFF] shadow-inner hover:bg-[#4B3832] hover:shadow-lg transition-all duration-300"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <Spinner size="sm" />
                                        ) : (
                                            "Simpan Perubahan"
                                        )}
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    )}
                </CardBody>
            </Card>
        </div>
    );
};

export default EditUser;
