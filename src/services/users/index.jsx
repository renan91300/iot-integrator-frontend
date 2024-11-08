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
        // if (error.response && error.response.status === 401) {
        //     localStorage.removeItem("accesstoken");
        //     localStorage.removeItem("refreshtoken");
        //     window.location.href = "/login";
        // }
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

export async function fetchDevices(projectId) {
    const DeviceList = await axios.get(`${url}/device/`, {
        params: { project_id: projectId },
        headers: config.headers,
    });
    return DeviceList.data;
}

export async function fetchCategories(projectId) {
    const CategoryList = await axios.get(`${url}/category/`, {
        params: { project_id: projectId },
        headers: config.headers,
    });
    return CategoryList.data;
}

export async function fetchCategoryById(idCategory, projectId) {
    const params = { project_id: projectId };
    const Category = await axios.get(`${url}/category/${idCategory}/`, {
        headers: config.headers,
        params: params,

    });
    return Category.data;
}

export async function createCategory(category) {
    const newCategory = await axios.post(`${url}/category/`, category, config);
    return newCategory.data;
}

export async function updateCategory(category) {
    const idCategory = category.id;
    const params = { project_id: category.project };
    const newCategory = await axios.patch(`${url}/category/${idCategory}/`, category, {
        headers: config.headers,
        params: params
    });
    return newCategory.data;
}

export async function deleteCategory(idCategory, projectId) {
    const params = { project_id: projectId };
    const Category = await axios.delete(`${url}/category/${idCategory}/`, {
        headers: config.headers,
        params: params
    });
    return Category.data;
}