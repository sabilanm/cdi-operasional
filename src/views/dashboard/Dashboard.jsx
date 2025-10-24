import Tables from "../../components/dashboard/list";
import { Row, Col } from "reactstrap";

const Dashboard = () => {
  return (
    <Row>
      {/* --------------------------------------------------------------------------------*/}
      {/* table-1*/}
      {/* --------------------------------------------------------------------------------*/}
      <Col lg="12">
        <Tables />
      </Col>
    </Row>
  );
};

export default Dashboard;
