document.getElementById("resumeForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const educationElement = document.getElementById('education') as HTMLInputElement;
    const experienceElement = document.getElementById('experience') as HTMLInputElement;
    const skillsElement = document.getElementById('skills') as HTMLInputElement;
    
    if (profilePictureInput && nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement) {
        
        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillsElement.value;
                
        const profilePictureFile = profilePictureInput.files?.[0];
        const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : " ";
        
        const resumeHTML = `
        <h2>Resume</h2>
        ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">` : " "}
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong>  ${email}</p>
        <p><strong>Phone Number:</strong>  ${phone}</p>
        
        <h3>Education</h3>
        <p>${education}</p>
        
        <h3>Work Experience</h3>
        <p>${experience}</p>
        
        <h3>Skills</h3>
        <p>${skills}</p>
        `;
        
        
        const resumeOutputElement = document.getElementById('resumeOutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeHTML;
            resumeOutputElement.classList.remove("hidden");

            const buttonsContainer = document.createElement("div");
            buttonsContainer.id = "buttonsContainer";
            resumeOutputElement.appendChild(buttonsContainer);

            const downloadButton = document.createElement("button");
            downloadButton.addEventListener("click", ()=>{
                window.print();
            });
            downloadButton.textContent = 'Download as PDF';
            downloadButton.style.border = '5px solid #00ff88';
            downloadButton.style.width = '100%';
            downloadButton.style.color = 'black';
            buttonsContainer.appendChild(downloadButton);

            const shareLinkButton = document.createElement("button");
            shareLinkButton.textContent = 'Copy ShareAble Link';
            shareLinkButton.style.color = 'black';
            shareLinkButton.style.width = '100%';
            shareLinkButton.style.marginTop = '10px';
            shareLinkButton.style.border = '5px solid #00ff88';
            shareLinkButton.addEventListener("click", async () => {
                try {
                    const shareableLink = `https://yourdomain.com/resumes/${name.replace(
                        /\s+/g,
                        "_"
                    )}_cv.html`;
                    
                    await navigator.clipboard.writeText(shareableLink);
                    alert("Shareable link copied to clipboard");
                } catch (err){
                    console.error("failedto copy link:", err);
                    alert("failed to copy link to clipboard.please try again.");
                }
            });
            buttonsContainer.appendChild(shareLinkButton);        
            } else {
                console.error('Reume Output Container Not Found');
            }
        } else {
            console.error('form elements are missing');
        }
    });
