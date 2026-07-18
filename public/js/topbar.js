function toggleDropdown() {

    const menu = document.getElementById("dropdownMenu");

    menu.classList.toggle("show");

}

window.onclick = function(event) {

    if (!event.target.closest(".account-dropdown")) {

        const menu = document.getElementById("dropdownMenu");

        if (menu) {
            menu.classList.remove("show");
        }

    }

};