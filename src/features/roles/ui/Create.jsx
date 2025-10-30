import {
    Button,
    Card,
    CardBody,
    CardTitle,
    Form,
    FormGroup,
    Label,
    Row,
    Col,
} from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import { Icon } from "@iconify/react";
import { BiSearch } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

const Create = () => {
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "Roles", to: "/roles", active: true },
    ];
    return (
        <div>
            <title>Performa</title>
            <Breadcrumbs title="Create Roles" items={breadcrumbItems} />
            <CardTitle
                tag="h6"
                className="text-center text-3xl font-weight-bold mb-5"
            >
                Create Roles
            </CardTitle>
            <CardBody className="border-1 bg-white rounded-lg">
                <Row className="mx-1 m-3">
                    <Col md="12">
                        <label></label>
                    </Col>
                </Row>
            </CardBody>
        </div>
    );
};

export default Create;
