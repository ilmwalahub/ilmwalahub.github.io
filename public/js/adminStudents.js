// =========================
// Elements
// =========================

const studentModal = document.getElementById("studentModal");

const openStudentModal = document.getElementById("openStudentModal");
const closeStudentModal = document.getElementById("closeStudentModal");

const studentFormArea = document.getElementById("studentFormArea");
const studentResultArea = document.getElementById("studentResultArea");

const createStudentForm = document.getElementById("createStudentForm");

const resultName = document.getElementById("resultName");
const resultID = document.getElementById("resultID");
const resultCode = document.getElementById("resultCode");

const createAnother = document.getElementById("createAnother");
const copyWhatsapp = document.getElementById("copyWhatsapp");

// =========================
// Open Modal
// =========================

openStudentModal.onclick = () => {
    studentModal.style.display = "flex";
};

// =========================
// Close Modal
// =========================

closeStudentModal.onclick = () => {
    studentModal.style.display = "none";
    resetModal();
};

window.onclick = (e) => {
    if (e.target === studentModal) {
        studentModal.style.display = "none";
        resetModal();
    }
};

// =========================
// Submit Form
// =========================

createStudentForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = createStudentForm.querySelector('input[name="name"]').value.trim();

    if (!name) {
        alert("Please enter student name.");
        return;
    }

    try {

        const response = await fetch("/admin/create-student", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name
            })

        });

        const data = await response.json();

        if (!data.success) {
            alert(data.message || "Something went wrong.");
            return;
        }

        studentFormArea.style.display = "none";
        studentResultArea.style.display = "block";

        resultName.value = data.name;
        resultID.value = data.student_id;
        resultCode.value = data.code;

    } catch (err) {

        console.error(err);
        alert("Failed to communicate with server.");

    }

});

// =========================
// Copy Buttons
// =========================

document.querySelectorAll(".copy-btn").forEach(btn => {

    btn.onclick = () => {

        const input = document.getElementById(btn.dataset.copy);

        navigator.clipboard.writeText(input.value);

        const old = btn.innerHTML;

        btn.innerHTML = "✓";

        setTimeout(() => {

            btn.innerHTML = old;

        }, 1500);

    };

});

// =========================
// Copy WhatsApp
// =========================

copyWhatsapp.onclick = () => {

    const message =
`Student Name: ${resultName.value}

Student ID: ${resultID.value}

Setup Code: ${resultCode.value}

Visit:

WEBSITE_LINK/student/create-password

Enter your Student ID and Setup Code to create your password.`;

    navigator.clipboard.writeText(message);

    const old = copyWhatsapp.innerHTML;

    copyWhatsapp.innerHTML = "✓ Copied";

    setTimeout(() => {

        copyWhatsapp.innerHTML = old;

    }, 2000);

};

// =========================
// Create Another
// =========================

createAnother.onclick = () => {

    resetModal();

};

// =========================
// Reset
// =========================

function resetModal() {

    createStudentForm.reset();

    studentFormArea.style.display = "block";
    studentResultArea.style.display = "none";

    resultName.value = "";
    resultID.value = "";
    resultCode.value = "";

}