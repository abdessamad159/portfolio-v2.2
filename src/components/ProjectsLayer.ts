export function renderProjectsLayer(element: HTMLElement) {
  const projects = [
    { 
      name: 'Honey Empire', 
      description: 'متجر إلكتروني متكامل متخصص في بيع العسل الطبيعي ومنتجات النحل. تم تصميم الموقع لتقديم تجربة تسوق فريدة مع التركيز على جودة المنتجات وأصالتها.', 
      tech: ['E-commerce', 'UI/UX', 'Web Design'], 
      link: '#' 
    },
    { 
      name: 'Abdessamad Cloud', 
      description: 'منصة متكاملة تقدم خدمات استضافة الويب والحلول السحابية للشركات والأفراد. تم تطوير واجهة مستخدم بديهية تعرض الخدمات والمميزات بشكل واضح.', 
      tech: ['Cloud Services', 'Hosting', 'Dashboard'], 
      link: '#' 
    },
    { 
      name: 'GameASG', 
      description: 'صفحة هبوط مخصصة لمنصة ألعاب إلكترونية، تم تصميمها لجذب اللاعبين وتعزيز تجربة المستخدم. تحتوي على أقسام متنوعة تعرض ميزات المنصة وألعابها.', 
      tech: ['Gaming', 'Landing Page', 'Interactive'], 
      link: '#' 
    },
    { 
      name: 'Evelyn System', 
      description: 'Advanced autonomous agentic system architecture designed for complex problem solving.', 
      tech: ['TypeScript', 'AI', 'System Design'], 
      link: '#' 
    },
  ];

  const projectsHtml = projects.map(project => `
    <a href="${project.link}" class="project-card" target="_blank">
      <div class="project-header">
        <h3 class="project-title">${project.name}</h3>
        <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
      </div>
      <p class="project-description" dir="auto">${project.description}</p>
      <div class="project-tech">
        ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
      </div>
    </a>
  `).join('');

  element.innerHTML = `
    <div class="projects-container">
      <h2 class="section-title">Selected Works</h2>
      <div class="projects-grid">
        ${projectsHtml}
      </div>
    </div>
  `;
}
