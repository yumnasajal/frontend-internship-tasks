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

const tabs = document.querySelectorAll('.tab');
const admin_panel = document.querySelector('#admin-panel');
const nav_items = document.querySelectorAll('.hover-select');
let current_user;

nav_items.forEach(item => {
    item.addEventListener('click', function () {
        const target = this.dataset.tab;
        tabs.forEach(tab => {
            tab.classList.add('hidden');
        })
        document.querySelector(`#${target}`).classList.remove('hidden');
        nav_items.forEach(nav => {
            nav.classList.remove('selected');
        })
        this.classList.add('selected');
    })
})

class User {
    constructor(user_data) {
        this.id = user_data._id;
        this.name = user_data.fullName;
        this.role = user_data.role;
    }
    view_profile() {

    }
    logout() {

    }
}
class Moderator extends User {
    constructor(user_data) {
        super(user_data);
    }
    async get_users() {

    }
    async disable_users() {

    }
}

class Admin extends Moderator {
    constructor(user_data) {
        super(user_data);
        this.current_page = 1;
    }
    async init(page) {
        this.current_page = page;
        await this.fetch_users(page, 10);
    }
    async fetch_users(page, limit) {
        try {
            const result = await get_users(page, limit);
            this.users_data = result.data;
            this.users = result.data.users;
            this.pagination = result.data.pagination;
        }
        catch (err) {
            console.log(err);
        }
    }
    async display_users() {
        try {
            const table_body = document.querySelector('#user-table-body');
            table_body.textContent = "";
            if (!this.users) {
                throw new Error('No users found')
            }
            this.users.forEach(user => {
                const row = document.createElement('tr');
                if (user.isDisabled) row.classList.add('bg-gray-400');
                else row.classList.add('bg-gray-200');

                const avatar_td = document.createElement('td');
                const avatar = document.createElement('img');
                avatar.src = user.avatar || "../assets/avatar-default-user-profile-icon-simple-flat-grey-vector-57234191.jpg";

                avatar.classList.add('w-10', 'h-10', 'rounded-full', 'object-cover');
                avatar_td.append(avatar);


                const name_td = document.createElement('td');
                name_td.textContent = user.fullName;
                const username_td = document.createElement('td');
                username_td.textContent = user.userName;
                const email_td = document.createElement('td');
                email_td.textContent = user.email;
                const role_td = document.createElement('td');
                role_td.textContent = user.role;

                const edit_button = document.createElement('button');
                edit_button.classList.add('table-button', 'bg-green-600')
                const edit_icon = document.createElement('i');
                edit_icon.classList.add('fa-solid', 'fa-pen-to-square');
                edit_button.append(edit_icon);

                edit_button.addEventListener('click', () => {
                    this.open_update_action(user)
                })

                const delete_button = document.createElement('button');
                delete_button.classList.add('table-button', 'bg-red-700')
                const delete_icon = document.createElement('i');
                delete_icon.classList.add('fa-solid', 'fa-trash');
                delete_button.append(delete_icon);

                delete_button.dataset.id = user._id;
                delete_button.dataset.name = user.fullName;
                delete_button.addEventListener('click', () => {
                    this.open_user_action(user._id, user.fullName);
                })


                const edit_td = document.createElement('td');
                edit_td.append(edit_button);
                const delete_td = document.createElement('td');
                delete_td.append(delete_button);
                for (let td of [edit_td, delete_td]) {
                    td.classList.add('text-center');
                }

                for (let td of [avatar_td, name_td, username_td, email_td, role_td, edit_td, delete_td]) {
                    td.classList.add('border', 'border-gray-300', 'p-2');
                    row.append(td);
                }
                table_body.append(row);
            })
        }
        catch (err) {
            console.log(err);
            return;
        }
    }
    async users_tab() {
        const page_buttons = document.querySelectorAll('.page-button');
        admin_panel.classList.remove('hidden');
        await this.init(1);
        await this.display_users();

        page_buttons.forEach(button => {
            button.addEventListener('click', async (e) => {
                const active_button = e.currentTarget;
                const page = Number(active_button.dataset.page);
                let buttons = active_button.parentElement.children;
                for (let button of buttons) {
                    button.classList.remove('button-selected');
                }
                active_button.classList.add('button-selected');
                await this.init(page);
                await this.display_users();
            })
        })
    }
    async add_user() {
        const form = document.querySelector('#admin-register-form');
        const err_msg = document.querySelector('#required-msg');
        const avatar_input = document.querySelector('#user-avatar');
        const cover_input = document.querySelector('#cover-img');
        for (let img of [avatar_input, cover_input]) {
            img.addEventListener("change", function () {
                if (this.files.length > 0) {
                    img.previousElementSibling.textContent = this.files[0].name;
                }
            });
        }
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            try {
                err_msg.textContent = "";
                const form_data = new FormData();
                form_data.append("fullName", document.querySelector("#full-name").value)
                form_data.append("email", document.querySelector("#email").value)
                form_data.append("userName", document.querySelector("#username").value)
                form_data.append("password", document.querySelector("#password").value)
                form_data.append("role", document.querySelector("#role").value)
                const avatar = avatar_input.files[0];
                const cover = cover_input.files[0];

                if (!avatar) {
                    throw new Error("Please select avatar image");
                }
                form_data.append("avatar", avatar);

                if (cover) {
                    form_data.append('coverImage', cover);
                }
                const result = await register_user(form_data);
                console.log(result);
                err_msg.classList.remove("text-red-600");
                err_msg.classList.add("text-green-700");
                err_msg.textContent = "User created successfully";
                form.reset();

            }
            catch (err) {
                console.log(err);
                err_msg.classList.add("text-red-500");
                err_msg.classList.remove("text-green-700");
                err_msg.textContent = err.message;

            }
        })
    }
    open_user_action(id, name) {
        const card = document.querySelector('#user-action-modal');
        card.classList.remove('hidden');
        document.querySelector('#modal-user-name').textContent = `Do you really want to delete "${name}"`;
        const delete_btn = document.querySelector('#delete-user-btn');
        const cancel_btn = document.querySelector('#cancel-btn')
        delete_btn.onclick = () => {
            this.delete_user(id);
            card.classList.add('hidden');
        }
        cancel_btn.onclick = () => {
            card.classList.add('hidden');
        }
    }
    open_update_action(user) {
        const form_card = document.querySelector("#update-user-modal");
        form_card.classList.remove("hidden");
        const name = document.querySelector("#update-fullname");
        name.value = user.fullName;
        const email = document.querySelector('#update-email');
        email.value = user.email;
        const role = document.querySelector('#update-role');
        role.value = user.role;
        const status = document.querySelector('#update-status');
        status.value = user.isDisabled ? "true" : "false";
        document.querySelector('#update-user-form').onsubmit = async (e) => {
            e.preventDefault();
            const updated_data = {};
            if (name.value !== user.fullName) updated_data.fullName = name.value;
            if (email.value !== user.email) updated_data.email = email.value;
            if (role.value !== user.role) updated_data.role = role.value;
            const disabled = status.value === "true";
            if (disabled !== user.isDisabled) updated_data.isDisabled = disabled;
            if (Object.keys(updated_data).length === 0) {
                alert("Please update at least one field");
                return;
            }
            await this.update_user(user._id, updated_data);
            form_card.classList.add("hidden");
        }
        document.querySelector('#update-cancel-btn').onclick = () => {
            form_card.classList.add('hidden');
        }
    }
    async delete_user(id) {
        try {
            const res = await delete_user_api(id);
            alert("User Deleted");
            await this.init(this.current_page);
            await this.display_users();
        }
        catch (err) {
            console.log(err);
            alert(err.message);
        }
    }
    async update_user(id, updated_data) {
        try {
            const res = await update_user_api(id, updated_data);
            alert("User Updated Successfully");
            await this.init(this.current_page);
            await this.display_users();
        }
        catch (err) {
            console.log(err);
            alert(err.message);
        }
    }

}

async function admin_func() {
    const user = await check_user();
    if (!user) return;

    if (user.role === 'admin') {
        current_user = new Admin(user);
        if (admin_panel) {
            await current_user.users_tab();
            await current_user.add_user();
        }
    }
    else if (user.role === 'moderator') {
        current_user = new Moderator(user);
    }
    else {
        current_user = new User(user)
    }
}
admin_func();

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