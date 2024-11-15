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

export async function generateTokens(user) {
    const userCredentials = await axios.post(`${url}/auth/jwt/create/`, { ...user });
    return userCredentials.data;
}

export async function validateToken(acessToken) {
    const isValid = await axios.post(`${url}/auth/jwt/verify/`, { token: acessToken }, config);
    return isValid.data;
}

export async function refreshAcessToken(refreshtoken) {
    const newAcessToken = await axios.post(`${url}/auth/jwt/refresh/`, { refresh: refreshtoken }, config);
    return newAcessToken.data;
}

export async function getUserData() {
    const user = await axios.get(`${url}/auth/users/me/`, config);
    return user.data;
}

export async function createUser(user) {
    const newUser = await axios.post(`${url}/auth/users/`, user, {
        "Content-Type": "application/json",
        Accept: "application/json",
    });
    return newUser.data;
}

export async function updateUser(user) {
    const NewUser = await axios.put(`${url}/auth/users/me/`, user, config);
    return NewUser.data;
}

export async function requestPasswordRecovery(email) {
    const EmailStatus = await axios.post(`${url}/auth/users/reset_password/`, { email: email });
    return EmailStatus.data;
}

export async function changeUserPassword(body) {
    const NewPassword = await axios.post(`${url}/auth/users/reset_password_confirm/`, body);
    return NewPassword.data;
}

export async function logFailedLogin(email) {
    const Login = await axios.post(`${url}/accesslog/create_failure_log/`, { email });
    return Login.data;
}

export async function logUserLogin(action) {
    const UserLogin = await axios.post(`${url}/accesslog/create_successful_log/`, { action }, config);
    return UserLogin.data;
}
