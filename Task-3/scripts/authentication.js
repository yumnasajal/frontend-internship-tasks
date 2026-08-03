// elements

const fields = {
    first_name: document.querySelector('#first-name'),
    last_name: document.querySelector('#last-name'),
    username: document.querySelector('#username'),
    email: document.querySelector('#email'),
    password: document.querySelector('#password'),
    confirm_password: document.querySelector('#confirm-password'),
    role: document.querySelector('#role'),
    avatar: document.querySelector('#avatar'),

    username_or_email: document.querySelector('#username-or-email'),
    login_password: document.querySelector('#login-password'),

    submit_button: document.querySelector('#submit-button'),
    required_msg: document.querySelector('#required-msg'),
    signup_form: document.querySelector('#signup-form'),
    login_form: document.querySelector('#login-form')
}

// hover effect for google button

const google_button = document.querySelector('#google-button');
const google_icon = document.createElement('i');
if (google_button) {
    google_icon.classList.add('fa-brands', 'fa-google', 'group-hover:text-white', 'me-1');
    const google_img = document.querySelector('#google-img');

    google_button.addEventListener('mouseover', function () {
        google_img.remove();
        google_button.prepend(google_icon);
    })
    google_button.addEventListener('mouseleave', function () {
        google_icon.remove();
        google_button.prepend(google_img);
    })
}

// show/hide password 

const eye_icon = document.querySelectorAll('.eye-icon');
for (let eye of eye_icon) {
    const password_input = eye.parentElement.previousElementSibling;
    eye.addEventListener('click', function () {
        eye.classList.toggle('fa-eye');
        eye.classList.toggle('fa-eye-slash');
        if (password_input.type == "password") {
            password_input.type = "text";
        }
        else {
            password_input.type = "password";
        }
    });
}

// pages

const home_page = "home_crud.html";
const login_page = "login.html";
const signup_page = "signup.html";

// inputs

const email = {
    input: fields.email,
    name: "Email",
    valid: false,
    get value() {
        return this.input.value.trim();
    },
    isEmpty() {
        return !this.value;
    },
    checklist_items: [
        {
            message: "Email not valid",
            check() {
                const parts = email.value.split('@');
                if (parts.length !== 2 || !parts.every(part => part) || !parts[1].includes('.')) return false;
                const end = email.value.split('.').pop();
                if (!end || end.length < 2 || !isNaN(end)) return false;
                if (email.value.includes(" ")) return false;
                return true;
            }
        },
    ],
    error: document.querySelector('#email-error'),
}

const username = {
    input: fields.username,
    name: "Username",
    valid: false,
    get value() {
        return this.input.value.trim();
    },
    isEmpty() {
        return !this.value;
    },
    checklist_items: [
        {
            message: "Username should not contain whitespaces",
            check() {
                if (username.value.includes(" ")) return false;
                return true;
            }
        },
        {
            message: "Cannot contain '@'",
            check() {
                return !username.value.includes("@");
            }
        }
    ],
    error: document.querySelector('#username-error'),
};

const password = {
    input: fields.password,
    name: 'Password',
    valid: false,
    get value() {
        return this.input.value.trim();
    },
    isEmpty() {
        return !this.value;
    },
    checklist_items: [
        {
            message: "At least 8 characters",
            check() {
                return password.value.length >= 8;
            }
        },
        {
            message: "At least 1 uppercase letter",
            check() {
                return password.value !== password.value.toLowerCase() ? true : false;
            }
        },
        {
            message: "At least 1 number",
            check() {
                return [...password.value].some(char => (char !== ' ') && (!isNaN(char)));
            }
        },
        {
            message: "Password should not contain whitespaces",
            check() {
                if (password.value.includes(" ")) return false;
                return true;
            }
        }
    ],
    error: document.querySelector('#password-error')
};

const confirm_password = {
    input: fields.confirm_password,
    name: "Confirm Password",
    valid: false,
    get value() {
        return this.input.value.trim();
    },
    isEmpty() {
        return !this.value;
    },
    checklist_items: [
        {
            message: "Passwords donot match",
            check() {
                return password.value === confirm_password.value;
            }
        }
    ],
    error: document.querySelector('#confirm-password-error'),
};

const avatar = {
    name: "Profile Picture",
    input: fields.avatar,
    valid: false,
    get value() {
        return this.input.files[0];
    },
    isEmpty() {
        return !this.value;
    },
    checklist_items: [
        {
            message: "Only webp images are allowed",
            check() {
                return avatar.value && avatar.value.type == "image/webp";
            }
        }
    ],
    error: document.querySelector('#avatar-error')
}

const login_cred = {
    input: fields.username_or_email,
    name: "Email or Username",
    valid: false,
    get value() {
        return this.input.value.trim();
    },
    isEmpty() {
        return !this.value;
    },
    error: document.querySelector('#email-or-username-error')
}
const login_password = {
    input: fields.login_password,
    name: "Password",
    valid: false,
    get value() {
        return this.input.value.trim();
    },
    isEmpty() {
        return !this.value;
    },
    error: document.querySelector('#login-password-error')
}
const fields_to_validate = [username, email, password, confirm_password, avatar];

const profile_container = document.querySelector('#avatar-div')
let profile_img;
let profile_text;
let profile_overlay;
if (profile_container) {
    profile_img = profile_container.querySelector('img');
    profile_text = profile_container.querySelector('label');
    profile_overlay = document.querySelector('#overlay-avatar');
}

if (fields.signup_form) {
    fields.signup_form.addEventListener('submit', signup_check);
}
if (fields.login_form) {
    fields.login_form.addEventListener('submit', login_check);
}

async function login_check(e) {
    e.preventDefault();
    let is_valid = true;
    for (let field of [login_cred, login_password]) {
        if (!validate_field(field)) {
            is_valid = false;
        }
    }
    if (!is_valid) {
        fields.required_msg.textContent = "Please fix the errors first";
        return;
    }
    fields.required_msg.textContent = "";
    try {
        const login_fields = { password: login_password.value };
        if (login_cred.value.includes('@')) {
            login_fields.email = login_cred.value;
        }
        else {
            login_fields.userName = login_cred.value;
        }
        fields.submit_button.disabled = true;
        fields.submit_button.textContent = "Logging in...";
        const result = await login(login_fields);
        localStorage.setItem("access_token", result.data.accessToken);
        localStorage.setItem("refresh_token", result.data.refreshToken);
        window.location.href = home_page;

        fields.login_form.reset();
        console.log(result);
    }
    catch (err) {
        console.log("Error", err);
        fields.required_msg.textContent = err.message;
        fields.required_msg.classList.add('text-pink-800');
        fields.required_msg.classList.remove('text-mutedteal');
    }
    finally {
        fields.submit_button.disabled = false;
        fields.submit_button.textContent = "Login";
    }
}

async function signup_check(e) {
    e.preventDefault();
    let is_valid = true;
    for (let field of fields_to_validate) {
        if (!validate_field(field)) {
            is_valid = false;
        }
    }
    if (!is_valid) {
        fields.required_msg.textContent = "Please fix the errors first";
        return;
    }
    fields.required_msg.textContent = "";
    const user_data = new FormData();
    user_data.append("userName", username.value);
    user_data.append("email", email.value);
    user_data.append("fullName", `${fields.first_name.value} ${fields.last_name.value}`);
    user_data.append("password", password.value);
    user_data.append("avatar", avatar.value);
    user_data.append("role", fields.role.value);
    try {
        fields.submit_button.disabled = true;
        fields.submit_button.textContent = "Creating Account...";
        const result = await register(user_data);

        console.log(result);
        fields.required_msg.textContent = "Account Created Successfully";
        fields.required_msg.classList.add('text-mutedteal')
        fields.required_msg.classList.remove('text-pink-800')
        fields.signup_form.reset();
        window.location.href = login_page;
    }
    catch (err) {
        console.log("Error", err);
        fields.required_msg.textContent = err.message;
        fields.required_msg.classList.add('text-pink-800');
        fields.required_msg.classList.remove('text-mutedteal');
    }
    finally {
        fields.submit_button.disabled = false;
        fields.submit_button.textContent = "Sign Up";
    }
}

function showError(field, msg) {
    field.input.parentElement.classList.add('border-pink-800');
    field.error.textContent = `${msg}`;
}

function removeError(field) {
    field.input.parentElement.classList.remove('border-pink-800');
    field.error.textContent = "";
}

function validate_field(field) {
    if (field.isEmpty()) {
        field.valid = false;
        showError(field, `${field.name} is required`)
        return false;
    }
    if (field.checklist_items) {
        const failed_rule = field.checklist_items.find(rule => !rule.check());
        if (failed_rule) {
            field.valid = false;
            showError(field, failed_rule.message);
            return false;
        }
    }
    field.valid = true;
    removeError(field);
    return true;
}

async function add_event_listener(field, event) {
    field.input.addEventListener(`${event}`, async () => {
        fields.required_msg.textContent = "";
        if (field === avatar) {
            if (validate_field(field)) {
                await preview_img(field.value);
            }
            return;
        }
        validate_field(field);
    })
}

async function preview_img(file) {
    try {
        const reader = new FileReader();
        reader.onload = function () {
            profile_img.src = reader.result;
            profile_img.classList.add('w-full', 'h-full', 'object-cover');
            profile_text.textContent = "Change Avatar";
            profile_overlay.classList.remove('opacity-70')
            profile_overlay.classList.add('opacity-0');
        }
        reader.onerror = function () {
            throw new Error("Unable to load image")
        };
        reader.readAsDataURL(file);
    }
    catch (e) {
        showError(avatar, e.message);
        avatar.valid = false;
    }
}

if (fields.signup_form) {
    add_event_listener(password, 'blur');
    add_event_listener(username, 'blur');
    add_event_listener(email, 'blur');
    add_event_listener(confirm_password, 'blur');
    add_event_listener(avatar, 'change');
}
if (fields.login_form) {
    add_event_listener(login_password, 'blur');
    add_event_listener(login_cred, 'blur');
}