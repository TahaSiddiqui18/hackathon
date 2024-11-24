document.getElementById('resumeForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const profilePictureInput = document.getElementById('profilePicture');
    const nameElement = document.getElementById('name');
    const emailElement = document.getElementById('email');
    const phoneElement = document.getElementById('phone');
    const addressElement = document.getElementById('address');
    const educationElement = document.getElementById('education');
    const experienceElement = document.getElementById('experience');
    const skillsElement = document.getElementById('skills');
    const usernameElement = document.getElementById('username');

    
    function makeEditable(){
    const editableElements = document.querySelectorAll('.editable')
    editableElements.forEach(element => {
        element.addEventListener('click' , function() {
            const currentElement = element as HTMLElement;
            const currentValue = currentElement.textContent || "" ;

            if(currentElement.tagName === "p" || currentElement.tagName === 'SPAN' ) {
                const input = document.createElement('input')
                input.type = 'text'
                input.value = currentValue
                input.classList.add('editing-input')
                
                
                currentElement.style.display = 'none'
                currentElement.parentNode?.insertBefore(input, currentElement)
                input.focus()
            }
            
        })
    })
}

if (profilePictureInput && nameElement && emailElement && phoneElement && addressElement && educationElement && experienceElement && skillsElement && usernameElement) {

    const name = (nameElement as HTMLInputElement).value;
    const email = (emailElement as HTMLInputElement).value;
    const phone = (phoneElement as HTMLInputElement).value;
    const address = (addressElement as HTMLInputElement).value;
    const education = (educationElement as HTMLInputElement).value;
    const experience = (experienceElement as HTMLInputElement).value;
    const skills = (skillsElement as HTMLInputElement).value;
    const username = (usernameElement as HTMLInputElement).value;

    const uniquePath = `resume/${username.replace(/\s+/g, '_')}_cv.html`

    const profilePictureFile = (profilePictureInput as HTMLInputElement).files?.[0];
    const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : '';

    const resumeOutput = `
    <h2>Resume</h2>
    ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">` : ''}
    <p><strong>Name:</strong> <span id="edit-name" class="editable"> ${name}</span></p>
    <p><strong>Email:</strong> <span id="edit-edit" class="editable"> ${email}</span></p>
    <p><strong>Phone Number:</strong>  <span id="edit-phone" class="editable">${phone}</span></p>
    <p><strong>Address:</strong> ${address}</p>

    <h3>Education</h3>
    <p id="edit-education" class="editable">${education}</p>

    <h3>Work Experience</h3>
    <p id="edit-experience" class="editable">${experience}</p>

    <h3>Skills</h3>
    <p id="edit-skills" class="editable">${skills}</p>
    `;
    
    const downloadLink = document.createElement('a');
    downloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(resumeOutput);
    downloadLink.download = uniquePath;
    downloadLink.textContent = 'Download your Latest Resume'
    downloadLink.style.color='black'

    const resumeOutputElement = document.getElementById('resumeOutput');
    if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeOutput;
        makeEditable(); 

        resumeOutputElement.appendChild(downloadLink)
    } 
} else {
    console.error('One or more form elements are missing');
}
});