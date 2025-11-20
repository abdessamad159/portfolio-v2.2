interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  topics: string[];
  language: string;
  stargazers_count: number;
  fork: boolean;
}

export async function renderProjectsLayer(element: HTMLElement) {
  element.innerHTML = `
    <div class="projects-container">
      <h2 class="section-title">GitHub Repositories</h2>
      <div id="projects-grid" class="projects-grid">
        <div class="loading-state">
          <div class="spinner"></div>
          <span>Accessing GitHub Neural Network...</span>
        </div>
      </div>
    </div>
  `;

  try {
    const response = await fetch('https://api.github.com/users/abdessamad159/repos?sort=updated&direction=desc');
    if (!response.ok) throw new Error('Failed to fetch projects');
    
    const repos: GitHubRepo[] = await response.json();
    
    // Filter out forks and limit to top 8
    const filteredRepos = repos
      .filter(repo => !repo.fork)
      .slice(0, 8);

    const projectsHtml = filteredRepos.map(repo => {
      // Use topics if available, otherwise fallback to language
      const techStack = repo.topics.length > 0 
        ? repo.topics 
        : [repo.language].filter(Boolean);

      return `
        <a href="${repo.html_url}" class="project-card" target="_blank">
          <div class="project-header">
            <h3 class="project-title">${repo.name}</h3>
            <div class="project-meta">
              ${repo.stargazers_count > 0 ? `<span class="star-count">★ ${repo.stargazers_count}</span>` : ''}
              <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </div>
          </div>
          <p class="project-description" dir="auto">${repo.description || 'No description available.'}</p>
          <div class="project-tech">
            ${techStack.slice(0, 4).map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
        </a>
      `;
    }).join('');

    const grid = element.querySelector('#projects-grid');
    if (grid) {
      if (projectsHtml.length > 0) {
        grid.innerHTML = projectsHtml;
      } else {
        grid.innerHTML = '<div class="empty-state">No public repositories found.</div>';
      }
    }

  } catch (error) {
    console.error(error);
    const grid = element.querySelector('#projects-grid');
    if (grid) {
      grid.innerHTML = `
        <div class="error-state">
          <p>Connection Interrupted.</p>
          <button onclick="window.location.reload()" class="retry-btn">Retry Sequence</button>
        </div>
      `;
    }
  }
}
