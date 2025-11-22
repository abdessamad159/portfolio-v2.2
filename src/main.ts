import './style.css'
import { renderIdentityCore } from './components/IdentityCore'
import { renderProjectsLayer } from './components/ProjectsLayer'
import { renderDigitalIdentity } from './components/DigitalIdentity'
import { renderMicroConsole } from './components/MicroConsole'
import { renderContact } from './components/Contact'
import { renderNavigation } from './components/Navigation'
import { renderPreloader } from './components/Preloader'
import { Router } from './router'

const app = document.querySelector<HTMLDivElement>('#app')!;

// Render Navigation (Persistent)
const navContainer = document.createElement('div');
navContainer.id = 'nav-container';
app.appendChild(navContainer);
renderNavigation(navContainer);

// Create Content Container for Router
const contentContainer = document.createElement('main');
contentContainer.id = 'content-container';
app.appendChild(contentContainer);

// Initialize Router
const router = new Router(contentContainer);

// Define Routes
router.addRoute('/', (element) => {
  renderIdentityCore(element);
});

router.addRoute('/projects', (element) => {
  renderProjectsLayer(element);
});

router.addRoute('/about', (element) => {
  const diContainer = document.createElement('div');
  const consoleContainer = document.createElement('div');
  
  element.appendChild(diContainer);
  element.appendChild(consoleContainer);
  
  renderDigitalIdentity(diContainer);
  renderMicroConsole(consoleContainer);
});

router.addRoute('/contact', (element) => {
  renderContact(element);
});

// Custom Cursor Logic
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

document.addEventListener('mousedown', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
});

document.addEventListener('mouseup', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(1)';
});

// Add hover effect for interactive elements
const addHoverEffect = () => {
  const interactiveElements = document.querySelectorAll('a, button, .project-card, input, textarea');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
};

// Re-apply hover listeners on route change
document.addEventListener('route-changed', () => {
  setTimeout(addHoverEffect, 100); // Small delay to ensure DOM is updated
});

// Initial call
// Initial call
renderPreloader(() => {
  addHoverEffect();
});
