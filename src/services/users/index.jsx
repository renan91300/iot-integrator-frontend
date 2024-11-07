import axios from "axios";

const url = import.meta.env.VITE_API_URL;
const accesstoken = localStorage.getItem("accesstoken");

const config = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `JWT ${accesstoken}`,
    },
};


axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 403) {
            const { url, params, method } = error.config;
            console.log(error);
            LogEvent("Usuário sem permissão para executar a ação", { url, params, method });
        }
        return Promise.reject(error);
    }
);

export async function fetchUsers() {
    const UserList = await axios.get(`${url}/auth/users/`, {
        headers: config.headers,
    });
    return UserList.data;
}

export async function deleteUser(id) {
    const User = await axios.delete(`${url}/auth/users/${id}/`, config);
    return User.data;
}

export async function registerUser(user) {
    const newUser = await axios.post(`${url}/auth/users/`, user, config);
    return newUser.data;
}

export async function patchUser(user) {
    const newUser = await axios.patch(`${url}/auth/users/${user.id}/`, user, config);
    return newUser.data;
}

export async function fetchDevices(project_id) {
    const DeviceList = await axios.get(`${url}/device/`, {
        params: { project_id: project_id },
        headers: config.headers,
    });
    return DeviceList.data;
}

export async function fetchCategories(project_id) {
    const CategoryList = await axios.get(`${url}/category/`, {
        params: { project_id: project_id },
        headers: config.headers,
    });
    return CategoryList.data;
}