export function renderMicroConsole(element: HTMLElement) {
  element.innerHTML = `
    <div class="console-container">
      <div class="console-header">
        <span class="console-dot red"></span>
        <span class="console-dot yellow"></span>
        <span class="console-dot green"></span>
        <span class="console-title">Evelyn System</span>
      </div>
      <div class="console-content">
        <div id="console-output"></div>
        <span class="prompt">></span> <span class="cursor">_</span>
      </div>
    </div>
  `;

  const lines = [
    { text: 'Identity verified.', delay: 500 },
    { text: 'Accessing neural interface...', delay: 1000 },
    { text: 'Welcome, Abdessamad Guiadiri.', delay: 2000, style: 'color: var(--text-primary); font-weight: bold;' }
  ];

  const outputElement = document.getElementById('console-output');
  
  if (outputElement) {
    let lineIndex = 0;
    
    function typeLine() {
      if (lineIndex < lines.length) {
        const line = lines[lineIndex];
        const lineElement = document.createElement('div');
        lineElement.className = 'console-line';
        if (line.style) {
          lineElement.style.cssText = line.style;
        }
        
        outputElement!.appendChild(lineElement);
        
        let charIndex = 0;
        const text = '> ' + line.text;
        
        function typeChar() {
          if (charIndex < text.length) {
            lineElement.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, 30);
          } else {
            lineIndex++;
            setTimeout(typeLine, line.delay || 500);
          }
        }
        
        typeChar();
      }
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          typeLine();
          observer.disconnect();
        }
      });
    });
    observer.observe(element);
  }
}
