export function renderContact(element: HTMLElement) {
  element.innerHTML = `
    <div class="contact-container">
      <h2 class="section-title">Contact Me</h2>
      <div class="contact-content">
        <div class="contact-info">
          <div class="contact-item">
            <span class="contact-label">Email</span>
            <div class="contact-value-group">
              <a href="mailto:abdessamadguia11@gmail.com" class="contact-value">abdessamadguia11@gmail.com</a>
              <button class="copy-btn" data-value="abdessamadguia11@gmail.com" aria-label="Copy Email">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              </button>
            </div>
          </div>
          
          <div class="contact-item">
            <span class="contact-label">Phone</span>
            <div class="contact-value-group">
              <a href="tel:+212778-449363" class="contact-value">+212 778-449363</a>
              <button class="copy-btn" data-value="+212778-449363" aria-label="Copy Phone">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              </button>
            </div>
          </div>
        </div>

        <form id="contact-form" class="contact-form">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" required placeholder="Your Name">
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" required placeholder="your@email.com">
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" required rows="4" placeholder="Your Message..."></textarea>
          </div>
          
          <div class="captcha-group">
            <label for="captcha" id="captcha-label">Human Verification: ? + ? =</label>
            <input type="number" id="captcha" required placeholder="?">
          </div>

          <button type="submit" class="submit-btn">
            <span>Send Message</span>
            <svg class="send-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
          <div id="form-status" class="form-status"></div>
        </form>
      </div>
    </div>
  `;

  // Copy functionality
  element.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const value = (btn as HTMLElement).dataset.value;
      if (value) {
        navigator.clipboard.writeText(value);
        const originalIcon = btn.innerHTML;
        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        setTimeout(() => {
          btn.innerHTML = originalIcon;
        }, 2000);
      }
    });
  });

  // CAPTCHA Logic
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const correctAnswer = num1 + num2;
  
  const captchaLabel = element.querySelector('#captcha-label');
  if (captchaLabel) {
    captchaLabel.textContent = `Human Verification: ${num1} + ${num2} = ?`;
  }

  // Form Submission
  const form = element.querySelector('#contact-form') as HTMLFormElement;
  const statusDiv = element.querySelector('#form-status');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const captchaInput = (element.querySelector('#captcha') as HTMLInputElement).value;
      
      if (parseInt(captchaInput) !== correctAnswer) {
        if (statusDiv) {
          statusDiv.textContent = 'Incorrect verification code. Please try again.';
          statusDiv.className = 'form-status error';
        }
        return;
      }

      // Simulate sending
      const submitBtn = form.querySelector('.submit-btn') as HTMLButtonElement;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';
      
      setTimeout(() => {
        form.innerHTML = `
          <div class="success-message-card">
            <div class="success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <h3>Message Sent Successfully</h3>
            <p>Thank you for reaching out. I will review your message and get back to you as soon as possible.</p>
            <p class="response-promise">I usually reply within 24 hours.</p>
          </div>
        `;
      }, 1500);
    });
  }
}
