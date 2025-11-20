export function renderDigitalIdentity(element: HTMLElement) {
  const mappings = [
    { source: 'GitHub', relation: 'Code Architecture', target: 'Projects' },
    { source: 'Freelancing', relation: 'Professional Impact', target: 'Experience' },
    { source: 'Social Media', relation: 'Digital Presence', target: 'Network' },
  ];

  const mapHtml = mappings.map(item => `
    <div class="identity-node">
      <div class="node-source">${item.source}</div>
      <div class="node-connector">
        <span class="connector-line"></span>
        <span class="connector-label">${item.relation}</span>
        <span class="connector-arrow">→</span>
      </div>
      <div class="node-target">${item.target}</div>
    </div>
  `).join('');

  element.innerHTML = `
    <div class="digital-identity-container">
      <h2 class="section-title">Digital Identity Map</h2>
      <div class="identity-map">
        ${mapHtml}
      </div>
      
      <div class="tech-stack-section">
        <h3 class="section-subtitle">التقنيات التي أستخدمها</h3>
        <div class="tech-grid">
          <div class="tech-category">
            <span class="category-name">Frontend Technologies</span>
            <div class="tech-tags">
              <span class="tech-pill">HTML5</span>
              <span class="tech-pill">CSS3</span>
              <span class="tech-pill">JavaScript (ES6+)</span>
              <span class="tech-pill">TypeScript</span>
              <span class="tech-pill">React</span>
              <span class="tech-pill">TailwindCSS</span>
            </div>
          </div>
          <div class="tech-category">
            <span class="category-name">Backend & Database</span>
            <div class="tech-tags">
              <span class="tech-pill">Node.js</span>
              <span class="tech-pill">Python</span>
              <span class="tech-pill">SQL</span>
              <span class="tech-pill">MongoDB</span>
              <span class="tech-pill">Firebase</span>
            </div>
          </div>
          <div class="tech-category">
            <span class="category-name">أدوات التطوير</span>
            <div class="tech-tags">
              <span class="tech-pill">Git</span>
              <span class="tech-pill">VS Code</span>
              <span class="tech-pill">Vite</span>
              <span class="tech-pill">Figma</span>
              <span class="tech-pill">Postman</span>
            </div>
          </div>
        </div>
      </div>

      <div id="micro-console-wrapper"></div>
    </div>
  `;
}
