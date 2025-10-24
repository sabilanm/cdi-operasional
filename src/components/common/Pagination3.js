// src/components/common/Pagination.js
import React from "react";
import { Button, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const Pagination = ({
    page,
    length,
    totalRecords,
    rowsPerPageOptions,
    handleRowsPerPageChange,
    handlePreviousPage,
    handleNextPage,
}) => {
    const startRecord = page * length + 1;
    const endRecord = Math.min((page + 1) * length, totalRecords);
    const isLastPage = endRecord >= totalRecords;

    return (
        <div
            className="d-flex flex-row"
            style={{ float: "right", fontSize: "14px" }}
        >
            {/* <div className="flex items-center">
                <div className="d-flex justify-content-between">
                    <div>
                        <label>Rows per page: </label>
                        <Input
                            type="select"
                            value={length}
                            onChange={handleRowsPerPageChange}
                            style={{
                                width: "70px",
                                display: "inline-block",
                                marginRight: "20px",
                                border: "none",
                            }}
                        >
                            {rowsPerPageOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </Input>
                    </div>
                </div>
            </div> */}
            <div className="d-flex justify-content-end">
                <div>
                    {startRecord} - {endRecord} of {totalRecords}
                    <Button
                        color="link"
                        onClick={handlePreviousPage}
                        disabled={page === 0}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </Button>
                    <Button
                        color="link"
                        onClick={handleNextPage}
                        disabled={isLastPage}
                    >
                        <FontAwesomeIcon icon={faAngleRight} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
