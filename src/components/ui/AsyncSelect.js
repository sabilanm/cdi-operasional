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
    marginTop ="m-3",
    ...props
}) {
    return (
        <FormGroup className={`rounded-lg ${className}`}>
            <div className={marginTop}>
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
                    menuPortalTarget={typeof document !== "undefined" ? document.body : null} // <- PENTING
                    styles={{
                        control: (base) => ({
                            ...base,
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
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }), // <- agar selalu di atas
                    }}
                />
            </div>
        </FormGroup>
    );
}
