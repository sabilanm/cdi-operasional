import { FormGroup, Label } from "reactstrap";
import Select from "react-select";

export default function Input({
    label,
    id,
    options,
    value,
    onChange,
    isMulti = false,
    placeholder = "Select...",
    className = "",
}) {
    return (
        <FormGroup
            className={`border-2 border-gray-400 rounded-lg ${className}`}
        >
            <div className="m-3">
                {label && (
                    <Label for={id} className="text-gray-700 font-medium">
                        {label}
                    </Label>
                )}
                <Select
                    id={id}
                    isMulti={isMulti}
                    options={options}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    classNamePrefix="react-select"
                    styles={{
                        control: (base) => ({
                            ...base,
                            borderColor: "transparent",
                            boxShadow: "none",
                            "&:hover": { borderColor: "#26C6DA" },
                        }),
                        multiValue: (base) => ({
                            ...base,
                            backgroundColor: "#E0F7FA",
                        }),
                        multiValueLabel: (base) => ({
                            ...base,
                            color: "#007C91",
                            fontWeight: 500,
                        }),
                    }}
                />
            </div>
        </FormGroup>
    );
}
