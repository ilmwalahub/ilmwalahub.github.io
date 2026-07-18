console.log("adminTeachers.js loaded");

// =========================
// Elements
// =========================

const teacherModal = document.getElementById("teacherModal");

const openTeacherModal = document.getElementById("openCreateTeacher");
const closeTeacherModal = document.getElementById("closeTeacherModal");

const teacherFormArea = document.getElementById("teacherFormArea");
const teacherResultArea = document.getElementById("teacherResultArea");

const createTeacherForm = document.getElementById("createTeacherForm");

const resultTeacherName = document.getElementById("resultTeacherName");
const resultTeacherID = document.getElementById("resultTeacherID");
const resultTeacherCode = document.getElementById("resultTeacherCode");

const createAnotherTeacher = document.getElementById("createAnotherTeacher");
const copyTeacherWhatsapp = document.getElementById("copyTeacherWhatsapp");

// =========================
// Course Dropdown
// =========================

const courseDropdownBtn = document.getElementById("courseDropdownBtn");
const courseDropdown = document.getElementById("courseDropdown");

courseDropdownBtn.addEventListener("click", function (e) {

    e.stopPropagation();

    if (courseDropdown.style.display === "block") {

        courseDropdown.style.display = "none";

    } else {

        courseDropdown.style.display = "block";

    }

});

// Close when clicking outside
document.addEventListener("click", function (e) {

    if (
        !courseDropdown.contains(e.target) &&
        e.target !== courseDropdownBtn
    ) {

        courseDropdown.style.display = "none";

    }

});
// =========================
// Open
// =========================

openTeacherModal.onclick = () => {

    teacherModal.style.display = "flex";

};


// =========================
// Close
// =========================

closeTeacherModal.onclick = () => {

    teacherModal.style.display = "none";

    resetTeacherModal();

};

window.onclick = function(e){

    if(e.target===teacherModal){

        teacherModal.style.display="none";

        resetTeacherModal();

    }

};


// =========================
// Submit
// =========================

createTeacherForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const selectedCourses = [];

    document
        .querySelectorAll('input[name="courses"]:checked')
        .forEach(box => selectedCourses.push(box.value));

    const body = new URLSearchParams();

    body.append("name", createTeacherForm.name.value);

    selectedCourses.forEach(course => {
        body.append("courses", course);
    });

    const response = await fetch("/admin/create-teacher", {

        method: "POST",

        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },

        body: body.toString()

    });

    const data = await response.json();

    if (!data.success) {
        alert(data.message || "Failed to create teacher.");
        return;
    }

    teacherFormArea.style.display = "none";
    teacherResultArea.style.display = "block";

    resultTeacherName.value = data.name;
    resultTeacherID.value = data.teacher_id;
    resultTeacherCode.value = data.setup_code;

});


// =========================
// Copy Buttons
// =========================

document.querySelectorAll(".teacher-copy").forEach(btn=>{

    btn.onclick=()=>{

        const input=document.getElementById(btn.dataset.copy);

        navigator.clipboard.writeText(input.value);

        const old=btn.innerHTML;

        btn.innerHTML="✓";

        setTimeout(()=>{

            btn.innerHTML=old;

        },1500);

    };

});


// =========================
// WhatsApp
// =========================

copyTeacherWhatsapp.onclick=()=>{

const message=`Teacher Name: ${resultTeacherName.value}

Teacher ID: ${resultTeacherID.value}

Setup Code: ${resultTeacherCode.value}

Visit:

WEBSITE_LINK/teacher/create-password

Use the Teacher ID and Setup Code to activate your account.`;

navigator.clipboard.writeText(message);

copyTeacherWhatsapp.innerHTML="✓ Copied";

setTimeout(()=>{

copyTeacherWhatsapp.innerHTML="📋 Copy WhatsApp Details";

},2000);

};


// =========================
// Another
// =========================

createAnotherTeacher.onclick=()=>{

resetTeacherModal();

};


// =========================
// Reset
// =========================

function resetTeacherModal(){

createTeacherForm.reset();

teacherFormArea.style.display="block";

teacherResultArea.style.display="none";

resultTeacherName.value="";

resultTeacherID.value="";

resultTeacherCode.value="";

}