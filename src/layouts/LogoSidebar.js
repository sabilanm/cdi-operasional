import { Link } from "react-router-dom";
// import logo from "../assets/images/logos/teams.png";
import logo from "../assets/images/logos/logocobra2.png";

const Logo = () => {
    return (
        <Link style={{ margin: "0px 0px 0px 20px" }} to="/">
            <img
                style={{ width: "160px", height: "40px" }}
                src={logo}
                alt="Logo"
            />
        </Link>
    );
};

export default Logo;
