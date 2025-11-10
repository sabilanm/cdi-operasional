// src/components/common/PaginationNew.js
import React from "react";
import { Button, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const Pagination = ({
    currentPage = 1,
    totalRecords = 0,
    length = 10,
    rowsPerPageOptions = [],
    handleRowsPerPageChange,
    onPageChange,
}) => {
    const safeLength = Number(length) || 10;
    const safeTotal = Number(totalRecords) || 0;
    const totalPages = Math.ceil(safeTotal / safeLength) || 1;

    const startRecord = safeTotal === 0 ? 0 : (currentPage - 1) * safeLength + 1;
    const endRecord = Math.min(currentPage * safeLength, safeTotal);

    return (
        <div className="d-flex flex-row" style={{ float: "right", fontSize: "14px" }}>
            <div className="flex items-center">
                <div className="d-flex justify-content-between">
                    <div>
                        <label>Rows per page : </label>
                        <Input
                            type="select"
                            value={safeLength}
                            onChange={handleRowsPerPageChange}
                            style={{
                                backgroundColor: "#edecef",
                                fontSize: "14px",
                                width: "70px",
                                display: "inline-block",
                                margin: "0px",
                                border: "none",
                            }}
                        >
                            {(rowsPerPageOptions || []).map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </Input>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-end">
                <div>
                    {startRecord} - {endRecord} of {safeTotal}
                    <Button color="link" onClick={() => onPageChange(Math.max(currentPage - 1, 1))} disabled={currentPage === 1}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </Button>
                    <Button color="link" onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))} disabled={currentPage >= totalPages || totalPages === 0}>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
