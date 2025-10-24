// src/utils/api.js
import axios from "axios";
import Cookies from "js-cookie";

const getAuthHeaders = () => {
    const token = Cookies.get("performa_token");
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
};

// start list
export const getUsersList = async () => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/users/list`,
        { headers }
    );
    return response.data.data;
};
export const getPermissionsList = async () => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/permissions/list`,
        { headers }
    );
    return response.data.data;
};
export const getMenusList = async () => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/menus/list`,
        { headers }
    );
    return response.data.data;
};
export const getQuestionnairesList = async () => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/questionnaires/list`,
        { headers }
    );
    return response.data.data;
};
export const getDivisi = async () => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/divisions`,
        { headers }
    );
    return response.data.data;
};
export const getBranch = async () => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/branches`,
        { headers }
    );
    return response.data.data;
};
export const getPositionList = async () => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/positions`,
        { headers }
    );
    return response.data.data;
};
// end list

export const getDivisionList = async (id) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/divisions/${id}`,
        { headers }
    );
    return response.data.data;
};
export const getDivision = async (searchQuery) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/divisions?search=${searchQuery}`,
        { headers }
    );
    return response.data.data;
};
export const sendDivision = async (data) => {
    const headers = getAuthHeaders();
    const payload = data;
    const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/divisions`,
        payload,
        { headers }
    );
    return response.data;
};
export const editDivision = async (id, data) => {
    const headers = getAuthHeaders();
    const payload = data;
    const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/divisions/${id}`,
        payload,
        { headers }
    );
    return response.data;
};
export const deleteDivision = async (id) => {
    const headers = getAuthHeaders();
    const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/divisions/${id}`,
        { headers }
    );
    return response.data;
};

export const getMenusId = async (id) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/menus/${id}`,
        { headers }
    );
    return response.data.data;
};
export const deleteMenu = async (id) => {
    const headers = getAuthHeaders();
    const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/menus/${id}`,
        { headers }
    );
    return response.data;
};
// role
export const getRoles = async (
    searchQuery,
    length,
    page,
    sortField,
    sortDirection
) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${
            process.env.REACT_APP_API_BASE_URL
        }/roles?length=10&start=0&search=&sortField=id&sortDirection=asc${length}&start=${
            page * length
        }&search=${searchQuery}&sortField=${sortField}&sortDirection=${sortDirection}`,
        { headers }
    );
    return response.data.data;
};
export const sendRoles = async (data) => {
    const headers = getAuthHeaders();
    const payload = data;
    const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/roles`,
        payload,
        { headers }
    );
    return response.data;
};
export const editRoles = async (id, data) => {
    const headers = getAuthHeaders();
    const payload = data;
    const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/roles/${id}`,
        payload,
        { headers }
    );
    return response.data;
};
export const deleteRole = async (id) => {
    const headers = getAuthHeaders();
    const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/roles/${id}`,
        { headers }
    );
    return response.data;
};
// positions
export const getPositionsList = async (id) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/positions/${id}`,
        { headers }
    );
    return response.data.data;
};
export const getPositions = async (searchQuery) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/positions?search=${searchQuery}`,
        { headers }
    );
    return response.data.data;
};
export const sendPositions = async (data) => {
    const headers = getAuthHeaders();
    const payload = data;
    const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/positions`,
        payload,
        { headers }
    );
    return response.data;
};
export const editPositions = async (id, data) => {
    const headers = getAuthHeaders();
    const payload = data;
    const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/positions/${id}`,
        payload,
        { headers }
    );
    return response.data;
};
export const deletePosition = async (id) => {
    const headers = getAuthHeaders();
    const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/positions/${id}`,
        { headers }
    );
    return response.data;
};

// menus
export const getMenus = async (
    searchQuery,
    length,
    page,
    sortField,
    sortDirection
) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/menus?length=${length}&start=${
            page * length
        }&search=${searchQuery}&sortField=${sortField}&sortDirection=${sortDirection}`,
        { headers }
    );
    return response.data;
};
export const sendMenus = async (data) => {
    const headers = getAuthHeaders();
    const payload = data;
    const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/menus`,
        payload,
        { headers }
    );
    return response.data;
};
export const editMenus = async (id, data) => {
    const headers = getAuthHeaders();
    const payload = data;
    const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/menus/${id}`,
        payload,
        { headers }
    );
    return response.data;
};

// permissions
export const getPermissions = async (
    searchQuery,
    length,
    page,
    sortField,
    sortDirection
) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${
            process.env.REACT_APP_API_BASE_URL
        }/permissions?length=${length}&start=${
            page * length
        }&search=${searchQuery}&sortField=${sortField}&sortDirection=${sortDirection}`,
        { headers }
    );
    return response.data;
};
export const sendPermissions = async (data) => {
    const headers = getAuthHeaders();
    const payload = data;
    const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/permissions`,
        payload,
        { headers }
    );
    return response.data;
};
export const editPermissions = async (id, data) => {
    const headers = getAuthHeaders();
    const payload = data;
    const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/permissions/${id}`,
        payload,
        { headers }
    );
    return response.data;
};
export const getPermission = async (id) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/permissions/${id}`,
        { headers }
    );
    return response.data.data;
};
export const getRole = async (id) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/roles`,
        { headers }
    );
    return response.data.data;
};
export const getRoleId = async (id) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/roles/${id}`,
        { headers }
    );
    return response.data.data;
};
export const deletePermissions = async (id) => {
    const headers = getAuthHeaders();
    const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/permissions/${id}`,
        { headers }
    );
    return response.data;
};
// branches
export const getBranchesList = async (id) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/branches/${id}`,
        { headers }
    );
    return response.data.data;
};
export const getBranches = async (searchQuery) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/branches?search=${searchQuery}`,
        { headers }
    );
    return response.data.data;
};
export const sendBranches = async (data) => {
    const headers = getAuthHeaders();
    const payload = data;
    const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/branches`,
        payload,
        { headers }
    );
    return response.data;
};
export const editBranches = async (id, data) => {
    const headers = getAuthHeaders();
    const payload = data;
    const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/branches/${id}`,
        payload,
        { headers }
    );
    return response.data;
};
export const deleteBranch = async (id) => {
    const headers = getAuthHeaders();
    const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/branches/${id}`,
        { headers }
    );
    return response.data;
};

// Users
export const getUsers = async (
    length,
    page,
    searchQuery,
    sortField,
    sortDirection,
    status,
    branch_id,
    division_id,
    role_id
) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/users`,
        {
            headers,
            params: {
                status: status,
                length,
                start: page * length,
                search: searchQuery,
                division_id: division_id,
                branch_id: branch_id,
                role_id: role_id,
            },
        }
    );
    return response.data;
};

export const getUser = async (id) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/users/${id}`,
        { headers }
    );
    return response.data.data;
};

export const createUser = async (formData) => {
    const headers = getAuthHeaders();
    headers["Content-Type"] = "multipart/form-data";
    const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/users`,
        formData,
        { headers }
    );
    return response.data;
};

export const updateUser = async (id, formData) => {
    const headers = getAuthHeaders();
    headers["Content-Type"] = "multipart/form-data";
    const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/users/${id}`,
        formData,
        { headers }
    );
    return response.data;
};

export const deleteUser = async (id) => {
    const headers = getAuthHeaders();
    const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/users/${id}`,
        { headers }
    );
    return response.data;
};

export const downloadTemplate = async () => {
    const headers = getAuthHeaders();
    headers["Content-Type"] = "multipart/form-data";
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/excels/download-template`,
        {
            headers,
            responseType: "blob",
        }
    );
    return response.data;
};

export const importUsers = async (formData) => {
    const headers = getAuthHeaders();
    headers["Content-Type"] = "multipart/form-data";
    const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/excels/imports`,
        formData,
        { headers }
    );
    return response.data;
};

export const getRoleList = async () => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/role/list`,
        { headers }
    );
    return response.data.data;
};

// Areas
export const getAreas = async (
    searchQuery,
    length,
    page,
    sortField,
    sortDirection
) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/areas?length=${length}&start=${
            page * length
        }&search=${searchQuery}&sortField=${sortField}&sortDirection=${sortDirection}`,
        { headers }
    );
    return response.data;
};

export const getAreasList = async () => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/areas`,
        { headers }
    );
    return response.data.data;
};

export const getArea = async (id) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/areas/${id}`,
        { headers }
    );
    return response.data.data;
};

export const getAreaUsers = async () => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/areas/users`,
        { headers }
    );
    return response.data.data;
};

export const createArea = async (data) => {
    const headers = getAuthHeaders();
    const payload = data;
    const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/areas`,
        payload,
        { headers }
    );
    return response.data;
};

export const updateArea = async (id, data) => {
    const headers = getAuthHeaders();
    const payload = data;
    const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/areas/${id}`,
        payload,
        { headers }
    );
    return response.data;
};

export const deleteArea = async (id) => {
    const headers = getAuthHeaders();
    const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/areas/${id}`,
        { headers }
    );
    return response.data;
};

// Branch Area Mappings
export const getBranchAreas = async (
    searchQuery,
    length,
    page,
    sortField,
    sortDirection
) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${
            process.env.REACT_APP_API_BASE_URL
        }/branch_area_mapping?length=${length}&start=${
            page * length
        }&search=${searchQuery}&sortField=${sortField}&sortDirection=${sortDirection}`,
        { headers }
    );
    return response.data;
};

export const getBranchAreasList = async () => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/branch_area_mapping`,
        { headers }
    );
    return response.data.data;
};

export const getBranchArea = async (id) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/branch_area_mapping/${id}`,
        { headers }
    );
    return response.data.data;
};

export const createBranchArea = async (data) => {
    const headers = getAuthHeaders();
    const payload = data;
    const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/branch_area_mapping`,
        payload,
        { headers }
    );
    return response.data;
};

export const updateBranchArea = async (id, data) => {
    const headers = getAuthHeaders();
    const payload = data;
    const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/branch_area_mapping/${id}`,
        payload,
        { headers }
    );
    return response.data;
};

export const deleteBranchArea = async (id) => {
    const headers = getAuthHeaders();
    const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/branch_area_mapping/${id}`,
        { headers }
    );
    return response.data;
};

// C_Level
export const getCLevels = async (
    searchQuery,
    length,
    page,
    sortField,
    sortDirection
) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/c_level?length=${length}&start=${
            page * length
        }&search=${searchQuery}&sortField=${sortField}&sortDirection=${sortDirection}`,
        { headers }
    );
    return response.data;
};

export const getCLevelsList = async () => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/c_level`,
        { headers }
    );
    return response.data.data;
};

export const getCLevel = async (id) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/c_level/${id}`,
        { headers }
    );
    return response.data.data;
};

export const createCLevel = async (data) => {
    const headers = getAuthHeaders();
    const payload = data;
    const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/c_level`,
        payload,
        { headers }
    );
    return response.data;
};

export const updateCLevel = async (id, data) => {
    const headers = getAuthHeaders();
    const payload = data;
    const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/c_level/${id}`,
        payload,
        { headers }
    );
    return response.data;
};

export const deleteCLevel = async (id) => {
    const headers = getAuthHeaders();
    const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/c_level/${id}`,
        { headers }
    );
    return response.data;
};

export const getClevelUsers = async () => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/c_level/users`,
        { headers }
    );
    return response.data.data;
};

// Direksi Area
export const getDireksiAreas = async (
    searchQuery,
    length,
    page,
    sortField,
    sortDirection
) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/direksi?length=${length}&start=${
            page * length
        }&search=${searchQuery}&sortField=${sortField}&sortDirection=${sortDirection}`,
        { headers }
    );
    return response.data;
};

export const getDireksiAreasList = async () => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/direksi`,
        { headers }
    );
    return response.data.data;
};

export const getDireksiArea = async (id) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/direksi/${id}`,
        { headers }
    );
    return response.data.data;
};

export const createDireksiArea = async (data) => {
    const headers = getAuthHeaders();
    const payload = data;
    const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/direksi`,
        payload,
        { headers }
    );
    return response.data;
};

export const updateDireksiArea = async (id, data) => {
    const headers = getAuthHeaders();
    const payload = data;
    const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/direksi/${id}`,
        payload,
        { headers }
    );
    return response.data;
};

export const deleteDireksiArea = async (id) => {
    const headers = getAuthHeaders();
    const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/direksi/${id}`,
        { headers }
    );
    return response.data;
};

// Competencies
export const getCompetencies = async (
    searchQuery,
    length,
    page,
    sortField,
    sortDirection
) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${
            process.env.REACT_APP_API_BASE_URL
        }/competencies?length=${length}&start=${
            page * length
        }&search=${searchQuery}&sortField=${sortField}&sortDirection=${sortDirection}`,
        { headers }
    );
    return response.data;
};

export const getCompetenciesList = async () => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/competencies`,
        { headers }
    );
    return response.data.data;
};

export const getCompetency = async (id) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/competencies/${id}`,
        { headers }
    );
    return response.data.data;
};

export const createCompetency = async (data) => {
    const headers = getAuthHeaders();
    const payload = data;
    const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/competencies`,
        payload,
        { headers }
    );
    return response.data;
};

export const updateCompetency = async (id, data) => {
    const headers = getAuthHeaders();
    const payload = data;
    const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/competencies/${id}`,
        payload,
        { headers }
    );
    return response.data;
};

export const deleteCompetency = async (id) => {
    const headers = getAuthHeaders();
    const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/competencies/${id}`,
        { headers }
    );
    return response.data;
};

// Competency Details
export const getCompetencyDetails = async (competencyId) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/competency_details?competency_id=${competencyId}`,
        { headers }
    );
    return response.data.data;
};

export const createCompetencyDetail = async (data) => {
    const headers = getAuthHeaders();
    const payload = data;
    const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/competency_details`,
        payload,
        { headers }
    );
    return response.data;
};

export const updateCompetencyDetail = async (id, data) => {
    const headers = getAuthHeaders();
    const payload = data;
    const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/competency_details/${id}`,
        payload,
        { headers }
    );
    return response.data;
};

export const deleteCompetencyDetail = async (id) => {
    const headers = getAuthHeaders();
    const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/competency_details/${id}`,
        { headers }
    );
    return response.data;
};
// Assignment
export const getAssignment = async (
    searchQuery,
    length,
    page,
    sortField,
    sortDirection
) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${
            process.env.REACT_APP_API_BASE_URL
        }/assignments?length=${length}&start=${
            page * length
        }&search=${searchQuery}&sortField=${sortField}&sortDirection=${sortDirection}`,
        { headers }
    );
    return response.data;
};
export const getAssignmentDetail = async (id) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/assignments/${id}`,
        { headers }
    );
    return response.data.data;
};
export const sendAssignment = async (data) => {
    const headers = getAuthHeaders();
    const payload = data;
    const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/assignments`,
        payload,
        { headers }
    );
    return response.data;
};
export const updateAssignment = async (id, data) => {
    const headers = getAuthHeaders();
    const payload = data;
    const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/assignments/${id}`,
        payload,
        { headers }
    );
    return response.data;
};
export const deleteAssignment = async (id) => {
    const headers = getAuthHeaders();
    const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/assignments/${id}`,
        { headers }
    );
    return response.data;
};
export const resultAssignment = async (id) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/assignments/${id}/competencies`,
        { headers }
    );
    return response.data.data;
};
export const exportAssignment = async (divisi) => {
    const headers = getAuthHeaders();
    const id = divisi.value;
    const name = divisi.label;

    const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/assignments/division/${id}/export`,
        { headers, responseType: "blob", validateStatus: () => true } // ⬅️ penting!
    );

    const contentType = res.headers["content-type"];
    if (contentType && contentType.includes("application/json")) {
        const text = await res.data.text();
        const json = JSON.parse(text);
        return json;
    }

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = `Result - ${name}.xlsx`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    return { success: true, message: "Export success" };
};

// Minimum Scores
export const getMinimumScoresPositions = async () => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/minimum_scores/positions_list`,
        { headers }
    );
    return response.data.data;
};

export const getMinimumScoresByPosition = async (id) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/minimum_scores/list_by_position/${id}`,
        { headers }
    );
    return response.data.data;
};

export const createMinimumScores = async (data) => {
    const headers = getAuthHeaders();
    const payload = data;
    const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/minimum_scores`,
        payload,
        { headers }
    );
    return response.data;
};

export const updateMinimumScores = async (data) => {
    const headers = getAuthHeaders();
    const payload = data;
    const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/minimum_scores`,
        payload,
        { headers }
    );
    return response.data;
};

export const getPosition = async () => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/positions`,
        { headers }
    );
    return response.data.data;
};

export const getCompetenciess = async () => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/competencies`,
        { headers }
    );
    return response.data.data;
};

// My Task
export const getMyTask = async (
    searchQuery,
    length,
    page,
    sortField,
    sortDirection,
    status
) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${
            process.env.REACT_APP_API_BASE_URL
        }/my_task?status=${status}&length=${length}&start=${
            page * length
        }&search=${searchQuery}&sortField=${sortField}&sortDirection=${sortDirection}`,
        { headers }
    );
    return response.data;
};
export const getMyTaskId = async (id) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/my_task/${id}`,
        { headers }
    );
    return response.data;
};
export const postMytask = async (id, data) => {
    const headers = getAuthHeaders();
    const payload = data;
    const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/my_task/${id}`,
        payload,
        { headers }
    );
    return response.data;
};

// Questionnaires
export const getQuestionnaires = async (
    searchQuery,
    length,
    page,
    sortField,
    sortDirection
) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${
            process.env.REACT_APP_API_BASE_URL
        }/questionnaires?length=${length}&start=${
            page * length
        }&search=${searchQuery}&sortField=${sortField}&sortDirection=${sortDirection}`,
        { headers }
    );
    return response.data;
};

export const getQuestionnaire = async (id) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/questionnaires/${id}`,
        { headers }
    );
    return response.data.data;
};

export const createQuestionnaire = async (data) => {
    const headers = getAuthHeaders();
    const payload = data;
    const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/questionnaires`,
        payload,
        { headers }
    );
    return response.data;
};

export const updateQuestionnaire = async (id, data) => {
    const headers = getAuthHeaders();
    const payload = data;
    const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/questionnaires/${id}`,
        payload,
        { headers }
    );
    return response.data;
};

export const deleteQuestionnaire = async (id) => {
    const headers = getAuthHeaders();
    const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/questionnaires/${id}`,
        { headers }
    );
    return response.data;
};

export const getCompetenciesQuestionnaire = async () => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/questionnaires/competencies`,
        { headers }
    );
    return response.data.data;
};

// Scoreboard
export const getScoreboard = async (
    page,
    length,
    branch_id,
    division_id,
    position_id
) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/scoreboards?start=${
            page * length
        }&length=${length}&division_id=${division_id}&position_id=${position_id}&branch_id=${branch_id}`,
        { headers }
    );
    return response.data;
};
export const getScoreboardId = async (id, length, page, startDate, endDate) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/scoreboards/${id}?draw=0&start=${
            page * length
        }&length=${length}&start_date=${startDate}&end_date=${endDate}`,
        { headers }
    );
    return response.data;
};
export const getScoreboardFeedback = async (
    id,
    length,
    page,
    startDate,
    endDate
) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${
            process.env.REACT_APP_API_BASE_URL
        }/scoreboards/${id}/feedback?draw=0&start=${
            page * length
        }&length=${length}&start_date=${startDate}&end_date=${endDate}`,
        { headers }
    );
    return response.data;
};
export const getScoreboardSuggestion = async (id, startDate, endDate) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/scoreboards/${id}/suggestion?&start_date=${startDate}&end_date=${endDate}`,
        { headers }
    );
    return response.data.data;
};
export const postScoreboard = async (id, data) => {
    const headers = getAuthHeaders();
    const payload = data;
    const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/scoreboards/${id}`,
        payload,
        { headers }
    );
    return response.data;
};

// ... existing code ...

// Dashboard API functions
export const getDashboardProgress = async () => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/dashboard/progress`,
        { headers }
    );
    return response.data;
};

export const getDashboardList = async (filters = {}) => {
    const headers = getAuthHeaders();
    const params = new URLSearchParams();

    // Default pagination
    const length = filters.length || 10;
    const page = filters.page || 0;
    params.append("length", length);
    params.append("start", page * length);

    // Add filters to params if they exist
    if (filters.branch) {
        // Handle array parameter for branch
        if (Array.isArray(filters.branch)) {
            filters.branch.forEach((item) => params.append("branch[]", item));
        } else {
            params.append("branch", filters.branch);
        }
    }
    if (filters.division) {
        // Handle array parameter for division
        if (Array.isArray(filters.division)) {
            filters.division.forEach((item) =>
                params.append("division[]", item)
            );
        } else {
            params.append("division", filters.division);
        }
    }
    if (filters.position) {
        // Handle array parameter for position
        if (Array.isArray(filters.position)) {
            filters.position.forEach((item) =>
                params.append("position[]", item)
            );
        } else {
            params.append("position", filters.position);
        }
    }
    if (filters.name) params.append("name", filters.name);
    if (filters.start_date) params.append("start_date", filters.start_date);
    if (filters.end_date) params.append("end_date", filters.end_date);

    const queryString = params.toString();
    const url = queryString
        ? `${process.env.REACT_APP_API_BASE_URL}/dashboard/list?${queryString}`
        : `${process.env.REACT_APP_API_BASE_URL}/dashboard/list`;

    const response = await axios.get(url, { headers });
    return response.data;
};

export const getDashboardDivisionList = async () => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/dashboard/division-list`,
        { headers }
    );
    return response.data;
};
export const getDashboardStaff = async () => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/dashboard/list`,
        { headers }
    );
    return response.data;
};

export const getDashboardPositionList = async () => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/dashboard/position-list`,
        { headers }
    );
    return response.data;
};

export const getDashboardBranchList = async () => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/dashboard/branch-list`,
        { headers }
    );
    return response.data;
};

// Development suggestion API for staff
export const postDevelopmentSuggestion = async (data) => {
    const headers = getAuthHeaders();
    const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/dashboard/development-suggestion`,
        data,
        { headers }
    );
    return response.data;
};

// Dashboard – feedback list
export const getDashboardFeedback = async (params = {}) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/dashboard/list`,
        { headers, params: { ...params, type: "feedback" } }
    );
    return response.data;
};

// Dashboard – user scoreboard detail
export const getDashboardDetail = async (params = {}) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/dashboard/list`,
        { headers, params: { ...params, type: "detail" } }
    );
    return response.data;
};

// Dashboard – suggestions (top/bottom competencies + suggestions list)
export const getDashboardSuggestion = async (params = {}) => {
    const headers = getAuthHeaders();
    const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/dashboard/list`,
        { headers, params: { ...params, type: "suggestion" } }
    );
    return response.data;
};
