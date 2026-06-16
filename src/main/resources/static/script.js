// async function registerVolunteer() {

//     const volunteer = {
//         name: document.getElementById("name").value,
//         email: document.getElementById("email").value,
//         phone: document.getElementById("phone").value
//     };

//     // Validation FIRST
//     if (
//         volunteer.name === "" ||
//         volunteer.email === "" ||
//         volunteer.phone === ""
//     ) {
//         showToast("⚠ Please fill all fields", true);
//         return;
//     }

//     if (volunteer.phone.length !== 10) {
//         alert("Enter valid phone number");
//         return;
//     }
//     if(!/^\d{10}$/.test(volunteer.phone)){
//         alert("Phone number must be 10 digits");
//         return;
//     }

//     try {

//         const url = window.currentVolunteerId
//             ? `http://localhost:8081/api/volunteers/${window.currentVolunteerId}`
//             : "http://localhost:8081/api/volunteers";

//         const method = window.currentVolunteerId ? "PUT" : "POST";

//         const response = await fetch(url, {
//             method: method,
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(volunteer)
//         });

//         if (response.ok) {

//             const msg=document.getElementById("message");
                
//             if(msg){
//                 showToast("✅ Volunteer Registered Successfully");
//             }

//             document.getElementById("name").value = "";
//             document.getElementById("email").value = "";
//             document.getElementById("phone").value = "";

//             window.currentVolunteerId = null;

//             document.getElementById("registerBtn").innerText = "Register";
//             if(!volunteer.email.includes("@")){
//                 alert("Enter valid email");
//                 return;
//             }

//             loadVolunteers();

//         } else {
//             alert("Registration Failed");
//         }

//     } catch (error) {
//         console.error(error);
//         alert("Server Error");
//     }
// }
// async function loadVolunteers() {

//     const response = await fetch(
//         "http://localhost:8081/api/volunteers"
//     );

//     const volunteers = await response.json();
//     console.log("Volunteers:", volunteers);
//     console.log("Count:", volunteers.length);

// let html = `
//     <h2>Registered Volunteers</h2>
//     <h3>Total Volunteers: ${volunteers.length}</h3>

//     <table border="1" cellpadding="10">
//         <tr>
//             <th>S.No</th>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Action</th>
//         </tr>
// `;

//     volunteers.forEach((v,index) => {

//         html += `
//             <tr>
//                 <td>${index+1}</td>
//                 <td>${v.id}</td>
//                 <td>${v.name}</td>
//                 <td>${v.email}</td>
//                 <td>${v.phone}</td>
//                 <td>
//                     <button type="button" onclick="editVolunteer(${v.id}, '${v.name}', '${v.email}', '${v.phone}')">
//                         Edit
//                     </button>
    
//                     <button onclick="openDeleteModal(${v.id})">
//                         Delete
//                     </button>
//                 </td>
//             </tr>
//         `;

//     });

//     html += `</table>`;

//     document.getElementById("volunteerList").innerHTML = html;
// }
// async function deleteVolunteer(id) {

//     if(!confirm("Are you sure you want to delete this volunteer?")){
//         return;
//     }
//     const response = await fetch(
//         `http://localhost:8081/api/volunteers/${id}`,
//         {
//             method: "DELETE"
//         }
//     );
//     if(response.ok){
//         alert("Volunteer Deleted Successfully!");
//         loadVolunteers();
//     } else {
//         showToast(" ❌Delete Failed!");
//     }
// }
// function editVolunteer(id, name, email, phone) {

//     document.getElementById("name").value = name;
//     document.getElementById("email").value = email;
//     document.getElementById("phone").value = phone;

//     window.currentVolunteerId = id;

//     document.getElementById("registerBtn").innerText = "Update Volunteer";
// }
// function searchVolunteer() {
//     let input = document.getElementById("searchBox").value.toLowerCase();

//     let rows = document.querySelectorAll("#volunteerList table tr");

//     rows.forEach((row, index) => {
//         if(index === 0) return;

//         let text = row.innerText.toLowerCase();

//         row.style.display =
//             text.includes(input) ? "" : "none";
//     });
// }
// function showToast(message, isError = false) {

//     const toast = document.getElementById("toast");

//     toast.innerText = message;

//     toast.className = "show";

//     if (isError) {
//         toast.classList.add("error");
//     }

//     setTimeout(() => {
//         toast.className = "";
//     }, 3000);
// }
// let volunteerToDelete = null;

// function openDeleteModal(id){
//     volunteerToDelete = id;
//     document.getElementById("deleteModal").style.display = "flex";
// }

// function closeModal(){
//     document.getElementById("deleteModal").style.display = "none";
// }

// document.getElementById("confirmDelete").onclick = async function(){

//     const response = await fetch(
//         `http://localhost:8081/api/volunteers/${volunteerToDelete}`,
//         {
//             method:"DELETE"
//         }
//     );

//     if(response.ok){
//         showToast("✅ Volunteer deleted successfully");
//         loadVolunteers();
//     }

//     closeModal();
// };
window.currentVolunteerId = null;
let volunteerToDelete = null;

/* =========================
   REGISTER / UPDATE
========================= */
async function registerVolunteer() {

    const volunteer = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim()
    };

    // Validation
    if (
        volunteer.name === "" ||
        volunteer.email === "" ||
        volunteer.phone === ""
    ) {
        showToast("⚠ Please fill all fields", true);
        return;
    }

    if (!volunteer.email.includes("@")) {
        showToast("⚠ Enter a valid email", true);
        return;
    }

    if (!/^\d{10}$/.test(volunteer.phone)) {
        showToast("⚠ Phone number must be 10 digits", true);
        return;
    }

    try {

        const url = window.currentVolunteerId
            ? `http://localhost:8081/api/volunteers/${window.currentVolunteerId}`
            : "http://localhost:8081/api/volunteers";

        const method = window.currentVolunteerId
            ? "PUT"
            : "POST";

        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(volunteer)
        });

        if (response.ok) {

            if (window.currentVolunteerId) {
                showToast("✅ Volunteer Updated Successfully");
            } else {
                showToast("✅ Volunteer Registered Successfully");
            }

            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("phone").value = "";

            window.currentVolunteerId = null;

            document.getElementById("registerBtn").innerText =
                "Register";

            loadVolunteers();

        } else {
            showToast("❌ Operation Failed", true);
        }

    } catch (error) {
        console.error(error);
        showToast("❌ Server Error", true);
    }
}

/* =========================
   LOAD VOLUNTEERS
========================= */
async function loadVolunteers() {

    try {

        const response = await fetch(
            "http://localhost:8081/api/volunteers"
        );

        const volunteers = await response.json();

        let html = `
            <h2>Registered Volunteers</h2>

            <h3 class="total-count">
                Total Volunteers: ${volunteers.length}
            </h3>

            <table border="1" cellpadding="10">
                <tr>
                    <th>S.No</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Action</th>
                </tr>
        `;

        volunteers.forEach((v, index) => {

            html += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${v.id}</td>
                    <td>${v.name}</td>
                    <td>${v.email}</td>
                    <td>${v.phone}</td>

                    <td>

                        <button
                            type="button"
                            onclick="editVolunteer(
                                ${v.id},
                                '${v.name}',
                                '${v.email}',
                                '${v.phone}'
                            )">
                            Edit
                        </button>

                        <button
                            type="button"
                            onclick="openDeleteModal(${v.id})">
                            Delete
                        </button>

                    </td>
                </tr>
            `;
        });

        html += `</table>`;

        document.getElementById("volunteerList").innerHTML = html;

    } catch (error) {
        console.error(error);
        showToast("❌ Failed to Load Volunteers", true);
    }
}

/* =========================
   EDIT VOLUNTEER
========================= */
function editVolunteer(id, name, email, phone) {

    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
    document.getElementById("phone").value = phone;

    window.currentVolunteerId = id;

    document.getElementById("registerBtn").innerText =
        "Update Volunteer";

    window.scrollTo({
        top: document.querySelector(".volunteer-form").offsetTop,
        behavior: "smooth"
    });
}

/* =========================
   SEARCH
========================= */
function searchVolunteer() {

    let input =
        document.getElementById("searchBox")
        .value
        .toLowerCase();

    let rows =
        document.querySelectorAll(
            "#volunteerList table tr"
        );

    rows.forEach((row, index) => {

        if (index === 0) return;

        let text = row.innerText.toLowerCase();

        row.style.display =
            text.includes(input)
                ? ""
                : "none";
    });
}

/* =========================
   TOAST MESSAGE
========================= */
function showToast(message, isError = false) {

    const toast =
        document.getElementById("toast");

    toast.innerText = message;

    toast.className = "show";

    if (isError) {
        toast.classList.add("error");
    }

    setTimeout(() => {
        toast.className = "";
    }, 3000);
}

/* =========================
   DELETE MODAL
========================= */
function openDeleteModal(id) {

    volunteerToDelete = id;

    document.getElementById("deleteModal")
        .style.display = "flex";
}

function closeModal() {

    document.getElementById("deleteModal")
        .style.display = "none";
}

/* =========================
   DELETE CONFIRMATION
========================= */
window.onload = function () {

    const confirmBtn =
        document.getElementById("confirmDelete");

    if (confirmBtn) {

        confirmBtn.onclick = async function () {

            const response = await fetch(
                `http://localhost:8081/api/volunteers/${volunteerToDelete}`,
                {
                    method: "DELETE"
                }
            );

            if (response.ok) {

                showToast(
                    "✅ Volunteer Deleted Successfully"
                );

                loadVolunteers();

            } else {

                showToast(
                    "❌ Delete Failed",
                    true
                );
            }

            closeModal();
        };
    }
};