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
        <h3 class="section-subtitle">Technologies I Use</h3>
        <div class="tech-grid">
          <div class="tech-card">
            <div class="tech-card-header">
              <span class="tech-icon">⚡</span>
              <span class="category-name">Frontend</span>
            </div>
            <div class="tech-list">
              <div class="tech-item">
                <div class="tech-info">
                  <span class="tech-name">HTML5</span>
                  <span class="tech-percent">95%</span>
                </div>
                <div class="progress-bar"><div class="progress-fill" style="width: 95%"></div></div>
              </div>
              <div class="tech-item">
                <div class="tech-info">
                  <span class="tech-name">CSS3</span>
                  <span class="tech-percent">90%</span>
                </div>
                <div class="progress-bar"><div class="progress-fill" style="width: 90%"></div></div>
              </div>
              <div class="tech-item">
                <div class="tech-info">
                  <span class="tech-name">JavaScript</span>
                  <span class="tech-percent">85%</span>
                </div>
                <div class="progress-bar"><div class="progress-fill" style="width: 85%"></div></div>
              </div>
              <div class="tech-item">
                <div class="tech-info">
                  <span class="tech-name">React</span>
                  <span class="tech-percent">80%</span>
                </div>
                <div class="progress-bar"><div class="progress-fill" style="width: 80%"></div></div>
              </div>
              <div class="tech-item">
                <div class="tech-info">
                  <span class="tech-name">TailwindCSS</span>
                  <span class="tech-percent">90%</span>
                </div>
                <div class="progress-bar"><div class="progress-fill" style="width: 90%"></div></div>
              </div>
            </div>
          </div>
          
          <div class="tech-card">
            <div class="tech-card-header">
              <span class="tech-icon">🛠️</span>
              <span class="category-name">Backend</span>
            </div>
            <div class="tech-list">
              <div class="tech-item">
                <div class="tech-info">
                  <span class="tech-name">Node.js</span>
                  <span class="tech-percent">45%</span>
                </div>
                <div class="progress-bar"><div class="progress-fill" style="width: 45%"></div></div>
              </div>
              <div class="tech-item">
                <div class="tech-info">
                  <span class="tech-name">Firebase</span>
                  <span class="tech-percent">48%</span>
                </div>
                <div class="progress-bar"><div class="progress-fill" style="width: 48%"></div></div>
              </div>
              <div class="tech-item">
                <div class="tech-info">
                  <span class="tech-name">MongoDB</span>
                  <span class="tech-percent">40%</span>
                </div>
                <div class="progress-bar"><div class="progress-fill" style="width: 40%"></div></div>
              </div>
            </div>
          </div>
          
          <div class="tech-card">
            <div class="tech-card-header">
              <span class="tech-icon">⚙️</span>
              <span class="category-name">Tools</span>
            </div>
            <div class="tech-list">
              <div class="tech-item">
                <div class="tech-info">
                  <span class="tech-name">Git & GitHub</span>
                  <span class="tech-percent">85%</span>
                </div>
                <div class="progress-bar"><div class="progress-fill" style="width: 85%"></div></div>
              </div>
              <div class="tech-item">
                <div class="tech-info">
                  <span class="tech-name">VS Code</span>
                  <span class="tech-percent">95%</span>
                </div>
                <div class="progress-bar"><div class="progress-fill" style="width: 95%"></div></div>
              </div>
              <div class="tech-item">
                <div class="tech-info">
                  <span class="tech-name">Figma</span>
                  <span class="tech-percent">80%</span>
                </div>
                <div class="progress-bar"><div class="progress-fill" style="width: 80%"></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="micro-console-wrapper"></div>
    </div>
  `;
}
