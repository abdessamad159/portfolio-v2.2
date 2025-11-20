export function renderContact(element: HTMLElement) {
  element.innerHTML = `
    <div class="contact-container">
      <div class="contact-grid">
        <div class="contact-item">
          <span class="contact-label">Email Protocol</span>
          <div class="contact-action">
            <a href="mailto:abdessamadguia11@gmail.com" class="contact-link">abdessamadguia11@gmail.com</a>
            <button class="copy-btn" data-value="abdessamadguia11@gmail.com" title="Copy to clipboard">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            </button>
          </div>
        </div>
        
        <div class="contact-item">
          <span class="contact-label">Voice Line</span>
          <div class="contact-action">
            <a href="tel:+2127789463" class="contact-link">+212 778-9463</a>
            <button class="copy-btn" data-value="+212 778-9463" title="Copy to clipboard">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            </button>
          </div>
        </div>
      </div>
      <div class="footer-note">
        © 2025 Evelyn System. All rights reserved.
      </div>
    </div>
  `;

  element.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const value = (btn as HTMLElement).dataset.value;
      if (value) {
        try {
          await navigator.clipboard.writeText(value);
          const originalIcon = btn.innerHTML;
          btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="#27c93f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
          setTimeout(() => {
            btn.innerHTML = originalIcon;
          }, 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      }
    });
  });
}
