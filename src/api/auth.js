import axios from "axios";
import Cookies from "js-cookie";
import defaultImage from "../assets/images/users/user6.png";

const getAuthHeaders = () => {
    const token = Cookies.get(process.env.REACT_APP_TOKEN);
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
};

export const postLogin = async (payload) => {
    const headers = getAuthHeaders();
    const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/login`,
        payload,
        {
            headers: headers,
        }
    );

    const data = response.data.data;
    const expiresAt = data.expires_at;

    // simpan semua cookies
    // Set menu in cookies
    Cookies.set("operasional_menu", JSON.stringify(data.menus), {
        expires: new Date(expiresAt),
        secure: true,
        sameSite: "Strict",
    });

    // Set token dalam cookies
    Cookies.set("operasional_token", data.access_token, {
        expires: new Date(expiresAt),
        secure: true, // Hanya mengirimkan cookies di HTTPS
        sameSite: "Strict", // Menghindari CSRF
    });

    // Set user dalam cookies
    Cookies.set("operasional_user", data.user.id, {
        expires: new Date(expiresAt),
        secure: true, // Hanya mengirimkan cookies di HTTPS
        sameSite: "Strict", // Menghindari CSRF
    });

    // Set user dalam cookies
    Cookies.set("operasional_name", data.user.name, {
        expires: new Date(expiresAt),
        secure: true, // Hanya mengirimkan cookies di HTTPS
        sameSite: "Strict", // Menghindari CSRF
    });
    // Set id brnch dalam cookies
    Cookies.set("operasional_branch", data.user.branch_id, {
        expires: new Date(expiresAt),
        secure: true, // Hanya mengirimkan cookies di HTTPS
        sameSite: "Strict", // Menghindari CSRF
    });
    // Set id division dalam cookies
    Cookies.set("operasional_division", data.user.division_id, {
        expires: new Date(expiresAt),
        secure: true, // Hanya mengirimkan cookies di HTTPS
        sameSite: "Strict", // Menghindari CSRF
    });

    // Set id roles dalam cookies
    Cookies.set("operasional_role", data.user.roles[0].id, {
        expires: new Date(expiresAt),
        secure: true, // Hanya mengirimkan cookies di HTTPS
        sameSite: "Strict", // Menghindari CSRF
    });

    // console.log("role", data.user.roles[0].id);
    // Ambil dan simpan foto profil
    const profileImage = data.user.image
        ? `${process.env.REACT_APP_IMAGE_URL}${data.user.image}`
        : defaultImage;

    Cookies.set("operasional_profileImage", profileImage, {
        expires: new Date(expiresAt),
        secure: true,
        sameSite: "Strict",
    });
    return data;
};
