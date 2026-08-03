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
    const res = await apiRequest('/user/login', {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(login_data)});
    return res;
}

async function check_token(token){
    const res = await apiRequest('/user/me', {method: "GET", headers: {"Authorization": `Bearer ${token}`}});
    return res;
}