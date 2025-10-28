import api from "../../../api/auth";
import Cookies from "js-cookie";
import defaultImage from "../../../assets/images/users/user6.png";

export const authService = {
    login: async (payload) => {
        const response = await api.post("/login", payload);
        const data = response.data.data;
        const expiresAt = data.expires_at;

        // Ambil profile image
        const profileImage = data.user.image
            ? `${process.env.REACT_APP_IMAGE_URL}${data.user.image}`
            : defaultImage;

        // Simpan cookies (DRY: gunakan loop untuk menghindari duplikasi)
        const cookieOptions = {
            expires: new Date(expiresAt),
            secure: true,
            sameSite: "Strict",
        };

        const cookieMap = {
            operasional_menu: JSON.stringify(data.menus),
            operasional_token: data.access_token,
            operasional_user: data.user.id,
            operasional_name: data.user.name,
            operasional_branch: data.user.branch_id,
            operasional_division: data.user.division_id,
            operasional_role: data.user.roles?.[0]?.id,
            operasional_profileImage: profileImage,
        };

        Object.entries(cookieMap).forEach(([key, value]) => {
            Cookies.set(key, value, cookieOptions);
        });

        return data;
    },
};
