// Template selection function
let selectedTemplate = ""; // Variable to store selected template

// Template selection function
function selectTemplate(template) {
    selectedTemplate = template;
    const templateButtons = document.querySelectorAll(".template");

    // Remove active class from all buttons
    templateButtons.forEach((btn) => {
        btn.classList.remove("active-template");
    });

    // Add active class to selected button
    event.target.classList.add("active-template");

    // Update the template info in the preview
    // document.getElementById("selectedTemplateInfo").textContent = template;

    // Show template preview in modal
    showTemplatePreview(template);
}

// Function to show template preview in modal
function showTemplatePreview(template) {
    // Clear the modal content first
    const modalContent = document.getElementById("modalCvContent");
    modalContent.innerHTML = "";

    // Create template preview content
    const previewDiv = document.createElement("div");
    previewDiv.className = "template-preview";

    // Add template preview content
    previewDiv.innerHTML = `
        <h3>Template Preview: ${template}</h3>
        <div class="template-preview-visual">
            <div class="template-${template}-demo">
                ${
                    template === "template1"
                        ? `
                    <div class="demo-header"></div>
                    <div class="demo-content">
                        <div class="demo-line"></div>
                        <div class="demo-line"></div>
                        <div class="demo-line short"></div>
                    </div>
                `
                        : `
                    <div class="demo-sidebar"></div>
                    <div class="demo-content">
                        <div class="demo-line"></div>
                        <div class="demo-line"></div>
                        <div class="demo-line short"></div>
                    </div>
                `
                }
            </div>
        </div>
        <p>You've selected ${template}. This style will be applied to your CV.</p>
        <button onclick="closeModal()" class="confirm-template-btn">Confirm Selection</button>
    `;

    // Add to modal content
    modalContent.appendChild(previewDiv);

    // Show the modal
    document.getElementById("cvModal").style.display = "block";
}

// Counter to keep track of sections for unique IDs
let experienceCounter = 0;
let educationCounter = 1; // Start at 1 since we have one education section by default
let projectCounter = 1; // Start at 1 since we have one project section by default

// Update preview with form data - this won't be shown until Preview CV is clicked
// Update preview with form data
function updatePreview() {
    // Basic info
    const name = document.getElementById("name")?.value || "";
    const email = document.getElementById("email")?.value || "";
    const phone = document.getElementById("phone")?.value || "";

    // Update name section
    const previewName = document.getElementById("previewName");
    if (previewName) {
        previewName.innerHTML = `<h3>${name}</h3>`;
    }

    // Update contact and template info
    const previewContact = document.getElementById("previewContact");
    if (previewContact) {
        let contactHTML = `<p><strong>Email:</strong> ${email}</p>`;
        contactHTML += `<p><strong>Phone:</strong> ${phone}</p>`;
        previewContact.innerHTML = contactHTML;
    }

    // Handle default education section
    const defaultEducation = document.getElementById(
        "education-section-default"
    );
    let educationSections = [];

    if (defaultEducation) {
        educationSections = [
            defaultEducation,
            ...document.querySelectorAll(
                "#education-container .education-section"
            ),
        ];
    } else {
        educationSections = document.querySelectorAll(".education-section");
    }

    // Education
    let educationHTML = "<h4>Education</h4>";

    if (educationSections.length === 0) {
        educationHTML += "<p>No education added</p>";
    } else {
        educationSections.forEach((section, index) => {
            const college = section.querySelector(".college-name")?.value || "";
            const year = section.querySelector(".passing-year")?.value || "";
            const stream = section.querySelector(".stream")?.value || "";
            const cgpa = section.querySelector(".cgpa")?.value || "";

            if (college || year || stream || cgpa) {
                educationHTML += `
                    <div class="preview-item">
                        <p><strong>College:</strong> ${college}</p>
                        <p><strong>Year:</strong> ${year}</p>
                        <p><strong>Stream:</strong> ${stream}</p>
                        <p><strong>CGPA:</strong> ${cgpa}</p>
                    </div>
                `;
                if (index < educationSections.length - 1) {
                    educationHTML += "<hr>";
                }
            }
        });
    }

    const previewEducation = document.getElementById("previewEducation");
    if (previewEducation) {
        previewEducation.innerHTML = educationHTML;
    }

    // Experience
    let experienceHTML = "<h4>Experience</h4>";
    const experienceSections = document.querySelectorAll(".experience-section");

    if (experienceSections.length === 0) {
        experienceHTML += "<p>No experience added</p>";
    } else {
        experienceSections.forEach((section, index) => {
            const company = section.querySelector(".company-name")?.value || "";
            const years =
                section.querySelector(".years-experience")?.value || "";
            const role = section.querySelector(".role")?.value || "";

            if (company || years || role) {
                experienceHTML += `
                    <div class="preview-item">
                        <p><strong>Company:</strong> ${company}</p>
                        <p><strong>Role:</strong> ${role}</p>
                        <p><strong>Experience:</strong> ${years}</p>
                    </div>
                `;
                if (index < experienceSections.length - 1) {
                    experienceHTML += "<hr>";
                }
            }
        });
    }

    const previewExperience = document.getElementById("previewExperience");
    if (previewExperience) {
        previewExperience.innerHTML = experienceHTML;
    }

    // Handle default project section
    const defaultProject = document.getElementById("project-section-default");
    let projectSections = [];

    if (defaultProject) {
        projectSections = [
            defaultProject,
            ...document.querySelectorAll("#project-container .project-section"),
        ];
    } else {
        projectSections = document.querySelectorAll(".project-section");
    }

    // Projects
    let projectsHTML = "<h4>Projects</h4>";

    if (projectSections.length === 0) {
        projectsHTML += "<p>No projects added</p>";
    } else {
        projectSections.forEach((section, index) => {
            const name = section.querySelector(".project-name")?.value || "";
            const desc = section.querySelector(".project-desc")?.value || "";

            if (name || desc) {
                projectsHTML += `
                    <div class="preview-item">
                        <p><strong>Project Name:</strong> ${name}</p>
                        <p><strong>Description:</strong> ${desc}</p>
                    </div>
                `;
                if (index < projectSections.length - 1) {
                    projectsHTML += "<hr>";
                }
            }
        });
    }

    const previewProjects = document.getElementById("previewProjects");
    if (previewProjects) {
        previewProjects.innerHTML = projectsHTML;
    }

    // Skills
    const skills = document.getElementById("skills")?.value || "";
    let skillsHTML = "<h4>Skills</h4>";

    if (skills) {
        const skillsList = skills.split(",").map((skill) => skill.trim());
        skillsHTML += "<p><strong>Skills:</strong> ";
        skillsHTML += skillsList.join(", ");
        skillsHTML += "</p>";
    } else {
        skillsHTML += "<p>No skills added</p>";
    }

    const previewSkills = document.getElementById("previewSkills");
    if (previewSkills) {
        previewSkills.innerHTML = skillsHTML;
    }

    // Keep the preview hidden until explicitly shown
    const cvPreview = document.getElementById("cvPreview");
    if (cvPreview) {
        cvPreview.style.display = "none";
    }
}

// Show CV in a popup modal
function showCVPopup() {
    if (!isFormSubmitted) {
        alert("Please submit the form before previewing the CV.");
        return;
    }
    // Update the preview first
    updatePreview();

    // Clone the CV preview content to the modal
    const cvPreview = document.getElementById("cvPreview");
    const modalContent = document.getElementById("modalCvContent");

    // Clear previous content
    modalContent.innerHTML = "";

    const templateText = document.createElement("p");
    templateText.textContent = `Selected Template: ${
        selectedTemplate ? selectedTemplate : "None"
    }`;
    templateText.style.fontWeight = "bold";
    modalContent.appendChild(templateText);

    // // Add template info if one is selected
    // if (!selectedTemplate) {
    //     const templateWarning = document.createElement("div");
    //     templateWarning.className = "template-warning";
    //     templateWarning.innerHTML = `<p>No template selected. Please select a template before exporting.</p>`;
    //     modalContent.appendChild(templateWarning);
    // }

    // Clone the CV preview and make it visible
    const clonedPreview = cvPreview.cloneNode(true);
    clonedPreview.style.display = "block";
    modalContent.appendChild(clonedPreview);

    // Show the modal
    document.getElementById("cvModal").style.display = "block";
}

// The rest of the code remains the same
// ...

// Close the modal
function closeModal() {
    document.getElementById("cvModal").style.display = "none";
}

// Generate PDF
function generatePDF() {
    if (!isFormSubmitted) {
        alert("Please submit the form before exporting the CV.");
        return;
    }

    // Update the preview before exporting
    updatePreview();

    // Get the CV preview container
    const cvPreview = document.getElementById("cvPreview");

    if (!cvPreview || cvPreview.innerHTML.trim() === "") {
        alert("No content available for export. Please enter data and submit the form first.");
        return;
    }

    // Extract form data and add it to the preview as text
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const skills = document.getElementById("skills").value;

    // Get education inputs
    const college = document.getElementById("clg-name").value;
    const passingYear = document.getElementById("passing").value;
    const stream = document.getElementById("stream").value;
    const cgpa = document.getElementById("cgpa").value;

    // Create a formatted text version
    let previewContent = `
        <h1>${name}</h1>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <h2>Education</h2>
        <p><strong>College:</strong> ${college}</p>
        <p><strong>Passing Year:</strong> ${passingYear}</p>
        <p><strong>Stream:</strong> ${stream}</p>
        <p><strong>CGPA:</strong> ${cgpa}</p>
        <h2>Skills</h2>
        <p>${skills}</p>
    `;

    // Add projects dynamically
    const projectSections = document.querySelectorAll(".project-section");
    if (projectSections.length > 0) {
        previewContent += `<h2>Projects</h2>`;
        projectSections.forEach((section) => {
            const projectName = section.querySelector(".project-name")?.value || "";
            const projectDesc = section.querySelector(".project-desc")?.value || "";
            previewContent += `
                <p><strong>Project Name:</strong> ${projectName}</p>
                <p><strong>Description:</strong> ${projectDesc}</p>
            `;
        });
    }

    // Add experience dynamically
    const experienceSections = document.querySelectorAll(".experience-section");
    if (experienceSections.length > 0) {
        previewContent += `<h2>Experience</h2>`;
        experienceSections.forEach((section) => {
            const company = section.querySelector(".company-name")?.value || "";
            const role = section.querySelector(".role")?.value || "";
            const years = section.querySelector(".years-experience")?.value || "";
            previewContent += `
                <p><strong>Company:</strong> ${company}</p>
                <p><strong>Role:</strong> ${role}</p>
                <p><strong>Experience:</strong> ${years}</p>
            `;
        });
    }

    // Create a temporary div to hold formatted text for the PDF
    const pdfContainer = document.createElement("div");
    pdfContainer.style.padding = "40px";
    pdfContainer.style.backgroundColor = "white";
    pdfContainer.style.color = "black";
    pdfContainer.style.fontFamily = "Arial, sans-serif";
    pdfContainer.innerHTML = previewContent;

    // Append to the body temporarily for PDF generation
    document.body.appendChild(pdfContainer);

    // PDF Generation Settings
    const opt = {
        margin: 10,
        filename: `CV_${selectedTemplate}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    // Generate and download the PDF
    html2pdf().from(pdfContainer).set(opt).save().then(() => {
        document.body.removeChild(pdfContainer); // Cleanup after export
    }).catch((error) => {
        console.error("PDF generation error:", error);
        alert("Error generating PDF. Please check the console for details.");
        document.body.removeChild(pdfContainer);
    });
}

function showCVPopup() {
    if (!isFormSubmitted) {
        alert("Please submit the form before previewing the CV.");
        return;
    }
    updatePreview(); // Ensure the latest data is shown

    const cvPreview = document.getElementById("cvPreview");
    cvPreview.style.display = "block"; // Show preview only when clicked

    const modalContent = document.getElementById("modalCvContent");
    modalContent.innerHTML = ""; // Clear previous content

    // Clone preview content into the modal
    const clonedPreview = cvPreview.cloneNode(true);
    clonedPreview.style.display = "block";
    modalContent.appendChild(clonedPreview);

    document.getElementById("cvModal").style.display = "block";
}


// Add new experience section
function addExperience() {
    experienceCounter++;

    // Create a new experience section
    const newSection = document.createElement("div");
    newSection.className = "inside-form experience-section";
    newSection.id = `experience-section-${experienceCounter}`;

    // HTML for the new section with unique IDs
    newSection.innerHTML = `
        <div class="section-header">
            <p>Experience ${experienceCounter}</p>
            <button type="button" class="remove-btn" onclick="removeSection('experience-section-${experienceCounter}')">Remove</button>
        </div>
        <ul>
            <li>
                <label for="company-name-${experienceCounter}">Company Name:</label>
                <input
                    id="company-name-${experienceCounter}"
                    class="company-name"
                    required
                />
            </li>
            <li>
                <label for="years-experience-${experienceCounter}">Years of Experience:</label>
                <select
                    id="years-experience-${experienceCounter}"
                    class="years-experience"
                >
                    <option value="0">No Experience</option>
                    <option value="1">1 Year</option>
                    <option value="2">2 Years</option>
                    <option value="3">3 Years</option>
                    <option value="4">4 Years</option>
                    <option value="5+">5+ Years</option>
                </select>
            </li>
            <li>
                <label for="role-${experienceCounter}">Role:</label>
                <input
                    id="role-${experienceCounter}"
                    class="role"
                    required
                />
            </li>
        </ul>
    `;

    // Find the experience container or create it if it doesn't exist
    let container = document.getElementById("experience-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "experience-container";
        // Insert after the education section
        const educationSection = document.querySelector(".inside-form");
        educationSection.parentNode.insertBefore(
            container,
            educationSection.nextSibling
        );
    }

    // Append the new section
    container.appendChild(newSection);
}

// Add new education section
function addEducation() {
    educationCounter++;

    // Create a new education section
    const newSection = document.createElement("div");
    newSection.className = "inside-form education-section";
    newSection.id = `education-section-${educationCounter}`;

    // HTML for the new section
    newSection.innerHTML = `
        <div class="section-header">
            <p>Education ${educationCounter}</p>
            <button type="button" class="remove-btn" onclick="removeSection('education-section-${educationCounter}')">Remove</button>
        </div>
        <ul>
            <li>
                <label for="clg-name-${educationCounter}">College:</label>
                <input
                    id="clg-name-${educationCounter}"
                    class="college-name"
                    required
                />
            </li>
            <li>
                <label for="passing-${educationCounter}">Passing Year:</label>
                <input
                    id="passing-${educationCounter}"
                    class="passing-year"
                    required
                />
            </li>
            <li>
                <label for="stream-${educationCounter}">Stream:</label>
                <input
                    id="stream-${educationCounter}"
                    class="stream"
                    required
                />
            </li>
            <li>
                <label for="cgpa-${educationCounter}">CGPA:</label>
                <input
                    id="cgpa-${educationCounter}"
                    class="cgpa"
                    required
                />
            </li>
        </ul>
    `;

    // Find the education container
    let container = document.getElementById("education-container");
    if (!container) {
        // Create education container if it doesn't exist
        container = document.createElement("div");
        container.id = "education-container";

        // Get the first education section and its parent
        const firstEducationSection = document.querySelector(".inside-form");
        const parent = firstEducationSection.parentNode;

        // Add class to the first section and add container after it
        firstEducationSection.className += " education-section";
        firstEducationSection.id = "education-section-default";
        firstEducationSection.querySelector("input#clg-name").className =
            "college-name";
        firstEducationSection.querySelector("input#passing").className =
            "passing-year";
        firstEducationSection.querySelector("input#stream").className =
            "stream";
        firstEducationSection.querySelector("input#cgpa").className = "cgpa";

        parent.insertBefore(container, firstEducationSection.nextSibling);
    }

    // Append the new section
    container.appendChild(newSection);
}

// Add new project section
function addProject() {
    projectCounter++;

    // Create a new project section
    const newSection = document.createElement("div");
    newSection.className = "inside-form project-section";
    newSection.id = `project-section-${projectCounter}`;

    // HTML for the new section
    newSection.innerHTML = `
        <div class="section-header">
            <p>Project ${projectCounter}</p>
            <button type="button" class="remove-btn" onclick="removeSection('project-section-${projectCounter}')">Remove</button>
        </div>
        <ul>
            <li>
                <label for="project-name-${projectCounter}">Project Name:</label>
                <input
                    id="project-name-${projectCounter}"
                    class="project-name"
                    required
                />
            </li>
            <li>
                <label for="project-desc-${projectCounter}">Project Description:</label>
                <input
                    id="project-desc-${projectCounter}"
                    class="project-desc"
                    required
                />
            </li>
        </ul>
    `;

    // Find the project container
    let container = document.getElementById("project-container");
    if (!container) {
        // Create project container if it doesn't exist
        container = document.createElement("div");
        container.id = "project-container";

        // Get the first project section and its parent
        const projectSections = document.querySelectorAll(".inside-form");
        const firstProjectSection = projectSections[projectSections.length - 1];
        const parent = firstProjectSection.parentNode;

        // Add class to the first section and add container after it
        firstProjectSection.className += " project-section";
        firstProjectSection.id = "project-section-default";
        firstProjectSection.querySelector("input#project-name").className =
            "project-name";
        firstProjectSection.querySelector("input#project-desc").className =
            "project-desc";

        parent.insertBefore(container, firstProjectSection.nextSibling);
    }

    // Append the new section
    container.appendChild(newSection);
}

// Remove a section by ID
function removeSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.remove();
    }
}

let isFormSubmitted = false;
// Handle form submission
document.getElementById("cvForm").addEventListener("submit", function (event) {
    event.preventDefault();
    isFormSubmitted = true; // Mark the form as submitted
    alert("Form submitted successfully!"); // Show confirmation
    // You can add additional logic here if needed
});

// Handle closing modal when clicking outside
window.onclick = function (event) {
    if (event.target == document.getElementById("cvModal")) {
        closeModal();
    }
};

// Handle ESC key press to close modal
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeModal();
    }
});

// Initialize first sections on page load
// Initialize first sections on page load
window.onload = function () {
    // Fix the first education section
    const firstEducationSection = document.querySelector(".inside-form");
    if (firstEducationSection) {
        // Add proper classes
        firstEducationSection.className += " education-section";
        firstEducationSection.id = "education-section-default";

        // Fix the input field class assignments
        const collegeInput = firstEducationSection.querySelector("#clg-name");
        const passingInput = firstEducationSection.querySelector("#passing");
        const streamInput = firstEducationSection.querySelector("#stream");
        const cgpaInput = firstEducationSection.querySelector("#cgpa");

        if (collegeInput) collegeInput.className = "college-name";
        if (passingInput) passingInput.className = "passing-year";
        if (streamInput) streamInput.className = "stream";
        if (cgpaInput) cgpaInput.className = "cgpa";
    }

    // Find and fix the projects section
    const allSections = document.querySelectorAll(".inside-form");
    if (allSections.length > 1) {
        const projectSection = allSections[allSections.length - 1];
        projectSection.className += " project-section";
        projectSection.id = "project-section-default";

        // Fix project input fields
        const projectNameInput = projectSection.querySelector("#project-name");
        const projectDescInput = projectSection.querySelector("#project-desc");

        if (projectNameInput) projectNameInput.className = "project-name";
        if (projectDescInput) projectDescInput.className = "project-desc";
    }

    // Hide the preview initially
    const cvPreview = document.getElementById("cvPreview");
    if (cvPreview) {
        cvPreview.style.display = "none";
    }

    // Setup event listeners for the form
    setupFormListeners();
};

// Add this function to ensure all form inputs update the preview
function setupFormListeners() {
    // Get all input fields
    const inputs = document.querySelectorAll("input, select, textarea");

    // Add oninput event to each input
    inputs.forEach((input) => {
        input.addEventListener("input", updatePreview);
    });
}
