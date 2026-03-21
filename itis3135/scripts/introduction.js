//Course Creation and Form Management

let courseCount = 0;

function createCourseRow(courseNumber) {
    const courseRow = document.createElement('div');
    courseRow.className = 'course-container';
    courseRow.id = `course-${courseNumber}`;
    
    const isFirstCourse = courseNumber === 1;
    
    // Default values for first 3 courses
    const defaultValues = {
        1: { dept: 'ITSC', num: '3155', name: 'Front-End Web App Development', reason: 'I am enrolled in this course because I&apos;d like to know more about building websites.' },
        2: { dept: 'ITSC', num: '3688', name: 'Computers and Their Impact on Society', reason: 'This course delves into the ethical considerations of various issues within the computer science field and is a part of the required curriculum for my major.' },
        3: { dept: 'ITIS', num: '3130', name: 'Intro to Human Centered Computing', reason: 'A required course for the Information Technology concentration that looks at the psychology behind human/computer interaction and applies it to the engineering and design of software systems.' }
    };
    
    const defaults = defaultValues[courseNumber] || { dept: '', num: '', name: '', reason: '' };
    
    let html = '';
    
    html += `<span class="course-number-label">Course ${courseNumber}</span>`;
    
    html += `
        <div class="course-row">
            <div class="form-group">
                <label for="courseDepartment${courseNumber}">Department <span class="required">*</span></label>
                <input type="text" id="courseDepartment${courseNumber}" name="courseDepartment" value="${defaults.dept}" required>
            </div>
            <div class="form-group">
                <label for="courseNumber${courseNumber}">Number <span class="required">*</span></label>
                <input type="text" id="courseNumber${courseNumber}" name="courseNumber" value="${defaults.num}" required>
            </div>
            <div class="form-group">
                <label for="courseName${courseNumber}">Name <span class="required">*</span></label>
                <input type="text" id="courseName${courseNumber}" name="courseName" value="${defaults.name}" required>
            </div>
            <div class="course-actions">
                ${!isFirstCourse ? `<button type="button" class="remove-course-btn" onclick="removeCourse(${courseNumber})">−</button>` : ''}
            </div>
        </div>
        <div class="form-group">
            <label for="reasonForCourse${courseNumber}">Reason for taking this course <span class="required">*</span></label>
            <textarea id="reasonForCourse${courseNumber}" name="reasonForCourse" required>${defaults.reason}</textarea>
        </div>
    `;
    
    courseRow.innerHTML = html;
    return courseRow;
}

function addCourse() {
    courseCount++;
    const coursesContainer = document.getElementById('coursesContainer');
    const newCourseRow = createCourseRow(courseCount);
    coursesContainer.appendChild(newCourseRow);
}

function removeCourse(courseNumber) {
    const courseElement = document.getElementById(`course-${courseNumber}`);
    if (courseElement) {
        courseElement.remove();
    }
}

// Initialize with 3 courses
document.addEventListener('DOMContentLoaded', function() {
    addCourse();
    addCourse();
    addCourse();
    
    document.getElementById('addCourseBtn').addEventListener('click', function(e) {
        e.preventDefault();
        addCourse();
    });

});

function clearForm() {
    // Clear all text inputs and textareas
    document.querySelectorAll('input[type="text"], textarea').forEach((field) => {
        field.value = '';
    });
    
    // Clear date inputs
    document.querySelectorAll('input[type="date"]').forEach((field) => {
        field.value = '';
    });
    
    // Clear file inputs
    document.querySelectorAll('input[type="file"]').forEach((field) => {
        field.value = '';
    });
    
    // Remove all courses except the first 3
    const coursesContainer = document.getElementById('coursesContainer');
    const courseElements = coursesContainer.querySelectorAll('.course-container');
    
    // Keep first 3 courses but clear their values
    courseElements.forEach((course, index) => {
        if (index < 3) {
            course.querySelectorAll('input[type="text"], textarea').forEach((field) => {
                field.value = '';
            });
        } else {
            course.remove();
        }
    });
    
    // Reset course count
    courseCount = 3;
}

// Helper function to get footer links for preview
function generateFooterLinks() {
    let linksHTML = '';
    for (let i = 1; i <= 5; i++) {
        const linkElement = document.getElementById(`footerLink${i}`);
        const textElement = document.getElementById(`footerLink${i}Text`);
        if (linkElement && textElement && linkElement.value && textElement.value) {
            linksHTML += `<a href="${linkElement.value}" target="_blank" style="color: #0066cc; text-decoration: none; margin: 0 5px;">${textElement.value}</a>`;
            if (i < 5) {
                // Check if next link exists
                const nextLink = document.getElementById(`footerLink${i + 1}`);
                if (nextLink && nextLink.value && document.getElementById(`footerLink${i + 1}Text`).value) {
                    linksHTML += ' | ';
                }
            }
        }
    }
    return linksHTML || 'No links added';
}

// Generate introduction preview and display in preview tab
function generateIntroductionPreview() {
    const result = buildIntroductionHTML();
    const previewContainer = document.getElementById('introductionPreviewContainer');
    
    // Create a styled wrapper for the preview content
    const previewHTML = `
        <div style="background-color: white; padding: 20px; border-radius: 8px;">
            <header style="text-align: center; border-bottom: 2px solid #333; padding-bottom: 15px; margin-bottom: 20px;">
                <h1>${result.firstName} ${result.lastName}</h1>
                <nav style="font-size: 0.9em;">
                    <a href="#" style="color: #0066cc; text-decoration: none;">Home</a> | <a href="#" style="color: #0066cc; text-decoration: none;">Introduction</a>
                </nav>
            </header>
            <main>
                ${result.bodyContent}
            </main>
            <footer style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #ccc; text-align: center; font-size: 0.9em; color: #666;">
                <nav style="margin-bottom: 10px;">
                    ${generateFooterLinks()}
                </nav>
                <p style="margin: 5px 0;">Copyright &copy; 2026 | Page created by ${result.firstName} ${result.lastName}</p>
            </footer>
        </div>
    `;
    
    previewContainer.innerHTML = previewHTML;
    
    // Switch to preview tab
    window.switchToTab('preview-tab');
}

// Add event listener to add course, submit & clear buttons and to set default acknowledgment date
document.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById('addCourseBtn').addEventListener('click', function(e) {
        e.preventDefault();
        addCourse();
    });
    
    document.getElementById('clearFormBtn').addEventListener('click', function(e) {
        e.preventDefault();
        clearForm();
        window.scrollTo(0, 0);
    });

    document.getElementById('clearFormBtn2').addEventListener('click', function(e) {
        e.preventDefault();
        clearForm();
        window.scrollTo(0, 0);
    });

    document.getElementById('submitBtn').addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get the form element
        const form = document.getElementById('introForm');
        
        // Check if form is valid using HTML5 validation
        if (form.checkValidity() === false) {
            e.stopPropagation();
            alert('Please fill in all required fields before submitting.');
            return;
        }
        
        // All fields are valid, proceed with preview
        generateIntroductionPreview();
    });

    document.getElementById('acknowledgmentDate').defaultValue = '2026-01-13';

    document.getElementById('picture').defaultValue = '/images/carolina_beach_2013.jpg';
});

/* Prevent page refresh / default behavior
const formElement = document.getElementById('submitBtn');
  formElement.addEventListener('submit', function(e) => e.preventDefault()); */

function resetFormWithDefaults() {
    // Default values for all form fields
    const defaultValues = {
        // Personal Information
        firstName: 'Arthur',
        middleName: '',
        nickname: '',
        lastName: 'Smith',
        acknowledgmentStatement: 'I understand that what is on this page is not password protected and I will not put anything here that I don\'t want publicly available.',
        acknowledgmentDate: '2026-01-13',
        
        // Mascot Information
        mascotAdjective: 'Ancient',
        mascotAnimal: 'Sabertooth',
        dividerSymbol: '|',
        
        // Picture
        pictureCaption: 'Photo from Carolina Beach c.2013',
        
        // Personal Statement
        personalStatement: 'I am a Junior transferring from CPCC working towards a B.A. in Computer Science with a focus in Information Technology. I am planning to use this education to learn much more about, and hopefully make a living in, a field that I have dabbled in and loved for more than two decades.',
        personalBackground: 'I was born and raised in North Carolina and have lived in the Charlotte area since 1999.',
        professionalBackground: 'Since 2009, I have worked in the Estates Division of the Mecklenburg County Clerk&apos;s office.',
        academicBackground: 'I have an associates degree in paralegal technology and an associate in arts degree, both from Central Piedmont Community College.',
        computerScienceBackground: 'I have written or edited HTML documents, bash scripts and Python programs for various personal projects over the years; built PCs and installed their operating systems using Windows, Ubuntu, and Linux Mint; and designed and implemented home hosting and networking solutions.',
        primaryWorkComputer: 'My primary school computer is an HP laptop with Windows 11. Most of my work on this device will be done at home.',
        backupWorkComputer: 'As a backup, I can use a home desktop computer or a work laptop.',
        
        // Quote
        quote: 'If your fidelity to perfectionism is too high, you never do anything.',
        quoteAuthor: 'David Foster Wallace',
        
        // Additional Information
        funnyThing: '',
        shareStatement: '',
        
        // Footer Links
        footerLink1: 'https://github.com/arthursmith-cpcc',
        footerLink1Text: 'GitHub',
        footerLink2: 'https://arthursmith-cpcc.github.io',
        footerLink2Text: 'GitHub.io',
        footerLink3: 'https://webpages.charlotte.edu/asmit775',
        footerLink3Text: 'CLTWeb',
        footerLink4: 'https://www.freecodecamp.org/arthursmith-uncc',
        footerLink4Text: 'freeCodeCamp',
        footerLink5: 'https://www.linkedin.com/in/arthur-smith-1a2787101',
        footerLink5Text: 'LinkedIn',
        
        // Course defaults
        courses: {
            1: { dept: 'ITSC', num: '3155', name: 'Front-End Web App Development', reason: 'I am enrolled in this course because I&apos;d like to know more about building websites.' },
            2: { dept: 'ITSC', num: '3688', name: 'Computers and Their Impact on Society', reason: 'This course delves into the ethical considerations of various issues within the computer science field and is a part of the required curriculum for my major.' },
            3: { dept: 'ITIS', num: '3130', name: 'Intro to Human Centered Computing', reason: 'A required course for the Information Technology concentration that looks at the psychology behind human/computer interaction and applies it to the engineering and design of software systems.' }
        }
    };
    
    // Populate all text and textarea fields
    Object.keys(defaultValues).forEach((key) => {
        if (key !== 'courses') {
            const element = document.getElementById(key);
            if (element) {
                element.value = defaultValues[key];
            }
        }
    });

    // Reset courses
    const coursesContainer = document.getElementById('coursesContainer');
    const courseElements = coursesContainer.querySelectorAll('.course-container');
    
    // Remove extra courses
    courseElements.forEach((course, index) => {
        if (index >= 3) {
            course.remove();
        }
    });
    
    courseCount = 3;
    
    // Populate first 3 courses with default values
    for (let i = 1; i <= 3; i++) {
        const courseDefaults = defaultValues.courses[i];
        
        const deptInput = document.getElementById(`courseDepartment${i}`);
        const numInput = document.getElementById(`courseNumber${i}`);
        const nameInput = document.getElementById(`courseName${i}`);
        const reasonInput = document.getElementById(`reasonForCourse${i}`);
        
        if (deptInput) deptInput.value = courseDefaults.dept;
        if (numInput) numInput.value = courseDefaults.num;
        if (nameInput) nameInput.value = courseDefaults.name;
        if (reasonInput) reasonInput.value = courseDefaults.reason;
    }
    
    // Reset file input
    const pictureInput = document.getElementById('picture');
    if (pictureInput) {
        const myFile = new File(['beachPic'], '/images/carolina_beach_2013.jpg', {
            type: 'jpg/jpeg',
            lastModified: new Date()
        });
        
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(myFile);
        pictureInput.files = dataTransfer.files;
        
        if (pictureInput.webkitEntries.length) {
            pictureInput.dataset.file = `${dataTransfer.files[0].name}`;
        }
    }
}

// Add event listener to reset button
document.addEventListener('DOMContentLoaded', function() {
    const resetFormBtn = document.getElementById('resetFormBtn');
    if (resetFormBtn) {
        resetFormBtn.addEventListener('click', function(e) {
            e.preventDefault();
            resetFormWithDefaults();
            window.scrollTo(0, 0);
        });
    }
    const resetFormBtn2 = document.getElementById('resetFormBtn2');
    if (resetFormBtn2) {
        resetFormBtn2.addEventListener('click', function(e) {
            e.preventDefault();
            resetFormWithDefaults();
        });
    }

});


