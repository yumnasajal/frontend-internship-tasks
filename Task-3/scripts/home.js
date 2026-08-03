const login_page = "login.html";

async function check_user(){
    const access_token = localStorage.getItem("access_token");
    if(!access_token){
        window.location.href = login_page;
        return;
    }
    try {
        const result = await check_token(access_token);
        const user = result.data.userData;
        console.log(user);
    }
    catch(e){
        console.log(e);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = login_page;
        console.alert("Unauthorized access not allowed")
    } 
}
check_user();