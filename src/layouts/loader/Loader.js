import React from "react";
import "./loader.scss";
// import { Spinner } from "reactstrap";
// import loading from "../../assets/images/users/loading.gif";
// import { XlviLoader } from "react-awesome-loaders";

const Loader = () => (
    // <div className="fallback-spinner">
    //     <div className="loading">
    //         <Spinner color="primary" />
    //     </div>
    // </div>
    <div className="fallback-spinner">
        <div className="loading"></div>
    </div>
    // <div className="text-center my-3">
    //     <img src={loading} alt="Loading..." className="w-16 h-16 mx-auto" />
    // </div>
);
export default Loader;
