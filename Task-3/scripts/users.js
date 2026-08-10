
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

const permissions = {
    user: {
        can_view: true,
        can_edit: false,
        can_toggle_disable: false,
        can_delete: false,
        can_add: false
    },
    moderator: {
        can_view: true,
        can_edit: false,
        can_toggle_disable: true,
        can_delete: false,
        can_add: false
    },
    admin: {
        can_view: true,
        can_edit: true,
        can_toggle_disable: true,
        can_delete: true,
        can_add: true
    }
}

class CurrentUser {
    constructor(user_data) {
        this.id = user_data._id;
        this.name = user_data.fullName;
        this.role = user_data.role;
        this.permissions = get_permission(this.role)
    }
}

let current_user;

function get_permission(role) {
    return permissions[role] || permissions.user;
}


class UsersTable {
    constructor(permission) {
        this.permission = permission;
        this.table_body = document.querySelector('#user-table-body');
        this.pagination_div = document.querySelector('#pagination');
        this.user_template = document.querySelector("#user-template");
        this.users = [];
        this.pagination = {};
        this.current_page = 1;
        this.filters = {
            sort: "-createdAt",
            role: "",
            isDisabled: ""
        };
        this.columns = [
            { label: "User", show: () => true },
            { label: "Email", show: () => true },
            { label: "Role", show: () => true },
            { label: "Active", show: () => true },
            { label: "Delete", show: () => this.permission.can_delete },

        ];
        this.details = {
            modal: document.querySelector("#user-details-modal"),
            form: document.querySelector('#user-details-form'),

            display: {
                container: document.querySelector("#display-div"),
                close: document.querySelector("#details-close-btn"),

                fullName: document.querySelector("#details-info-full-name"),
                username: document.querySelector("#details-info-username"),
                email: document.querySelector("#details-info-email"),
                role: document.querySelector("#details-info-role"),
                status: document.querySelector("#details-info-status"),
                created: document.querySelector("#details-info-created"),
                edited: document.querySelector("#details-info-edited"),
                id: document.querySelector("#details-info-id"),

                status_div: document.querySelector("#details-info-status").closest(".info-div"),
                created_div: document.querySelector("#details-info-created").closest(".info-div"),
                edited_div: document.querySelector("#details-info-edited").closest(".info-div"),
                id_div: document.querySelector("#details-info-id").closest(".info-div")
            },

            inputs: {
                fullName: document.querySelector("#details-input-full-name"),
                email: document.querySelector("#details-input-email"),
                role: document.querySelector("#details-input-role"),
                status: document.querySelector("#details-input-status"),

                username: document.querySelector("#details-input-username"),
                password: document.querySelector("#details-input-password"),
                avatar: document.querySelector("#details-input-avatar"),
                coverImage: document.querySelector("#details-input-cover")
            },

            buttons: {
                edit: document.querySelector("#details-edit-btn"),
                delete: document.querySelector("#details-delete-btn"),
                close: document.querySelector("#details-close-btn"),
                cancel: document.querySelector("#details-cancel-btn"),
                save: document.querySelector("#details-save-btn")
            },
            add: document.querySelector("#add-user-btn"),

            profile: {
                cover: document.querySelector("#user-cover"),
                avatar: document.querySelector("#user-avatar"),
                fullName: document.querySelector("#user-full-name"),
                username: document.querySelector("#user-username"),
                role: document.querySelector("#user-role"),
                created: document.querySelector("#user-created-at")
            },
            add_fields: {
                password: document.querySelector("#add-password-div"),
                avatar: document.querySelector("#add-avatar-div"),
                coverImage: document.querySelector("#add-cover-div")
            }
        };
        if (this.permission.can_add) {
            this.details.add.classList.remove('hidden');
            this.details.add.onclick = () => {
                this.add_user();
            };
        }
        else {
            this.details.add.classList.add('hidden');
        }
    }
    handle_sort_change() {
        const sort_select = document.querySelector("#user-sort");
        sort_select.addEventListener("change", async () => {
            this.filters.sort = sort_select.value;
            this.current_page = 1;
            await this.init(1);
        });
    }
    handle_filter_change() {
        const role_filter = document.querySelector("#user-role-filter");
        const status_filter = document.querySelector("#user-status-filter");
        role_filter.addEventListener("change", async () => {
            this.filters.role = role_filter.value;
            this.current_page = 1;
            await this.init(1);
        });
        status_filter.addEventListener("change", async () => {
            this.filters.isDisabled = status_filter.value;
            this.current_page = 1;
            await this.init(1);
        });
    }
    load_users(data) {
        this.users = data.users;
        this.pagination = data.pagination;
    }
    async init(page = 1) {
        this.current_page = page;
        const res = await get_users(page, 10, this.filters);
        this.load_users(res.data);
        this.create_pagination();
        this.display_header();
    }
    create_pagination() {
        this.pagination_div.innerHTML = "";
        const total_pages = this.pagination.totalPages;

        const prev_button = document.createElement("button");
        prev_button.classList.add('fa-solid', 'fa-caret-left');
        prev_button.disabled = !this.pagination.hasPrevPage;
        if (prev_button.disabled) {
            prev_button.classList.add('page-button-disable');
        }
        else {
            prev_button.classList.add('page-button')
        }
        prev_button.addEventListener('click', async () => {
            await this.init(this.current_page - 1);
        })
        this.pagination_div.append(prev_button);

        for (let i = 1; i <= total_pages; i++) {
            const page_button = document.createElement('button');
            page_button.textContent = i;
            page_button.classList.add('page-button');
            if (i === this.current_page) {
                page_button.classList.add('button-selected');
            }
            page_button.addEventListener('click', async () => {
                await this.init(i);
            })
            this.pagination_div.append(page_button);
        }

        const next_button = document.createElement("button");
        next_button.classList.add('fa-solid', 'fa-caret-right');
        next_button.disabled = !this.pagination.hasNextPage;
        if (next_button.disabled) {
            next_button.classList.add('page-button-disable');
        }
        else {
            next_button.classList.add('page-button');
        }
        next_button.addEventListener('click', async () => {
            await this.init(this.current_page + 1);
        })
        this.pagination_div.append(next_button);
    }
    get_columns() {
        return this.columns.filter(col => col.show());
    }
    display_header() {
        const head = document.querySelector('#user-table-header');
        head.innerHTML = "";
        this.get_columns().forEach(col => {
            const th = document.createElement('th');
            th.textContent = col.label;
            th.classList.add('border', 'border-gray-300');
            head.append(th);
        })
        this.display_users();
    }
    display_users() {
        this.table_body.innerHTML = "";
        this.users.forEach((user, index) => {
            const row = this.user_template.content.cloneNode(true);
            const tr = row.querySelector('tr');
            tr.classList.add(index % 2 === 0 ? 'bg-gray-100' : 'bg-white');

            const avatar = row.querySelector(".user-avatar");
            avatar.src = user.avatar || "../assets/avatar-default-user-profile-icon-simple-flat-grey-vector-57234191.jpg";
            row.querySelector(".user-name").textContent = user.fullName;
            row.querySelector(".user-username").textContent = '@' + user.userName;
            row.querySelector(".user-email").textContent = user.email;
            row.querySelector(".user-role").textContent = user.role;
            this.status_toggle(row, user);
            this.delete_button(row, user);

            this.table_body.append(row);
            tr.addEventListener('click', () => {
                this.display_user_details(user);
            })
        })
    }
    status_toggle(row, user) {
        const status_text = row.querySelector(".status-text");
        const status_toggle = row.querySelector('.status-toggle');
        const status_check = status_toggle.querySelector('input');

        const status_bg = row.querySelector('.status-bg');
        const status_button = row.querySelector('.status-button');

        if (this.permission.can_toggle_disable) {
            status_text.classList.add('hidden');
            status_toggle.parentElement.classList.remove('hidden');
            status_check.checked = !user.isDisabled;
            this.update_toggle_ui(status_toggle, status_bg, status_button, user.isDisabled)

            const prev_state = status_check.checked;
            status_toggle.addEventListener('click', (e) => {
                e.stopPropagation();
            });
            status_check.addEventListener('change', async (e) => {
                e.stopPropagation();
                try {
                    status_check.disabled = true;
                    await update_user_api(user._id, { isDisabled: !status_check.checked });
                    user.isDisabled = !status_check.checked;
                    this.update_toggle_ui(status_toggle, status_bg, status_button, user.isDisabled)

                }
                catch (err) {
                    console.log(err);
                    status_check.checked = prev_state;
                    this.update_toggle_ui(status_toggle, status_bg, status_button, !prev_state)

                }
                finally {
                    status_check.disabled = false;
                }
            })
        }
        else {
            status_text.textContent = user.isDisabled ? 'Disabled' : 'Active';
        }
    }
    update_toggle_ui(status_toggle, status_bg, status_button, isDisabled) {
        if (isDisabled) {
            status_toggle.classList.remove('hover:ring-mutedteal');
            status_toggle.classList.add('hover:ring-gray-500');
            status_bg.classList.remove('bg-mutedteal/70');
            status_bg.classList.add('bg-[#b3b3b3]');
            status_button.classList.remove('translate-x-5.5');
        }
        else {
            status_toggle.classList.remove('hover:ring-mutedteal');
            status_toggle.classList.add('hover:ring-gray-500');
            status_bg.classList.remove('bg-[#b3b3b3]');
            status_bg.classList.add('bg-mutedteal/70');
            status_button.classList.add('translate-x-5.5');
        }
    }
    delete_button(row, user) {
        if (!this.permission.can_delete) {
            return;
        }
        const delete_td = row.querySelector('.user-delete');
        const delete_button = delete_td.querySelector('.delete-btn')
        delete_td.classList.remove('hidden');
        delete_button.addEventListener('click', (e) => {
            e.stopPropagation();
            this.open_delete_modal(user);
        })
    }
    open_delete_modal(user) {
        const modal = document.querySelector("#user-action-modal");
        const username = document.querySelector("#modal-user-name");
        const delete_btn = document.querySelector(".delete-user-btn");
        const cancel_btn = document.querySelector(".cancel-btn");
        username.textContent = `Are you sure you want to delete ${user.fullName}?`;
        modal.classList.remove('hidden');
        cancel_btn.onclick = () => {
            modal.classList.add('hidden');
        }
        delete_btn.onclick = async () => {
            try {
                delete_btn.disabled = true;
                delete_btn.classList.remove('hover:scale-103', 'bg-red-700');
                delete_btn.classList.add('bg-red-300');
                await delete_user_api(user._id);

                delete_btn.disabled = false;
                delete_btn.classList.remove('bg-red-300');
                delete_btn.classList.add('hover:scale-103', 'bg-red-700');
                modal.classList.add('hidden');
                await this.init(this.current_page);
                this.open_user_deleted_modal(user);
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    open_user_deleted_modal(user) {
        const modal = document.querySelector('#deleted-modal');
        const deleted_username = modal.querySelector('.deleted-username');
        const ok_button = modal.querySelector('.ok-button');
        deleted_username.textContent = `${user.userName} deleted!`
        modal.classList.remove('hidden');
        ok_button.onclick = () => {
            modal.classList.add('hidden');
        }
    }
    display_user_details(user) {
        const { modal, display, profile, buttons, inputs, add_fields } = this.details;
        display.container.classList.remove("hidden");

        const display_fields = [display.fullName, display.username, display.email, display.role, display.status];
        display_fields.forEach(element => {
            element.classList.remove('hidden');
        })

        const display_only_rows = [display.status_div, display.created_div, display.edited_div, display.id_div];
        display_only_rows.forEach(row => {
            row.classList.remove("hidden");
        });

        Object.values(add_fields).forEach(field => {
            field.classList.add('hidden');
        })

        const input_fields = [inputs.fullName, inputs.email, inputs.role, inputs.status, inputs.username];
        input_fields.forEach(element => {
            element.classList.add("hidden");
        });

        buttons.close.classList.remove("hidden");
        buttons.cancel.classList.add("hidden");
        buttons.save.classList.add("hidden");

        profile.cover.src = user.coverImage;
        profile.avatar.src = user.avatar || "../assets/avatar-default-user-profile-icon-simple-flat-grey-vector-57234191.jpg";
        profile.fullName.textContent = user.fullName;
        profile.username.textContent = user.userName;
        profile.role.textContent = user.role;
        profile.created.textContent = new Date(user.createdAt).toLocaleDateString();

        display.fullName.textContent = user.fullName;
        display.username.textContent = "@" + user.userName;
        display.email.textContent = user.email;
        display.role.textContent = user.role;
        display.status.textContent = user.isDisabled ? "Disabled" : "Active";
        display.created.textContent = new Date(user.createdAt).toLocaleDateString();
        display.edited.textContent = new Date(user.updatedAt).toLocaleDateString();
        display.id.textContent = user._id;

        modal.classList.remove("hidden");

        buttons.close.onclick = () => {
            modal.classList.add("hidden");
            this.init(this.current_page);
        };
        this.set_edit_buttons(user)

    }
    set_edit_buttons(user) {
        const { edit: edit_btn, delete: delete_btn } = this.details.buttons;
        edit_btn.classList.add("hidden");
        delete_btn.classList.add("hidden");
        if (!this.permission.can_delete) {
            return;
        }
        edit_btn.classList.remove("hidden");
        delete_btn.classList.remove("hidden");
        edit_btn.onclick = () => {
            this.edit_user_details(user);
        };
        delete_btn.onclick = () => {
            this.open_delete_modal(user);
        };
    }
    edit_user_details(user) {
        const { display, inputs, buttons, form, add_fields } = this.details;
        display.container.classList.add('hidden');

        const display_fields = [display.fullName, display.email, display.role, display.status];
        display_fields.forEach(element => {
            element.classList.add("hidden");
        });

        buttons.edit.classList.add("hidden");
        buttons.delete.classList.add("hidden");
        buttons.close.classList.add("hidden");

        Object.values(add_fields).forEach(field => {
            field.classList.add('hidden');
        })

        inputs.fullName.value = user.fullName;
        inputs.email.value = user.email;
        inputs.role.value = user.role;
        inputs.status.value = user.isDisabled ? "disabled" : "active";
        const input_fields = [inputs.fullName, inputs.email, inputs.role, inputs.status];
        input_fields.forEach(element => {
            element.classList.remove("hidden");
        });
        buttons.save.classList.remove("hidden");
        buttons.cancel.classList.remove("hidden");
        buttons.save.textContent = 'Save';
        buttons.cancel.onclick = (e) => {
            e.stopImmediatePropagation();
            this.display_user_details(user);
        };
        form.onsubmit = async (e) => {
            e.preventDefault();
            if (!this.validate_user_form()) {
                return;
            }
            await this.save_user_details(user);
        };
    }
    async save_user_details(user) {
        const { inputs, buttons } = this.details;
        const updated_data = {
            fullName: inputs.fullName.value.trim(),
            email: inputs.email.value.trim(),
            role: inputs.role.value,
            isDisabled: inputs.status.value === "disabled"
        };
        try {
            buttons.save.disabled = true;
            buttons.cancel.disabled = true;
            await update_user_api(user._id, updated_data);
            user.fullName = updated_data.fullName;
            user.email = updated_data.email;
            user.role = updated_data.role;
            user.isDisabled = updated_data.isDisabled;
            user.updatedAt = new Date().toISOString();
            this.display_user_details(user);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            buttons.save.disabled = false;
            buttons.cancel.disabled = false;
        }
    }
    create_validation_rules(mode = 'edit') {
        const { inputs } = this.details;
        const rules = [
            {
                input: inputs.fullName,
                checking_items: [
                    { message: "Full name is required", validity: () => inputs.fullName.value.trim() !== "" }
                ]
            },
            {
                input: inputs.email,
                checking_items: [
                    { message: "Email is required", validity: () => inputs.email.value.trim() !== "" },
                    {
                        message: "Please enter a valid email", validity: () => {
                            const email = inputs.email.value.trim();
                            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
                        }
                    }
                ]
            }
        ];
        if (mode !== 'add') {
            return rules;
        }
        rules.push({
            input: inputs.username,
            checking_items: [
                { message: `Username is required`, validity: () => inputs.username.value.trim() !== '' },
                { message: "Username should only contain letters and numbers", validity: () => /^[a-zA-Z0-9]+$/.test(inputs.username.value) }

            ]
        }, {
            input: inputs.password,
            checking_items: [
                {
                    message: "Password is required",
                    validity: () =>
                        inputs.password.value.trim() !== ""
                }
            ]
        }, {
            input: inputs.avatar,
            checking_items: [
                {
                    message: "Avatar is requrired",
                    validity: () => inputs.avatar.value && inputs.avatar.files.length > 0
                },
                {
                    message: `Only webp images are allowed for Avatar`,
                    validity: () => {
                        const file = inputs.avatar.files?.[0];
                        return !file || file.type === "image/webp";
                    }
                }
            ]
        }, {
            input: inputs.coverImage,
            checking_items: [
                {
                    message: `Only webp images are allowed for Cover Image`,
                    validity: () => {
                        const file = inputs.coverImage.files?.[0];
                        return !file || file.type === "image/webp";
                    }
                }
            ]
        });
        return rules;
    }
    validate_user_form(mode = 'edit') {
        const validation_rules = this.create_validation_rules(mode);
        const err_msg = document.querySelector("#error-msg");
        err_msg.textContent = "";
        for (let field of validation_rules) {
            for (let check of field.checking_items) {
                if (!check.validity()) {
                    err_msg.textContent = check.message;
                    field.input.focus();
                    return false;
                }
            }
        }
        return true;
    }
    add_user() {
        const err_msg = document.querySelector("#error-msg");
        const { modal, display, inputs, buttons, add_fields, form } = this.details;
        display.container.classList.add("hidden");
        const display_only_rows = [display.status_div, display.created_div, display.edited_div, display.id_div];
        display_only_rows.forEach(row => {
            row.classList.add("hidden");
        });

        buttons.edit.classList.add("hidden");
        buttons.delete.classList.add("hidden");
        buttons.close.classList.add("hidden");
        buttons.save.classList.remove("hidden");
        buttons.cancel.classList.remove("hidden");

        buttons.save.textContent = 'Add';
        buttons.cancel.onclick = () => {
            modal.classList.add('hidden')
        }

        add_fields.password.classList.remove("hidden");
        add_fields.avatar.classList.remove("hidden");
        add_fields.coverImage.classList.remove("hidden");

        inputs.fullName.classList.remove("hidden");
        inputs.username.classList.remove("hidden");
        inputs.email.classList.remove("hidden");
        inputs.role.classList.remove('hidden')

        display.fullName.classList.add("hidden");
        display.username.classList.add("hidden");
        display.email.classList.add("hidden");

        modal.classList.remove('hidden');
        inputs.avatar.onchange = () => {

            const file_name = document.querySelector("#avatar-file-name");

            if (inputs.avatar.files.length > 0) {
                file_name.textContent = inputs.avatar.files[0].name;
            }
            else {
                file_name.textContent = "No file selected";
            }

        };
        inputs.coverImage.onchange = () => {

            const file_name = document.querySelector("#cover-file-name");

            if (inputs.coverImage.files.length > 0) {
                file_name.textContent = inputs.coverImage.files[0].name;
            }
            else {
                file_name.textContent = "No file selected";
            }

        };

        form.onsubmit = async (e) => {
            e.preventDefault();
            if (!this.validate_user_form('add')) {
                return;
            }
            try {
                err_msg.textContent = "";
                buttons.save.textContent = "Adding user...";
                const form_data = new FormData();
                form_data.append("fullName", inputs.fullName.value.trim());
                form_data.append("userName", inputs.username.value.trim());
                form_data.append("email", inputs.email.value.trim());
                form_data.append("password", inputs.password.value);
                form_data.append("role", inputs.role.value);

                if (inputs.avatar.files[0]) {
                    form_data.append("avatar", inputs.avatar.files[0]);
                }

                if (inputs.coverImage.files[0]) {
                    form_data.append("coverImage", inputs.coverImage.files[0]);
                }
                await register_user(form_data);
                modal.classList.add('hidden');
                this.init(this.current_page);
                this.reset_add_user_form();

            }
            catch (err) {
                err_msg.textContent = err.message;
            }
            finally {
                buttons.save.textContent = 'Add';

            }
        };
    }
    reset_add_user_form() {
        const { inputs } = this.details;

        inputs.fullName.value = "";
        inputs.username.value = "";
        inputs.email.value = "";
        inputs.password.value = "";
        inputs.role.value = "user";

        inputs.avatar.value = "";
        inputs.coverImage.value = "";

        document.querySelector("#avatar-file-name").textContent =
            "No file selected";

        document.querySelector("#cover-file-name").textContent =
            "No file selected";

        document.querySelector("#error-msg").textContent = "";
    }
}

async function init_dashboard() {
    try {
        const user = await check_user();
        if (!user) {
            throw new Error("Cannot load user")
        }

        current_user = new CurrentUser(user);
        const table = new UsersTable(current_user.permissions);
        table.handle_sort_change();
        table.handle_filter_change();
        await table.init(1);
    }
    catch (err) {
        console.log(err);
        return;
    }
}
init_dashboard();

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
