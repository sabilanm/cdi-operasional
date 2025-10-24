import React from "react";
import {
    Card,
    CardBody,
    CardTitle,
    ListGroup,
    CardSubtitle,
    ListGroupItem,
    Button,
} from "reactstrap";
import defaultImage from "../../assets/images/users/user1.jpg";

const Transactions = ({ transactionData, formatRupiah, clinicUserData }) => {
    return (
        <Card>
            <CardBody>
                <CardTitle tag="h5">Pembelian User</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                Pembelian Obat
                </CardSubtitle>
                <ListGroup flush>
                {transactionData.map((transaction, index) => (
                    <ListGroupItem
                    key={index}
                    tag="li"
                    className="d-flex align-items-center p-2 border-0"
                    >
                    <img
                        style={{ marginRight: '10px' }}
                        src={transaction.image ? `https://app.cobradental.co.id:1780/remoteclinic-be/public/storage/${transaction.image}` : defaultImage}
                        className="rounded-circle"
                        alt="avatar"
                        width="35px"
                        height="35px"
                    />
                    {transaction.name}
                    <small className="ms-auto text-muted text-small">
                        {formatRupiah(transaction.total)}
                    </small>
                    </ListGroupItem>
                ))}
                </ListGroup>
            </CardBody>
        </Card>
    );
};

export default Transactions;
