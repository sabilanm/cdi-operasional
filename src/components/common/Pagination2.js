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
    currentPage,
    recordsPerPage,
}) => {
    const pages = currentPage - 1;
    const startRecord = pages * length + 1;
    const endRecord = Math.min((pages + 1) * length, totalRecords);
    // const isLastPage = endRecord >= totalRecords;

    return (
        <div
            className="d-flex flex-row"
            style={{ float: "right", fontSize: "14px" }}
        >
            <div className="d-flex justify-content-end">
                <div>
                    {startRecord} - {endRecord} of {totalRecords}
                    <Button
                        color="link"
                        onClick={handlePreviousPage}
                        disabled={currentPage <= 1}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </Button>
                    <Button
                        color="link"
                        onClick={handleNextPage}
                        disabled={
                            currentPage >=
                            Math.ceil(totalRecords / recordsPerPage)
                        }
                    >
                        <FontAwesomeIcon icon={faAngleRight} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
