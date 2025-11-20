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
      <div id="micro-console-wrapper"></div>
    </div>
  `;
}
