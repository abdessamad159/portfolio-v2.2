export function renderPreloader(onComplete: () => void) {
  const preloader = document.createElement('div');
  preloader.className = 'preloader-container';
  
  preloader.innerHTML = `
    <div class="preloader-content">
      <div class="loading-text">INITIALIZING SYSTEM...</div>
      <div class="loading-bar-container">
        <div class="loading-bar"></div>
      </div>
      <div class="loading-percentage">0%</div>
    </div>
  `;

  document.body.appendChild(preloader);

  const bar = preloader.querySelector('.loading-bar') as HTMLElement;
  const percentage = preloader.querySelector('.loading-percentage') as HTMLElement;
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 5;
    if (progress > 100) progress = 100;
    
    bar.style.width = `${progress}%`;
    percentage.textContent = `${Math.floor(progress)}%`;
    
    if (progress === 100) {
      clearInterval(interval);
      setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
          preloader.remove();
          onComplete();
        }, 500);
      }, 500);
    }
  }, 50);
}
