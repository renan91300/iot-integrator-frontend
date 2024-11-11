import axios from "axios";

const url = import.meta.env.VITE_API_URL;

const config = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accesstoken");
        if (token) {
            config.headers["Authorization"] = `JWT ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 403) {
            const { url, params, method } = error.config;
            console.log(error);
            LogEvent("Usuário sem permissão para executar a ação", { url, params, method });
        }
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("accesstoken");
            localStorage.removeItem("refreshtoken");
            window.location.href = "/login";
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

export async function fetchDevices(projectId) {
    const DeviceList = await axios.get(`${url}/device/`, {
        params: { project_id: projectId },
        headers: config.headers,
    });
    return DeviceList.data;
}

export async function fetchDeviceById(deviceId, projectId) {
    const params = { project_id: projectId };
    const Device = await axios.get(`${url}/device/${deviceId}/`, {
        headers: config.headers,
        params: params,
    });
    return Device.data;
}

export async function createDevice(device) {
    const params = { project_id: device.project };
    const newDevice = await axios.post(`${url}/device/`, device, {
        headers: config.headers,
        params: params
    });
    return newDevice.data;
}

export async function fetchCategories(projectId) {
    const CategoryList = await axios.get(`${url}/category/`, {
        params: { project_id: projectId },
        headers: config.headers,
    });
    return CategoryList.data;
}

export async function fetchCategoryById(categoryId, projectId) {
    const params = { project_id: projectId };
    const Category = await axios.get(`${url}/category/${categoryId}/`, {
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
    const categoryId = category.id;
    const params = { project_id: category.project };
    const newCategory = await axios.patch(`${url}/category/${categoryId}/`, category, {
        headers: config.headers,
        params: params
    });
    return newCategory.data;
}

export async function deleteCategory(categoryId, projectId) {
    const params = { project_id: projectId };
    const Category = await axios.delete(`${url}/category/${categoryId}/`, {
        headers: config.headers,
        params: params
    });
    return Category.data;
}

export async function fetchLocations(projectId) {
    const LocationList = await axios.get(`${url}/location/`, {
        params: { project_id: projectId },
        headers: config.headers,
    });
    return LocationList.data;
}

export async function fetchLocationById(locationId, projectId) {
    const params = { project_id: projectId };
    const Location = await axios.get(`${url}/location/${locationId}/`, {
        headers: config.headers,
        params: params,
    });
    return Location.data;
}

export async function createLocation(location) {
    const newLocation = await axios.post(`${url}/location/`, location, config);
    return newLocation.data;
}

export async function updateLocation(location, projectId) {
    const locationId = location.id;
    const params = { project_id: projectId };
    const newLocation = await axios.patch(`${url}/location/${locationId}/`, location, {
        headers: config.headers,
        params: params
    });
    return newLocation.data;
}

export async function deleteLocation(locationId, projectId) {
    const params = { project_id: projectId };
    const Location = await axios.delete(`${url}/location/${locationId}/`, {
        headers: config.headers,
        params: params
    });
    return Location.data;
}

export async function fetchProjects() {
    const ProjectList = await axios.get(`${url}/project/`, {
        headers: config.headers,
    });
    return ProjectList.data;
}

export async function createProject(project) {
    const newProject = await axios.post(`${url}/project/`, project, config);
    return newProject.data;
}

export async function updateProject(project) {
    const projectId = project.id;
    const newProject = await axios.patch(`${url}/project/${projectId}/`, project, config);
    return newProject.data;
}

export async function deleteProject(projectId) {
    const Project = await axios.delete(`${url}/project/${projectId}/`, config);
    return Project.data;
}