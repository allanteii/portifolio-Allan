let allProjects = [];
let currentFilter = 'all';

async function fetchProjects() {
    try {
        const response = await fetch('https://api.github.com/users/AllanRibeiroo/repos');
        const repos = await response.json();
        
        allProjects = await Promise.all(repos.map(async repo => {
            const languagesResponse = await fetch(repo.languages_url);
            const languages = await languagesResponse.json();
            
            return {
                name: repo.name,
                description: repo.description || 'Sem descrição',
                url: repo.html_url,
                languages: Object.keys(languages)
            };
        }));

        displayProjects();
    } catch (error) {
        document.getElementById('projects-container').innerHTML = 
            '<div class="no-projects">Erro ao carregar projetos. Verifique sua conexão.</div>';
    }
}

function displayProjects() {
    const container = document.getElementById('projects-container');
    
    let filteredProjects = allProjects;
    
    if (currentFilter !== 'all') {
        filteredProjects = allProjects.filter(project => {
            const langs = project.languages.map(l => l.toLowerCase());
            return langs.includes(currentFilter);
        });
    }

    if (filteredProjects.length === 0) {
        container.innerHTML = '<div class="no-projects">Nenhum projeto encontrado com esse filtro.</div>';
        return;
    }

    container.innerHTML = '<div class="projects">' + 
        filteredProjects.map(project => `
            <div class="project-card">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <div class="languages">
                    ${project.languages.map(lang => 
                        `<span class="language-tag">${lang}</span>`
                    ).join('')}
                </div>
                <a href="${project.url}" target="_blank" class="project-link">Ver no GitHub</a>
            </div>
        `).join('') + 
    '</div>';
}

function filterProjects(filter, event) {
    currentFilter = filter;
    
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    displayProjects();
}

function openCV(event) {
    if (event && event.preventDefault) event.preventDefault();
    document.getElementById('cvModal').classList.add('active');
}

function closeCV() {
    document.getElementById('cvModal').classList.remove('active');
}

fetchProjects();
