// Fetch data from JSON file
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Update header
        document.querySelector('header h1').textContent = data.name;
        document.querySelector('header p:nth-of-type(1)').textContent = data.title;
        document.querySelector('header p:nth-of-type(2)').innerHTML = `Email: ${data.email} | Phone: ${data.phone}`;
        document.querySelector('header p:nth-of-type(3) a').href = data.linkedin;

        // Update About Me section
        document.querySelector('#about p').textContent = data.about;

        // Update Projects section
        const projectsContainer = document.querySelector('#projects .container');
        data.projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `<h3>${project.title}</h3>
                                     <p>${project.date}<br>${project.description}</p>`;
            projectsContainer.appendChild(projectCard);
        });

        // Update Responsibilities section
        const responsibilitiesList = document.querySelector('#responsibilities ul');
        data.responsibilities.forEach(responsibility => {
            const li = document.createElement('li');
            li.textContent = responsibility;
            responsibilitiesList.appendChild(li);
        });

        // Update Technical Skills section
        const technicalSkills = document.querySelector('#technical-skills p');
        technicalSkills.innerHTML = `<strong>Language:</strong> ${data.technicalSkills.languages}<br>
                                    <strong>Database:</strong> ${data.technicalSkills.databases}<br>
                                    <strong>Cloud Environment:</strong> ${data.technicalSkills.cloudEnvironment}`;

        // Update Education section
        document.querySelector('#education p').textContent = data.education;

        // Update Awards section
        const awardsContainer = document.querySelector('#awards .container');
        data.awards.forEach(award => {
            const p = document.createElement('p');
            p.textContent = award;
            awardsContainer.appendChild(p);
        });

        // Update Certifications section
        const certificationsContainer = document.querySelector('#certifications .container');
        data.certifications.forEach(certification => {
            const p = document.createElement('p');
            p.textContent = certification;
            certificationsContainer.appendChild(p);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
