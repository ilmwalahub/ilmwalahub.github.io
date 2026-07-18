const toggleBtn = document.getElementById("toggleSidebar");
const sidebar = document.getElementById("sidebar");
const dashboard = document.querySelector(".dashboard-content");
const topbar = document.querySelector(".topbar");

toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    dashboard.classList.toggle("expanded");
    topbar.style.left = sidebar.classList.contains("collapsed") ? "60px" : "220px";
});