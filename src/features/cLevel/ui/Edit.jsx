import { CardBody, CardTitle, Form } from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Select from "../../../components/ui/Select";
import Button from "../../../components/ui/Button";
import { useEditCLevel } from "../hooks/useEditCLevel";
import { useParams } from "react-router-dom";
import Input from "../../../components/ui/Input";

const Edit = () => {
    const { id } = useParams();
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "C Level", to: "/c-level", active: false },
        { label: "Edit", active: true },
    ];
    
    const {
        data,
        selectedUser,
        availableUsers,
        loading,
        error,
        handleChange,
        handleUserChange,
        handleSubmit,
    } = useEditCLevel(id);

    if (loading && !data.name) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                <div>Loading C Level data...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger m-3">
                <h5>Error Loading Data</h5>
                <p>{error}</p>
                <Button 
                    label="Try Again" 
                    color="#00ACC1"
                    onClick={() => window.location.reload()}
                />
            </div>
        );
    }

    return (
        <div>
            <title>Performa - Edit C Level</title>
            <Breadcrumbs title="Edit C Level" items={breadcrumbItems} />
            <CardTitle
                tag="h6"
                className="text-center text-3xl font-weight-bold mb-5"
            >
                Edit C Level
            </CardTitle>
            <CardBody className="border-1 bg-white rounded-lg">
                <Form onSubmit={handleSubmit} className="p-3">
                    {/* Field Name (C Level Name) */}
                    <Input
                        label="C Level Name *"
                        name="name"
                        value={data?.name || ""}
                        onChange={handleChange}
                        placeholder="Enter C Level name"
                        required
                        disabled={loading}
                    />

                    {/* Field User Selection */}
                    <Select
                        label="Select User *"
                        id="users"
                        options={availableUsers}
                        value={selectedUser}
                        onChange={handleUserChange}
                        className="mb-3"
                        placeholder="Select a user"
                        isClearable
                        required
                        isDisabled={loading}
                    />
                    <div className="flex justify-end gap-2">
                        <Button 
                            type="submit" 
                            label={"Kirim"} 
                            color="#00ACC1" 
                            disabled={loading}
                        />
                    </div>
                </Form>
            </CardBody>
        </div>
    );
};

export default Edit;
