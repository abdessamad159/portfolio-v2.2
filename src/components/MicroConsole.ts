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
        <span class="prompt">></span> <span id="typewriter"></span><span class="cursor">_</span>
      </div>
    </div>
  `;

  const text = "Identity verified. Accessing neural interface... Welcome to the construct.";
  const typeWriterElement = document.getElementById('typewriter');
  
  if (typeWriterElement) {
    let i = 0;
    function type() {
      if (i < text.length) {
        typeWriterElement!.textContent += text.charAt(i);
        i++;
        setTimeout(type, 50);
      }
    }
    // Start typing when the element is in view (simple intersection observer)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          type();
          observer.disconnect();
        }
      });
    });
    observer.observe(element);
  }
}
