import React from "react";
import Cookies from "js-cookie";
import { Row, Col } from "reactstrap";
import Dashboard1 from "../components/Dashboard1";
import DashboardRole4 from "../components/DashboardRole4";
import DashboardRole5 from "../components/DashboardRole5";
import DashboardRole6 from "../components/DashboardRole6";

const Placeholder = ({ role }) => (
    <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow">
        <div className="text-xl font-semibold text-gray-800">
            Dashboard Role {role}
        </div>
        <div className="text-gray-600 mt-2">
            Silakan definisikan layout khusus untuk role ini.
        </div>
    </div>
);

export default function DashboardByRole() {
    const roleStr = Cookies.get("operasional_role");
    const role = roleStr ? parseInt(roleStr, 10) : null;

    let Component;
    if (role === 1 || role === 3) {
        Component = Dashboard1;
    } else if (role === 4) {
        Component = DashboardRole4;
    } else if (role === 5) {
        Component = DashboardRole5;
    } else if (role === 6) {
        Component = DashboardRole6;
    } else {
        Component = Dashboard1;
    }

    return (
        <Row>
            <Col lg="12">
                <Component />
            </Col>
        </Row>
    );
}

// 1 & 3 Superadmin
// 4 HRAO
// 5 BOH
// 6 Admin
