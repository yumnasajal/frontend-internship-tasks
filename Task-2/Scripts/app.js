// google button 
// localStorage.clear();
const google_button = document.querySelector('.continue-google-button');
const google_icon = document.createElement('i');
google_icon.classList.add('fa-brands', 'fa-google', 'me-1');
const google_img = document.querySelector('.google-img');

google_button.addEventListener('mouseover', function () {
    google_img.remove();
    google_button.prepend(google_icon);
})
google_button.addEventListener('mouseleave', function () {
    google_icon.remove();
    google_button.prepend(google_img);
})

// show/hide password

const eye_icon = document.querySelectorAll('.eye-icon');
for (let eye of eye_icon) {
    const password_input = eye.parentElement.parentElement.previousElementSibling;
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

// required fields 
const password = {
    input: document.querySelector('#password'),
    name: "Password",
    get value() { return this.input.value.trim(); },
    isEmpty() { return !this.value; },
    filled: false
}

const email = {
    input: document.querySelector('#email'),
    name: "Email",
    get value() { return this.input.value.trim(); },
    isEmpty() { return !this.value; },
    filled: false,
}

const confirm_password = {
    input: document.querySelector('#confirm_password'),
    name: "Confirm Password",
    get value() { return this.input ? this.input.value.trim() : null },
    isEmpty() { return !this.value; },
    filled: false
}

function save_users(user_array) {
    localStorage.setItem('users', JSON.stringify(user_array));
}

function get_users() {
    const stored_users = localStorage.getItem("users");
    return stored_users ? JSON.parse(stored_users) : [];
}

const signup_form = document.querySelector('#signup_form');
const login_form = document.querySelector('#login_form');
const req_msg = document.querySelector('#required_msg');
const submit_button = document.querySelector('#submit_button');
let users = get_users();
let profile_img = "";

const p_checklist = document.querySelector('#p_checklist');
const p_checklist_items = [
    { name: "length_check", message: "Atleast 8 characters", check() { return password.value.length >= 8 } },
    { name: "upper_check", message: "Atleast 1 uppercase letter", check() { return password.value !== password.value.toLowerCase() ? true : false } },
    { name: "number_check", message: "Atleast 1 number", check() { return [...password.value].some(char => (char !== ' ') && (!isNaN(char))); } }
];

const e_checklist_items = [
    {
        name: "validity_check", message: "Email not valid", check() {
            const parts = email.value.split('@');
            if (parts.length !== 2 || !parts.every(part => part) || !parts[1].includes('.')) return false;
            const end = email.value.split('.').pop();
            if (!end || end.length < 2 || !isNaN(end)) return false;
            return true;
        }
    }
]

if (signup_form) {
    signup_form.addEventListener('submit', signupCheck);
}
if (login_form) {
    login_form.addEventListener('submit', loginCheck);
}

function showError(field) {
    field.input.classList.add('border-danger');
    field.input.previousElementSibling.classList.add('border-danger');
    if (field.input.nextElementSibling !== null) {
        field.input.nextElementSibling.classList.add('border-danger');
    }
}

function removeError(field) {
    field.input.classList.remove('border-danger');
    field.input.previousElementSibling.classList.remove('border-danger');
    if (field.input.nextElementSibling !== null) {
        field.input.nextElementSibling.classList.remove('border-danger');
    }
    req_msg.textContent = "";
}

function signupCheck(e) {
    e.preventDefault();
    let empty_fields = [];
    if (password.isEmpty() || !passChecklist(p_checklist_items)) {
        empty_fields.push(password);
    }
    if (email.isEmpty() || !passChecklist(e_checklist_items)) {
        empty_fields.push(email);
    }
    if (confirm_password.input && (confirm_password.isEmpty() || !passChecklist(cp_checklist_items))) {
        empty_fields.push(confirm_password);
    }
    if (empty_fields.length > 0) {
        empty_fields.forEach(field => {
            showError(field);
        });
        let message = empty_fields.map(field => field.name).join(", ");
        const error_icon = document.createElement('i');
        error_icon.classList.add('fa-solid', 'fa-exclamation', 'me-2');
        req_msg.textContent = "";
        req_msg.append(error_icon, `${message} ${empty_fields.length > 1 ? "are" : "is"} required.`);
        req_msg.classList.remove('text-success');
        req_msg.classList.add('text-danger');
        submit_button.disabled = true;
        return;
    }
    req_msg.textContent = "";
    console.log('submitted');
    first_name = document.querySelector('#first_name').value;
    last_name = document.querySelector('#last_name').value;
    const new_user = { first_name, last_name, email: email.value, password: password.value, profile_picture: profile_img };
    users.push(new_user);
    save_users(users);
}

function loginCheck(e) {
    e.preventDefault();
    let empty_fields = [];
    if (password.isEmpty()) {
        empty_fields.push(password);
    }
    if (email.isEmpty()) {
        empty_fields.push(email);
    }
    if (empty_fields.length > 0) {
        empty_fields.forEach(field => { showError(field); });
        let message = empty_fields.map(field => field.name).join(", ");
        req_msg.textContent = `${message} ${empty_fields.length > 1 ? "are" : "is"} required.`;
        req_msg.classList.add('text-danger');
        submit_button.disabled = true;
        return;
    }

    req_msg.textContent = "";
    let login_check = users.some(user => (
        user.password === password.value && user.email === email.value
    ));
    if (!login_check) {
        const error_icon = document.createElement('i');
        error_icon.classList.add('fa-solid', 'fa-exclamation', 'me-2');
        req_msg.textContent = "";
        req_msg.append(error_icon, `Email and Password donot match.`);
        req_msg.classList.remove('text-success');
        req_msg.classList.add('text-danger');
    }
    else {
        console.log('Login Successful')
    }

}


email.input.addEventListener('input', () => {
    if (!email.isEmpty() && passChecklist(e_checklist_items)) {
        removeError(email);
        email.filled = true;
        checkAllFieldsFilled();
    }
    else {
        email.filled = false;
        showError(email);
    }
});

if (confirm_password.input) {
    confirm_password.input.addEventListener('input', () => {
        if (!confirm_password.isEmpty() && passChecklist(cp_checklist_items)) {
            removeError(confirm_password);
            confirm_password.filled = true;
            checkAllFieldsFilled();
        }
        else {
            confirm_password.filled = false;
            showError(confirm_password);
        }
    });
}

password.input.addEventListener('input', () => {
    if (!password.isEmpty() && passChecklist(p_checklist_items)) {
        removeError(password);
        password.filled = true;
        checkAllFieldsFilled();
    }
    else {
        password.filled = false;
        showError(password)
    }
});

function checkAllFieldsFilled() {
    if (email.filled && password.filled && (!confirm_password.input || confirm_password.filled)) {
        submit_button.disabled = false;
        req_msg.textContent = "";
    }
}

// password requirements

if (p_checklist) {
    password.input.addEventListener('change', function () {
        inputChecklist(p_checklist, p_checklist_items);
    })
}

function passChecklist(checklist) {
    return checklist.every(item => item.check());
}

function inputChecklist(checklist, checklist_items) {
    checklist.innerHTML = "";
    for (let item of checklist_items) {
        if (item.check()) { continue };
        const l_item = document.createElement('li');
        l_item.textContent = item.message;
        checklist.appendChild(l_item);
    }
}

const cp_checklist = document.querySelector('#cp_checklist');
const cp_checklist_items = [{ name: "password_match", message: "Passwords donot match", check() { return password.value === confirm_password.value } }];
const e_checklist = document.querySelector('#e_checklist');

if (cp_checklist) {
    confirm_password.input.addEventListener('change', function () {
        inputChecklist(cp_checklist, cp_checklist_items);
    });
}
if (e_checklist){
    email.input.addEventListener('change', function () {
        inputChecklist(e_checklist, e_checklist_items);
    })
}

// Avatar update

const profile_picture = document.querySelector('.profile-picture');
const profile_input = document.querySelector('#profile_image');
const extra_div = document.querySelector('.extra-div');

if (extra_div) {
    const profile_icon = extra_div.querySelector('i');
    const profile_text = extra_div.querySelector('.picture-text');
    profile_hover();
    profile_input.addEventListener('change', function () {
        const file = profile_input.files[0];
        const reader = new FileReader();
        if (file && file.type.startsWith("image/")) {
            const image_url = URL.createObjectURL(file);
            profile_picture.style.backgroundImage = `url(${image_url})`;
            profile_picture.classList.add('profile-image');
            profile_icon.style.display = "none";
            profile_text.style.display = "none";
            reader.readAsDataURL(file);
        }
        reader.onload = function () {
            console.log("Profile result loaded");
            profile_img = reader.result;
        }
    })
    function profile_hover() {
        profile_picture.addEventListener('mouseenter', function () {
            if (profile_picture.classList.contains('profile-image')) {
                profile_icon.style.display = "block";
                profile_text.textContent = "Remove Avatar"
                profile_text.classList.add('px-2')
                profile_text.style.display = "block";
                profile_picture.classList.remove('hover-class');
            }
        })
        profile_picture.addEventListener('mouseleave', function () {
            if (profile_picture.classList.contains('profile-image')) {
                profile_icon.style.display = "none";
                profile_text.style.display = "none";
            }
        });
    }
    profile_picture.addEventListener('click', function (e) {
        if (profile_picture.classList.contains('profile-image')) {
            e.preventDefault();
            profile_picture.style.backgroundImage = "none";
            profile_picture.classList.remove('profile-image');
            profile_text.textContent = "Add your avatar";
            profile_text.classList.remove('px-2');
            profile_text.style.display = "block";
            profile_icon.style.display = "block";
            profile_input.value = "";
            profile_img = "";
        }
    })
}