export function renderNavigation(element: HTMLElement) {
  element.innerHTML = `
    <nav class="main-nav">
      <ul class="nav-list">
        <li><a href="#/" class="nav-link" data-path="/">Home</a></li>
        <li><a href="#/projects" class="nav-link" data-path="/projects">Projects</a></li>
        <li><a href="#/about" class="nav-link" data-path="/about">About</a></li>
        <li><a href="#/contact" class="nav-link" data-path="/contact">Contact</a></li>
      </ul>
    </nav>
  `;

  // Handle active state
  const updateActiveState = (path: string) => {
    const links = element.querySelectorAll('.nav-link');
    links.forEach(link => {
      const linkPath = (link as HTMLElement).dataset.path;
      if (linkPath === path || (path === '' && linkPath === '/')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  // Listen for route changes
  document.addEventListener('route-changed', ((e: CustomEvent) => {
    updateActiveState(e.detail.path);
  }) as EventListener);
}
