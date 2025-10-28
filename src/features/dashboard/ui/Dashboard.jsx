import DashboardList from "../components/DashboardList";
import { Row, Col } from "reactstrap";

const Dashboard = () => {
    return (
        <Row>
            <Col lg="12">
                <DashboardList />
            </Col>
        </Row>
    );
};

export default Dashboard;
