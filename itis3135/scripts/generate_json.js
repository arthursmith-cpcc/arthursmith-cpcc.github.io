function exportFormToJSON() {
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
    formData.picture = {
        caption: document.getElementById('pictureCaption').value,
        file: document.getElementById('picture').dataset.file || ''
    };
    
    // Personal Statement
    formData.personalStatement = {
        statement: document.getElementById('personalStatement').value,
        background: document.getElementById('personalBackground').value
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
    
    // Create a Blob from the JSON string
    const blob = new Blob([jsonString], { type: 'application/json' });
    
    // Create a temporary download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `student-profile-${new Date().toISOString().split('T')[0]}.json`;
    
    // Trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL object
    URL.revokeObjectURL(url);
    
    console.log('Form exported to JSON:', formData);
}

// Add event listener to export button
document.addEventListener('DOMContentLoaded', function() {
    const exportBtn = document.getElementById('exportJSONBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', function(e) {
            e.preventDefault();
            exportFormToJSON();
        });
    }
});
