const base_url = "https://cloudlearner.duckdns.org:1124/api/v1";

async function apiRequest(ending, config = {}) {
    const res = await fetch(`${base_url}${ending}`, config);
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message);
    }
    return data;
}

async function register(user_data){
    const res = await apiRequest('/user/register', {method: "POST", body: user_data});
    return res;
}

async function login(login_data){
    const res = await apiRequest('/user/login', {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(login_data), credentials: "include"});
    return res;
}

async function check_token(){
    const res = await apiRequest('/user/me', {method: "GET", credentials: "include"});
    return res;
}

async function logout(){
    const res = await apiRequest('/user/logout', {method: "GET", credentials: "include"});
    return res;
}

// async function get_users(page=1, limit= 10, filters ={}) {
//     const res = await apiRequest(`/user/allUsers?page=${page}&limit=${limit}`, {method: "GET", credentials: "include"});
//     return res;
// }
async function get_users(page = 1, limit = 10, filters = {}) {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('limit', limit);
    if (filters.sort) {
        params.append('sort', filters.sort);
    }
    if (filters.role) {
        params.append('role', filters.role)
    }
    if (filters.isDisabled !== "" && filters.isDisabled !== undefined) {
        params.append('isDisabled', filters.isDisabled);
    }
    const res = await apiRequest(`/user/allUsers?${params.toString()}`, { method: "GET", credentials: "include" });
    return res;
}

async function register_user(user_data){
    const res = await apiRequest('/user/register', {method: "POST", body: user_data, credentials: "include"});
    return res
}

async function delete_user_api(id){
    const res = await apiRequest(`/user/deleteUser/${id}`, {method: "DELETE", credentials: "include"})
    return res;
}

async function update_user_api(id, data){
    const res = await apiRequest(`/user/updateUser/${id}`, {method: "PATCH", credentials: "include", headers: {"Content-Type": "application/json"}, body: JSON.stringify(data)});
    return res;
}