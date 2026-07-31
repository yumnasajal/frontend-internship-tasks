const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
if(!loggedUser){
    window.location.href = "task1_login.html";
}
function display_users() {
    const users = get_users();
    console.log(users);
    // Good rendering practice. Next step: break row creation into a separate function when this table grows more.
    const table_body = document.querySelector('#user_table');
    table_body.innerHTML = "";
    let number = 1;
    users.forEach(user => {
        const table_row = document.createElement('tr');

        const s_num_cell = document.createElement('td');
        s_num_cell.textContent = number++;

        const fn_cell = document.createElement('td');
        fn_cell.textContent = user.first_name;

        const ln_cell = document.createElement('td');
        ln_cell.textContent = user.last_name;

        const email_cell = document.createElement('td');
        email_cell.textContent = user.email;

        const password_cell = document.createElement('td');
        password_cell.textContent = "******";

        const profile_pic = document.createElement('td');
        const image = document.createElement('img');
        if (user.profile_picture) {
            image.src = user.profile_picture;
        }
        else {
            image.src = "../Assets/6522516.png";
        }
        image.classList.add('rounded-circle', 'img-thumbnail');
        image.style.width = "50px";
        image.style.height = "50px";
        image.style.objectFit = "cover";

        profile_pic.appendChild(image);

        table_row.appendChild(s_num_cell);
        table_row.appendChild(fn_cell);
        table_row.appendChild(ln_cell);
        table_row.appendChild(email_cell);
        table_row.appendChild(password_cell);
        table_row.appendChild(profile_pic);

        table_body.appendChild(table_row);
    });
}
display_users();

const logout_btn = document.querySelector("#logout");
logout_btn.addEventListener("click",()=>{
    localStorage.removeItem("loggedInUser");
    window.location.href="task1_login.html";
});