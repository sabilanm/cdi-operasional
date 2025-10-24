import { Card, CardBody } from "reactstrap";

const TopCards = (props) => {
    const cardStyle = {
        borderRadius: "10px",
        // paddingLeft: "15px",
    };
    return (
        <Card
            className="bg-gradient-to-br from-[#339DFF] to-[#007BFF] h-100 shadow-sm"
            style={cardStyle}
        >
            <CardBody
                className="
                        d-flex 
                        align-items-center 
                        flex-row 
                        flex-sm-column
                        flex-lg-row
                        py-0 px-4
                        "
            >
                <div
                    style={{ background: props.customBg, color: props.color }}
                    className={`circle-box lg-box d-inline-block ${props.bg} mt-sm-3 mt-lg-0`}
                >
                    <i className={props.icon} style={{ fontSize: "2rem" }}></i>
                </div>

                <div
                    className="
                            ms-3 
                            ms-sm-0 mt-sm-3 
                            ms-lg-4 mt-lg-0
                        "
                >
                    <small className="text-white">{props.subtitle}</small>
                    <h5 className="text-white fw-semibold mb-0 text-xl sm:text-2xl md:text-xl lg:text-xl xl:text-2xl">
                        {props.earning}
                    </h5>
                </div>
            </CardBody>
        </Card>
    );
};

export default TopCards;
