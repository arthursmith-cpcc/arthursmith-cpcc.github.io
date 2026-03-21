function displayFormAsJSON() {
    // Collect all form data
    const formData = {};
    
    // Personal Information
    formData.personalInfo = {
        firstName: document.getElementById('firstName').value,
        middleName: document.getElementById('middleName').value,
        nickname: document.getElementById('nickname').value,
        lastName: document.getElementById('lastName').value,
        acknowledgmentStatement: document.getElementById('acknowledgmentStatement').value,
        acknowledgmentDate: document.getElementById('acknowledgmentDate').value
    };
    
    // Mascot Information
    formData.mascotInfo = {
        adjective: document.getElementById('mascotAdjective').value,
        animal: document.getElementById('mascotAnimal').value,
        dividerSymbol: document.getElementById('dividerSymbol').value
    };
    
    // Picture
    const pictureInput = document.getElementById('picture');
    let pictureFile = '';
    if (pictureInput && pictureInput.files && pictureInput.files.length > 0) {
        pictureFile = pictureInput.files[0].name;
    }
    
    formData.picture = {
        caption: document.getElementById('pictureCaption').value,
        file: pictureFile || 'default: /asmit775/images/carolina_beach_2013.jpg'
    };
    
    // Personal Statement
    formData.personalStatement = {
        statement: document.getElementById('personalStatement').value,
        background: document.getElementById('personalBackground').value,
        professionalBackground: document.getElementById('professionalBackground').value,
        academicBackground: document.getElementById('academicBackground').value,
        computerScienceBackground: document.getElementById('computerScienceBackground').value,
        primaryWorkComputer: document.getElementById('primaryWorkComputer').value,
        backupWorkComputer: document.getElementById('backupWorkComputer').value
    };
    
    // Courses
    formData.courses = [];
    const courseElements = document.querySelectorAll('.course-container');
    courseElements.forEach((courseElement, index) => {
        const courseNumber = index + 1;
        const course = {
            courseNumber: courseNumber,
            department: document.getElementById(`courseDepartment${courseNumber}`).value,
            number: document.getElementById(`courseNumber${courseNumber}`).value,
            name: document.getElementById(`courseName${courseNumber}`).value,
            reason: document.getElementById(`reasonForCourse${courseNumber}`).value
        };
        formData.courses.push(course);
    });
    
    // Quote
    formData.quote = {
        text: document.getElementById('quote').value,
        author: document.getElementById('quoteAuthor').value
    };
    
    // Additional Information
    formData.additionalInfo = {
        funnyThing: document.getElementById('funnyThing').value,
        shareStatement: document.getElementById('shareStatement').value
    };
    
    // Footer Links
    formData.footerLinks = [
        {
            link: document.getElementById('footerLink1').value,
            text: document.getElementById('footerLink1Text').value
        },
        {
            link: document.getElementById('footerLink2').value,
            text: document.getElementById('footerLink2Text').value
        },
        {
            link: document.getElementById('footerLink3').value,
            text: document.getElementById('footerLink3Text').value
        },
        {
            link: document.getElementById('footerLink4').value,
            text: document.getElementById('footerLink4Text').value
        },
        {
            link: document.getElementById('footerLink5').value,
            text: document.getElementById('footerLink5Text').value
        }
    ];
    
    // Convert to JSON string with formatting
    const jsonString = JSON.stringify(formData, null, 2);
    
    // Create or get the JSON display container
    let jsonContainer = document.getElementById('jsonDisplayContainer');
    
    if (!jsonContainer) {
        jsonContainer = document.createElement('div');
        jsonContainer.id = 'jsonDisplayContainer';
        jsonContainer.style.cssText = `
            margin-top: 2em;
            padding: 1.5em;
            background-color: #f5f5f5;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
            overflow-x: auto;
            max-height: 500px;
            overflow-y: auto;
            white-space: pre-wrap;
            word-wrap: break-word;
        `;
        document.getElementById('introForm').appendChild(jsonContainer);
    }
    
    // Display the JSON data
    jsonContainer.textContent = jsonString;
    
    // Switch to JSON Preview tab
    if (typeof window.switchToTab === 'function') {
        window.switchToTab('json-tab');
    }
    
    // Scroll to the JSON display
    jsonContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    console.log('Form data displayed as JSON:', formData);
}

// Add event listener to display button
document.addEventListener('DOMContentLoaded', function() {
    const displayBtn = document.getElementById('displayJSONBtn');
    if (displayBtn) {
        displayBtn.addEventListener('click', function(e) {
            e.preventDefault();
            displayFormAsJSON();
        });
    }
});