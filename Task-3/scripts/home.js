const login_page = "login.html";
const user_name_span = document.querySelector("#name-show");
const avatar_img = document.querySelector("#avatar");

async function check_user() {
    try {
        const result = await check_token();
        document.body.classList.remove('hidden');
        const user = result.data.userData;
        user_name_span.textContent = user.fullName;
        avatar_img.src = user.avatar || "../assets/avatar-default-user-profile-icon-simple-flat-grey-vector-57234191.jpg";
        return user;
    }
    catch (e) {
        console.log(e);
        window.location.href = login_page;
        return null;
    }
}
check_user();

const logout_btn = document.querySelector("#logout-btn");
if (logout_btn) {
    logout_btn.addEventListener('click', async function () {
        try {
            const result = await logout();
            window.location.href = login_page;
        }
        catch (e) {
            console.log(e);
        }
    })
}