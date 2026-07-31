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