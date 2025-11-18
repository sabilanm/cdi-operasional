// components/ui/SubmitButton.jsx
import React from "react";
import { Button, Spinner } from "reactstrap";

const SubmitButton = ({ onClick, loading = false, label = "Submit", color = "primary", disabled = false, className = "", ...rest }) => {
    return (
        <Button color={color} onClick={onClick} disabled={loading || disabled} className={className} {...rest}>
            {loading ? (
                <>
                    <Spinner size="sm" className="me-2" />
                    Processing...
                </>
            ) : (
                label
            )}
        </Button>
    );
};

export default SubmitButton;
