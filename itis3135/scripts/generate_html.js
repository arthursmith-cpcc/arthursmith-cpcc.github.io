function downloadHTML(htmlContent, firstName, lastName) {
    const filename = `${firstName}_${lastName}_introduction.html`;
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function copyToClipboard(htmlContent) {
    navigator.clipboard.writeText(htmlContent).then(() => {
        alert('HTML copied to clipboard!');
    }).catch((err) => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy HTML to clipboard');
    });
}

function displayGeneratedHTML(htmlContent, firstName, lastName) {
    // Get the HTML display container
    const htmlContainer = document.getElementById('htmlDisplayContainer');
    
    if (!htmlContainer) {
        console.error('HTML display container not found');
        return;
    }

    // Create a code block for the HTML preview
    const codeBlock = document.createElement('pre');
    codeBlock.style.cssText = `
        background-color: #f5f5f5;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 15px;
        overflow-x: auto;
        font-family: 'Courier New', monospace;
        font-size: 12px;
        max-height: 400px;
        overflow-y: auto;
        line-height: 1.4;
    `;
    codeBlock.textContent = htmlContent;

    // Clear previous content and add new code block
    htmlContainer.innerHTML = '';
    htmlContainer.appendChild(codeBlock);

    // Set up download and copy button handlers
    const downloadBtn = document.getElementById('downloadHTMLBtn');
    const copyBtn = document.getElementById('copyHTMLBtn');

    if (downloadBtn) {
        downloadBtn.onclick = () => downloadHTML(htmlContent, firstName, lastName);
    }

    if (copyBtn) {
        copyBtn.onclick = () => copyToClipboard(htmlContent);
    }

    // Switch to HTML Preview tab
    if (typeof window.switchToTab === 'function') {
        window.switchToTab('html-tab');
    }
}

function buildIntroductionHTML() {
    // Collect all form data
    const formData = {
        personalInfo: {
            firstName: document.getElementById('firstName').value,
            middleName: document.getElementById('middleName').value,
            nickname: document.getElementById('nickname').value,
            lastName: document.getElementById('lastName').value,
            acknowledgmentDate: document.getElementById('acknowledgmentDate').value
        },
        mascotInfo: {
            adjective: document.getElementById('mascotAdjective').value,
            animal: document.getElementById('mascotAnimal').value,
            dividerSymbol: document.getElementById('dividerSymbol').value
        },
        picture: {
            caption: document.getElementById('pictureCaption').value,
            file: document.getElementById('picture').dataset.file || '/images/carolina_beach_2013.jpg'
        },
        personalStatement: document.getElementById('personalStatement').value,
        personalBackground: document.getElementById('personalBackground').value,
        professionalBackground: document.getElementById('professionalBackground').value,
        academicBackground: document.getElementById('academicBackground').value,
        computerScienceBackground: document.getElementById('computerScienceBackground').value,
        primaryWorkComputer: document.getElementById('primaryWorkComputer').value,
        backupWorkComputer: document.getElementById('backupWorkComputer').value,
        quote: document.getElementById('quote').value,
        quoteAuthor: document.getElementById('quoteAuthor').value,
        funnyThing: document.getElementById('funnyThing').value,
        shareStatement: document.getElementById('shareStatement').value,
        courses: [],
        footerLinks: []
    };

    // Collect courses
    const courseElements = document.querySelectorAll('.course-container');
    courseElements.forEach((courseElement, index) => {
        const courseNumber = index + 1;
        const course = {
            department: document.getElementById(`courseDepartment${courseNumber}`).value,
            number: document.getElementById(`courseNumber${courseNumber}`).value,
            name: document.getElementById(`courseName${courseNumber}`).value,
            reason: document.getElementById(`reasonForCourse${courseNumber}`).value
        };
        formData.courses.push(course);
    });

    // Collect footer links
    for (let i = 1; i <= 5; i++) {
        formData.footerLinks.push({
            link: document.getElementById(`footerLink${i}`).value,
            text: document.getElementById(`footerLink${i}Text`).value
        });
    }

    // Build the HTML page with individual name components
    const firstName = formData.personalInfo.firstName;
    const middleName = formData.personalInfo.middleName;
    const nickname = formData.personalInfo.nickname;
    const lastName = formData.personalInfo.lastName;
    
    // Build full name with middle name and nickname
    let fullNameDisplay = firstName;
    if (middleName) {
        fullNameDisplay += ` ${middleName}`;
    }
    if (nickname) {
        fullNameDisplay += ` "${nickname}"`;
    }
    fullNameDisplay += ` ${lastName}`;
    
    // Display name is just the nickname or full name for acknowledgment
    const displayName = nickname || `${firstName} ${lastName}`;
    const mascot = `${formData.mascotInfo.adjective} ${formData.mascotInfo.animal}`;
    const divider = formData.mascotInfo.dividerSymbol;

    // Generate course list items
    let coursesListHTML = '';
    formData.courses.forEach((course) => {
        coursesListHTML += `
                    <li><strong>${course.department}${course.number} - ${course.name}:</strong> ${course.reason}</li>`;
    });

    // Generate footer links
    let footerLinksHTML = '';
    formData.footerLinks.forEach((link, index) => {
        footerLinksHTML += `<a href="${link.link}" target="_blank">${link.text}</a>`;
        if (index < formData.footerLinks.length - 1) {
            footerLinksHTML += ' | ';
        }
    });

    // Generate additional info section (if either field has content)
    let additionalInfoHTML = '';
    if (formData.funnyThing || formData.shareStatement) {
        additionalInfoHTML += '<li><strong>Additional Information:</strong><ul>';
        if (formData.funnyThing) {
            additionalInfoHTML += `<li><em>Funny Thing:</em> ${formData.funnyThing}</li>`;
        }
        if (formData.shareStatement) {
            additionalInfoHTML += `<li><em>Something to Share:</em> ${formData.shareStatement}</li>`;
        }
        additionalInfoHTML += '</ul></li>';
    }

    // Generate background information section
    let backgroundInfoHTML = '';
    if (formData.professionalBackground || formData.academicBackground || formData.computerScienceBackground || formData.primaryWorkComputer || formData.backupWorkComputer) {
        
        if (formData.professionalBackground) {
            backgroundInfoHTML += `<li><strong>Professional Background:</strong> ${formData.professionalBackground}</li>`;
        }
        if (formData.academicBackground) {
            backgroundInfoHTML += `<li><strong>Academic Background:</strong> ${formData.academicBackground}</li>`;
        }
        if (formData.computerScienceBackground) {
            backgroundInfoHTML += `<li><strong>Background in Computer Science:</strong> ${formData.computerScienceBackground}</li>`;
        }
        if (formData.primaryWorkComputer) {
            backgroundInfoHTML += `<li><strong>Primary Work Computer & Location:</strong> ${formData.primaryWorkComputer}</li>`;
        }
        if (formData.backupWorkComputer) {
            backgroundInfoHTML += `<li><strong>Backup Work Computer & Location Plan:</strong> ${formData.backupWorkComputer}</li>`;
        }
    
    }

    // Get just the body content (without full HTML document wrapper)
    const bodyContent = `
        <h2>Introduction</h2>
        <p>I understand that what is on this page is not password protected and I will not put anything here that I don't want publicly available. - <em>${displayName} ${formData.personalInfo.acknowledgmentDate}</em></p>
        <h3>${fullNameDisplay} ${divider} ${mascot}</h3>
        <figure>
            <img src="${formData.picture.file}" alt="${formData.picture.caption}" width="630">
            <figcaption><em>${formData.picture.caption}</em></figcaption>
        </figure>
        <p>${formData.personalStatement}</p>
        <ul>
            <li><strong>Personal Background:</strong> ${formData.personalBackground}</li>
            ${backgroundInfoHTML}
            <li><strong>Current Courses:</strong>
                <ol>${coursesListHTML}
                </ol>
            </li>${additionalInfoHTML}
        </ul>
        <blockquote>
            &quot;${formData.quote}&quot; &mdash;<cite>${formData.quoteAuthor}</cite>
        </blockquote>
    `;

    // Return both the full HTML document and the body content
    return {
        fullHTML: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            background-color: #b7d4e1;
            max-width: 900px;
            margin: auto;
            padding-left: 5px;
            padding-right: 5px;
        }

        .footer_nav {
            background-color: #a8c686;
            font-family: "Jost", sans-serif;
            margin-bottom: 25px;
            padding-left: 10px;
            padding-right: 10px;
        }

        h1 {
            font-family: "PT Serif", serif;
            color: #0d1b1e;
            font-size: 50px;
            margin-bottom: 5px;    
        }

        header {
            margin-top: 25px;
            background-color: #a8c686;
            padding-left: 10px;
            padding-right: 10px;
            height: 100px;
        }

        .header_nav {
            font-family: "Jost", sans-serif;
            height: 2rem;
        }

        h2 {
            font-family: "Quicksand", sans-serif;
            font-size: 35px;
            padding-left: 10px;
            padding-right: 10px;
        }

        ul, blockquote {
            font-family: Jost, sans-serif;
        }

        p {
            padding-left: 10px;
            padding-right: 10px;
            font-family: Jost, sans-serif;
        }

        ul li {
            padding-right: 5%;
        }

        ol li {
            padding-right: 2%;
        }

        nav a:link {
            color: #0d1b1e;
            text-decoration: none;
        }

        nav a:visited {
            color: #0d1b1e;
            text-decoration: none;
        }

        nav a:hover {
            color: #853b28;
            text-decoration: underline;
        }

        p a:link {
            color: #0d1b1e;
            text-decoration: underline;
        }

        p a:visited {
            color: #0d1b1e;
            text-decoration: underline;
        }

        p a:hover {
            color: #853b28;
            text-decoration: underline;
        }

        figure img{
            margin-left: auto;
            margin-right: auto;
            display: block;
            max-width: 80%;
        }

        figure figcaption {
            font-style: italic;
            contain: inline-size;
            margin-left: 10%;
        }

        figure {
            inline-size: fit-content;
            margin-inline: auto;
        }
        h3 {
            font-family: 'Quicksand', sans-serif;
            font-size: 3.4rem;
        }
    </style>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Quicksand:wght@300..700&display=swap" rel="stylesheet">
    <title>${fullNameDisplay} | Introduction</title>
    <script src="https://lint.page/kit/4d0fe3.js" crossorigin="anonymous"></script>
</head>
<body>
    <header>
        <h1>${fullNameDisplay}</h1>
        <nav class="header_nav">
            <a href="./index.html">Home</a> | <a href="./introduction.html">Introduction</a>
        </nav>
    </header>
    <main>${bodyContent}
    </main>
    <footer>
        <nav class="footer_nav">
            ${footerLinksHTML}
        </nav>
        <p>Copyright &copy; 2026 | Page created by ${fullNameDisplay}</p>
    </footer>
</body>
</html>`,
        bodyContent: bodyContent,
        firstName: firstName,
        lastName: lastName
    };
}

function generateHTMLPage() {
    const result = buildIntroductionHTML();
    displayGeneratedHTML(result.fullHTML, result.firstName, result.lastName);
}

// Add event listener to generate HTML button
document.addEventListener('DOMContentLoaded', function() {
    const generateHTMLBtn = document.getElementById('generateHTMLBtn');
    if (generateHTMLBtn) {
        generateHTMLBtn.addEventListener('click', function(e) {
            e.preventDefault();
            generateHTMLPage();
        });
    }
});

