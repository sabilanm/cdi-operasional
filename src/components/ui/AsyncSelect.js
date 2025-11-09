import { FormGroup, Label } from "reactstrap";
import { AsyncPaginate } from "react-select-async-paginate";

export default function AsyncSelect({
    value,
    onChange,
    loadOptions,
    placeholder = "Pilih opsi",
    isMulti = false,
    isClearable = true,
    additional = { page: 1 },
    label,
    className = "",
    id,
    ...props
}) {
    return (
        <FormGroup
            className={`border-2 border-gray-400 rounded-lg ${className}`}
        >
            <div className="m-3">
                {label && (
                    <Label for={id} className="text-gray-700">
                        {label}
                    </Label>
                )}
                <AsyncPaginate
                    isMulti={isMulti}
                    value={value}
                    loadOptions={loadOptions}
                    onChange={onChange}
                    additional={additional}
                    placeholder={placeholder}
                    isClearable={isClearable}
                    {...props}
                    styles={{
                        control: (base) => ({
                            ...base,
                            // borderColor: "transparent",
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
